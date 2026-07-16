import { createClient } from '@supabase/supabase-js'

function json(statusCode, body) {
  return new Response(JSON.stringify(body), {
    status: statusCode,
    headers: { 'Content-Type': 'application/json' },
  })
}

function isExistingUserError(error) {
  const message = String(error?.message || '').toLowerCase()
  return error?.status === 422 || message.includes('already') || message.includes('registered') || message.includes('exists')
}

export default async (request) => {
  if (request.method !== 'POST') return json(405, { error: 'Method not allowed' })

  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
  const serverKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const siteUrl = process.env.SITE_URL
  if (!url || !serverKey || !siteUrl) return json(503, { error: 'Portal password setup is not configured' })

  let body
  try {
    body = await request.json()
  } catch {
    return json(400, { error: 'Invalid request' })
  }

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  if (!/.+@.+\..+/.test(email)) return json(400, { error: 'Enter a valid email address' })

  const supabase = createClient(url, serverKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })

  const { data: profile, error: profileError } = await supabase
    .from('client_profiles')
    .select('email')
    .eq('email', email)
    .maybeSingle()

  if (profileError) {
    console.error('Portal profile lookup failed', profileError)
    return json(503, { error: 'Portal password setup is temporarily unavailable' })
  }

  // Return the same public response shape whether or not a profile exists.
  if (!profile) return json(200, { approved: false })

  const { error: createError } = await supabase.auth.admin.createUser({
    email,
    email_confirm: true,
  })

  if (createError && !isExistingUserError(createError)) {
    console.error('Portal auth user creation failed', createError)
    return json(503, { error: 'Portal password setup is temporarily unavailable' })
  }

  const redirectTo = new URL('/reset-password?return=portal', siteUrl).toString()
  const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, { redirectTo })

  if (resetError) {
    console.error('Portal password email failed', resetError)
    return json(503, { error: 'Portal password setup is temporarily unavailable' })
  }

  return json(200, { approved: true })
}

export const config = {
  path: '/.netlify/functions/portal-sign-in',
  method: 'POST',
  rateLimit: {
    action: 'rate_limit',
    aggregateBy: ['ip'],
    windowLimit: 5,
    windowSize: 60,
  },
}