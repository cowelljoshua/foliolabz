import { createUploadToken, json, validSessionId } from '../lib/cloudinary.mjs'

export default async (request) => {
  if (request.method !== 'POST') return json(405, { error: 'Method not allowed' })

  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) return json(503, { error: 'Turnstile is not configured' })

  let body
  try {
    body = await request.json()
  } catch {
    return json(400, { error: 'Invalid request' })
  }

  if (!validSessionId(body.sessionId) || typeof body.turnstileToken !== 'string') {
    return json(400, { error: 'Invalid upload session' })
  }

  const verifyBody = new URLSearchParams({ secret, response: body.turnstileToken })
  const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  if (forwardedFor) verifyBody.set('remoteip', forwardedFor)

  let result
  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: verifyBody,
    })
    result = await response.json()
  } catch {
    return json(502, { error: 'The security check is temporarily unavailable' })
  }

  if (!result.success) return json(403, { error: 'Please complete the security check again' })

  try {
    return json(200, createUploadToken(body.sessionId))
  } catch (error) {
    console.error(error)
    return json(503, { error: 'Upload authorization is not configured' })
  }
}

export const config = {
  path: '/.netlify/functions/upload-authorize',
  method: 'POST',
  rateLimit: {
    action: 'rate_limit',
    aggregateBy: ['ip', 'domain'],
    windowLimit: 10,
    windowSize: 60,
  },
}