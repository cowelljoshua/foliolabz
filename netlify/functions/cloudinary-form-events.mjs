import {
  SUBMITTED_TAG,
  basicAuth,
  cloudinaryConfig,
  cloudinarySignature,
  isOwnedPublicId,
  validSessionId,
} from '../lib/cloudinary.mjs'

const RESOURCE_TYPES = new Set(['image', 'raw', 'video'])

async function tagSubmitted(resourceType, publicIds) {
  if (!publicIds.length) return
  const { cloudName, apiKey, apiSecret } = cloudinaryConfig()
  if (!cloudName || !apiKey || !apiSecret) throw new Error('Cloudinary environment variables are missing')

  const timestamp = Math.floor(Date.now() / 1000)
  const params = { command: 'add', public_ids: publicIds, tag: SUBMITTED_TAG, timestamp }
  const body = new URLSearchParams({
    command: 'add',
    tag: SUBMITTED_TAG,
    timestamp: String(timestamp),
    api_key: apiKey,
    signature: cloudinarySignature(params, apiSecret),
  })
  publicIds.forEach((publicId) => body.append('public_ids[]', publicId))

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/tags`, {
    method: 'POST',
    headers: {
      Authorization: basicAuth(apiKey, apiSecret),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  })
  if (!response.ok) throw new Error(`Cloudinary tag request failed (${response.status})`)
}

export default {
  async formSubmitted(event) {
    const data = event.data || {}
    if (!validSessionId(data.upload_session) || !data.cloudinary_assets) return

    let assets
    try {
      assets = JSON.parse(data.cloudinary_assets)
    } catch {
      console.error('Could not parse Cloudinary asset manifest')
      return
    }
    if (!Array.isArray(assets)) return

    const byType = new Map()
    for (const asset of assets.slice(0, 30)) {
      const type = RESOURCE_TYPES.has(asset.resourceType) ? asset.resourceType : 'image'
      if (!isOwnedPublicId(asset.publicId, data.upload_session)) continue
      byType.set(type, [...(byType.get(type) || []), asset.publicId])
    }

    await Promise.all([...byType].map(([type, ids]) => tagSubmitted(type, ids)))
  },
}
