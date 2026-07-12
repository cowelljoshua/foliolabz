import crypto from 'node:crypto'

export const PENDING_TAG = 'foliolabz-pending'
export const SUBMITTED_TAG = 'foliolabz-submitted'
export const INTAKE_PREFIX = 'foliolabz/intake/'

const jsonHeaders = { 'Content-Type': 'application/json; charset=utf-8' }

export function json(status, body) {
  return new Response(JSON.stringify(body), { status, headers: jsonHeaders })
}

function tokenSecret() {
  return process.env.UPLOAD_TOKEN_SECRET || process.env.CLOUDINARY_API_SECRET || ''
}

function base64url(value) {
  return Buffer.from(value).toString('base64url')
}

export function createUploadToken(sessionId, ttlSeconds = 60 * 60) {
  const secret = tokenSecret()
  if (!secret) throw new Error('UPLOAD_TOKEN_SECRET is not configured')
  const payload = base64url(JSON.stringify({ sid: sessionId, exp: Math.floor(Date.now() / 1000) + ttlSeconds }))
  const signature = crypto.createHmac('sha256', secret).update(payload).digest('base64url')
  return { token: `${payload}.${signature}`, expiresAt: (Math.floor(Date.now() / 1000) + ttlSeconds) * 1000 }
}

export function verifyUploadToken(token, expectedSessionId) {
  const secret = tokenSecret()
  if (!secret || !token || !token.includes('.')) return false
  const [payload, signature] = token.split('.')
  const expected = crypto.createHmac('sha256', secret).update(payload).digest()
  let supplied
  try {
    supplied = Buffer.from(signature, 'base64url')
  } catch {
    return false
  }
  if (expected.length !== supplied.length || !crypto.timingSafeEqual(expected, supplied)) return false
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'))
    return data.sid === expectedSessionId && data.exp > Math.floor(Date.now() / 1000)
  } catch {
    return false
  }
}

function signatureValue(value) {
  if (Array.isArray(value)) return value.join(',')
  if (value && typeof value === 'object') {
    return Object.entries(value)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, item]) => `${key}=${item}`)
      .join('|')
  }
  return String(value)
}

export function cloudinarySignature(params, secret = process.env.CLOUDINARY_API_SECRET) {
  if (!secret) throw new Error('CLOUDINARY_API_SECRET is not configured')
  const serialized = Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null && value !== '')
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${signatureValue(value)}`)
    .join('&')
  return crypto.createHash('sha1').update(`${serialized}${secret}`).digest('hex')
}

export function cloudinaryConfig() {
  return {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || process.env.VITE_CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY || process.env.VITE_CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  }
}

export function basicAuth(apiKey, apiSecret) {
  return `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString('base64')}`
}

export function validSessionId(value) {
  return typeof value === 'string' && /^[a-f0-9-]{20,64}$/i.test(value)
}

export function isOwnedPublicId(publicId, sessionId) {
  return typeof publicId === 'string' && publicId.startsWith(`${INTAKE_PREFIX}${sessionId}/`)
}
