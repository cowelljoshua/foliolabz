import { cloudinarySignature, json, validSessionId, verifyUploadToken } from '../lib/cloudinary.mjs'

const NEVER_SIGN = new Set(['eager', 'eval', 'on_success', 'notification_url', 'proxy', 'transformation'])

export default async (request) => {
  if (request.method !== 'POST') return json(405, { error: 'Method not allowed' })

  let body
  try {
    body = await request.json()
  } catch {
    return json(400, { error: 'Invalid request' })
  }

  const { paramsToSign, uploadToken, sessionId } = body
  if (!validSessionId(sessionId) || !verifyUploadToken(uploadToken, sessionId)) {
    return json(401, { error: 'Upload session expired. Complete the security check again.' })
  }
  if (!paramsToSign || typeof paramsToSign !== 'object' || Array.isArray(paramsToSign)) {
    return json(400, { error: 'Missing upload parameters' })
  }

  const folder = String(paramsToSign.folder || '')
  if (!folder.startsWith(`foliolabz/intake/${sessionId}/`)) {
    return json(403, { error: 'Invalid upload folder' })
  }

  const preset = process.env.CLOUDINARY_UPLOAD_PRESET || process.env.VITE_CLOUDINARY_UPLOAD_PRESET
  if (!preset || paramsToSign.upload_preset !== preset) {
    return json(403, { error: 'Invalid upload preset' })
  }

  const timestamp = Number(paramsToSign.timestamp)
  if (!Number.isFinite(timestamp) || Math.abs(Date.now() / 1000 - timestamp) > 10 * 60) {
    return json(403, { error: 'Expired upload request' })
  }
  if (Object.keys(paramsToSign).some((key) => NEVER_SIGN.has(key))) {
    return json(403, { error: 'Unsupported upload parameters' })
  }

  try {
    // The upload widget appends source=uw to the actual request but omits it from
    // paramsToSign, so it must be signed here or Cloudinary rejects the signature.
    return json(200, { signature: cloudinarySignature({ ...paramsToSign, source: 'uw' }) })
  } catch (error) {
    console.error(error)
    return json(503, { error: 'Cloudinary signing is not configured' })
  }
}

export const config = {
  path: '/.netlify/functions/cloudinary-signature',
  method: 'POST',
  rateLimit: {
    action: 'rate_limit',
    aggregateBy: ['ip', 'domain'],
    windowLimit: 90,
    windowSize: 60,
  },
}