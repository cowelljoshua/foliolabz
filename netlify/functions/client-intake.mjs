import { createClient } from '@supabase/supabase-js'

function json(statusCode, body) {
  return new Response(JSON.stringify(body), {
    status: statusCode,
    headers: { 'Content-Type': 'application/json' },
  })
}

export default async (request) => {
  if (request.method !== 'POST') return json(405, { error: 'Method not allowed' })

  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
  const serverKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serverKey) return json(503, { error: 'Client profile storage is not configured' })

  let body
  try {
    body = await request.json()
  } catch {
    return json(400, { error: 'Invalid request' })
  }

  const intake = body?.intake
  const email = typeof intake?.email === 'string' ? intake.email.trim().toLowerCase() : ''
  const name = typeof intake?.name === 'string' ? intake.name.trim() : ''
  const packageId = intake?.package === 'pro' ? 'pro' : intake?.package === 'launch' ? 'launch' : ''
  if (!email || !name || !packageId) return json(400, { error: 'Incomplete client profile' })

  const rush = intake.rush === true
  const balanceDue = (packageId === 'pro' ? 550 : 300) - 50 + (rush ? 75 : 0)
  const supabase = createClient(url, serverKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })

  // Do not allow a second public form submission to overwrite an existing client.
  const { data: existing, error: lookupError } = await supabase
    .from('client_profiles')
    .select('email')
    .eq('email', email)
    .maybeSingle()
  if (lookupError) {
    console.error('Client profile lookup failed', lookupError)
    return json(503, { error: 'Client profile storage is temporarily unavailable' })
  }
  if (existing) return json(200, { created: false })

  const { error: insertError } = await supabase.from('client_profiles').insert({
    email,
    name,
    package: packageId,
    rush,
    balance_due: balanceDue,
    build_status: 'brief',
    intake,
  })
  if (insertError) {
    console.error('Client profile insert failed', insertError)
    return json(503, { error: 'Client profile storage is temporarily unavailable' })
  }
  const { error: trackerError } = await supabase.from('project_operations').upsert({ email })
  if (trackerError) console.error('Project tracker initialization failed', trackerError)


  return json(201, { created: true })
}

export const config = {
  path: '/.netlify/functions/client-intake',
  method: 'POST',
  rateLimit: {
    action: 'rate_limit',
    aggregateBy: ['ip'],
    windowLimit: 10,
    windowSize: 60,
  },
}