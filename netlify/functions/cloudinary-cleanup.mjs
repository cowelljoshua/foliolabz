import { PENDING_TAG, SUBMITTED_TAG, basicAuth, cloudinaryConfig, json } from '../lib/cloudinary.mjs'

const RESOURCE_TYPES = ['image', 'raw', 'video']
const RETENTION_DAYS = Number(process.env.CLOUDINARY_ABANDONED_DAYS || 7)

async function pendingAssets(resourceType) {
  const { cloudName, apiKey, apiSecret } = cloudinaryConfig()
  const auth = basicAuth(apiKey, apiSecret)
  const assets = []
  let cursor = ''

  do {
    const query = new URLSearchParams({ max_results: '500', tags: 'true' })
    if (cursor) query.set('next_cursor', cursor)
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/resources/${resourceType}/tags/${PENDING_TAG}?${query}`,
      { headers: { Authorization: auth } },
    )
    if (!response.ok) throw new Error(`Could not list pending ${resourceType} assets (${response.status})`)
    const data = await response.json()
    assets.push(...(data.resources || []))
    cursor = data.next_cursor || ''
  } while (cursor && assets.length < 2000)

  return assets
}

async function deleteAssets(resourceType, publicIds) {
  if (!publicIds.length) return 0
  const { cloudName, apiKey, apiSecret } = cloudinaryConfig()
  let deleted = 0
  for (let start = 0; start < publicIds.length; start += 100) {
    const body = new URLSearchParams()
    publicIds.slice(start, start + 100).forEach((publicId) => body.append('public_ids[]', publicId))
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/resources/${resourceType}/upload`, {
      method: 'DELETE',
      headers: {
        Authorization: basicAuth(apiKey, apiSecret),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    })
    if (!response.ok) throw new Error(`Could not delete abandoned ${resourceType} assets (${response.status})`)
    const data = await response.json()
    deleted += Object.values(data.deleted || {}).filter((value) => value === 'deleted').length
  }
  return deleted
}

export default async () => {
  const { cloudName, apiKey, apiSecret } = cloudinaryConfig()
  if (!cloudName || !apiKey || !apiSecret) return json(503, { error: 'Cloudinary is not configured' })

  const cutoff = Date.now() - RETENTION_DAYS * 24 * 60 * 60 * 1000
  try {
    const counts = await Promise.all(
      RESOURCE_TYPES.map(async (type) => {
        const assets = await pendingAssets(type)
        const abandoned = assets.filter(
          (asset) => new Date(asset.created_at).getTime() < cutoff && !(asset.tags || []).includes(SUBMITTED_TAG),
        )
        return deleteAssets(type, abandoned.map((asset) => asset.public_id))
      }),
    )
    return json(200, { deleted: counts.reduce((sum, count) => sum + count, 0) })
  } catch (error) {
    console.error(error)
    return json(500, { error: 'Cloudinary cleanup failed' })
  }
}

export const config = { schedule: '@daily' }
