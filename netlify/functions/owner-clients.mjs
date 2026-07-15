import { createClient } from '@supabase/supabase-js'

function json(statusCode, body) {
  return new Response(JSON.stringify(body), {
    status: statusCode,
    headers: { 'Content-Type': 'application/json' },
  })
}

function configuredClient() {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
  const serverKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serverKey) return null
  return createClient(url, serverKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}

async function requireOwner(request, supabase) {
  const token = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '')
  if (!token) return { error: json(401, { error: 'Sign in required' }) }

  const { data, error } = await supabase.auth.getUser(token)
  if (error || !data.user?.email) return { error: json(401, { error: 'Your session has expired' }) }

  const owners = (process.env.OWNER_EMAIL || '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean)
  if (!owners.includes(data.user.email.toLowerCase())) {
    return { error: json(403, { error: 'This account is not an owner' }) }
  }

  return { user: data.user }
}

const editableFields = new Set([
  'name', 'package', 'rush', 'balance_due', 'build_status', 'pay_link', 'domain', 'domain_active',
])

export default async (request) => {
  const supabase = configuredClient()
  if (!supabase || !process.env.OWNER_EMAIL) return json(503, { error: 'Owner dashboard is not configured' })

  const owner = await requireOwner(request, supabase)
  if (owner.error) return owner.error

  if (request.method === 'GET') {
    const { data, error } = await supabase
      .from('client_profiles')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) {
      console.error('Owner client list failed', error)
      return json(503, { error: 'Could not load clients' })
    }
    return json(200, { clients: data })
  }

  let body
  try {
    body = await request.json()
  } catch {
    return json(400, { error: 'Invalid request' })
  }

  if (request.method === 'POST') {
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
    const name = typeof body.name === 'string' ? body.name.trim() : ''
    const packageId = body.package === 'pro' ? 'pro' : body.package === 'launch' ? 'launch' : ''
    if (!/.+@.+\..+/.test(email) || !name || !packageId) {
      return json(400, { error: 'Name, valid email, and package are required' })
    }
    const rush = body.rush === true
    const defaultBalance = (packageId === 'pro' ? 550 : 300) - 50 + (rush ? 75 : 0)
    const balanceDue = Number.isFinite(Number(body.balance_due)) ? Math.max(0, Number(body.balance_due)) : defaultBalance
    const record = {
      email,
      name,
      package: packageId,
      rush,
      balance_due: balanceDue,
      build_status: ['brief', 'building', 'review', 'polish', 'live'].includes(body.build_status) ? body.build_status : 'brief',
      pay_link: typeof body.pay_link === 'string' ? body.pay_link.trim() : '',
      domain: typeof body.domain === 'string' ? body.domain.trim().toLowerCase() : '',
      domain_active: body.domain_active === true,
      intake: body.intake && typeof body.intake === 'object' ? body.intake : { source: 'owner dashboard' },
    }
    const { data, error } = await supabase.from('client_profiles').insert(record).select().single()
    if (error) {
      console.error('Owner client create failed', error)
      return json(error.code === '23505' ? 409 : 503, { error: error.code === '23505' ? 'That email already has a profile' : 'Could not create client' })
    }
    return json(201, { client: data })
  }

  if (request.method === 'PATCH') {
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
    if (!email) return json(400, { error: 'Client email is required' })

    const updates = {}
    for (const [key, value] of Object.entries(body.updates || {})) {
      if (editableFields.has(key)) updates[key] = value
    }
    if (updates.package && !['launch', 'pro'].includes(updates.package)) delete updates.package
    if (updates.build_status && !['brief', 'building', 'review', 'polish', 'live'].includes(updates.build_status)) delete updates.build_status
    if ('balance_due' in updates) updates.balance_due = Math.max(0, Number(updates.balance_due) || 0)
    if ('name' in updates) updates.name = String(updates.name || '').trim()
    if ('pay_link' in updates) updates.pay_link = String(updates.pay_link || '').trim()
    if ('domain' in updates) updates.domain = String(updates.domain || '').trim().toLowerCase()
    updates.updated_at = new Date().toISOString()

    const { data, error } = await supabase
      .from('client_profiles')
      .update(updates)
      .eq('email', email)
      .select()
      .single()
    if (error) {
      console.error('Owner client update failed', error)
      return json(503, { error: 'Could not update client' })
    }
    return json(200, { client: data })
  }

  return json(405, { error: 'Method not allowed' })
}

export const config = {
  path: '/.netlify/functions/owner-clients',
  rateLimit: {
    action: 'rate_limit',
    aggregateBy: ['ip'],
    windowLimit: 120,
    windowSize: 60,
  },
}