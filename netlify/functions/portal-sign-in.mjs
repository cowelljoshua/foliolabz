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
  const siteUrl = process.env.SITE_URL
  if (!url || !serverKey || !siteUrl) return json(503, { error: 'Portal sign-in is not configured' })

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
    return json(503, { error: 'Portal sign-in is temporarily unavailable' })
  }

  if (!profile) return json(200, { approved: false })

  const redirectTo = new URL('/portal', siteUrl).toString()
  const { error: signInError } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
      emailRedirectTo: redirectTo,
    },
  })

  if (signInError) {
    console.error('Portal magic link failed', signInError)
    return json(503, { error: 'Portal sign-in is temporarily unavailable' })
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