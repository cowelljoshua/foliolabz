import { useState } from 'react'
import { loadExternalScript } from '../lib/externalScript.js'

const WIDGET_SCRIPT = 'https://upload-widget.cloudinary.com/latest/global/all.js'
const MAX_FILE_BYTES = 15 * 1024 * 1024
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const API_KEY = import.meta.env.VITE_CLOUDINARY_API_KEY
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

const configured = Boolean(CLOUD_NAME && API_KEY && UPLOAD_PRESET)

function displayName(info) {
  const original = info.original_filename || info.public_id?.split('/').pop() || 'Uploaded file'
  if (!info.format || original.toLowerCase().endsWith(`.${info.format.toLowerCase()}`)) return original
  return `${original}.${info.format}`
}

function toAsset(info) {
  return {
    publicId: info.public_id,
    assetId: info.asset_id,
    url: info.secure_url,
    name: displayName(info),
    bytes: info.bytes || 0,
    format: info.format || '',
    resourceType: info.resource_type || 'image',
    width: info.width || null,
    height: info.height || null,
    thumbnailUrl: info.thumbnail_url || '',
  }
}

function sizeLabel(bytes) {
  if (!bytes) return ''
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

export default function CloudinaryUpload({
  label,
  hint,
  assets,
  onChange,
  multiple = false,
  max = 1,
  totalCount = 0,
  totalMax = 30,
  formats = ['jpg', 'jpeg', 'png', 'heic', 'webp', 'pdf'],
  sessionId,
  category,
  authorization,
  onAuthorizationExpired,
  onUploadingChange,
}) {
  const [error, setError] = useState('')
  const currentRoom = multiple
    ? Math.min(max - assets.length, totalMax - totalCount)
    : (assets.length || totalCount < totalMax) ? 1 : 0
  const full = currentRoom <= 0
  const disabled = !configured || !authorization?.token || full

  const openWidget = async () => {
    if (disabled) return
    setError('')

    try {
      await loadExternalScript(WIDGET_SCRIPT, () => Boolean(window.cloudinary))
      const uploaded = []
      const widget = window.cloudinary.createUploadWidget(
        {
          cloudName: CLOUD_NAME,
          apiKey: API_KEY,
          uploadPreset: UPLOAD_PRESET,
          uploadSignature: async (callback, paramsToSign) => {
            try {
              const response = await fetch('/.netlify/functions/cloudinary-signature', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  paramsToSign,
                  uploadToken: authorization.token,
                  sessionId,
                }),
              })
              const data = await response.json().catch(() => ({}))
              if (!response.ok || !data.signature) {
                if (response.status === 401) onAuthorizationExpired()
                throw new Error(data.error || 'Could not authorize this upload')
              }
              callback(data.signature)
            } catch (signatureError) {
              setError(signatureError.message || 'Could not authorize this upload.')
              onUploadingChange(false)
              callback('')
            }
          },
          sources: ['local', 'camera', 'google_drive', 'dropbox'],
          defaultSource: 'local',
          multiple,
          maxFiles: multiple ? currentRoom : 1,
          clientAllowedFormats: formats,
          maxFileSize: MAX_FILE_BYTES,
          maxImageFileSize: MAX_FILE_BYTES,
          maxRawFileSize: MAX_FILE_BYTES,
          maxImageWidth: 4000,
          maxImageHeight: 4000,
          resourceType: 'auto',
          folder: `foliolabz/intake/${sessionId}/${category}`,
          tags: ['foliolabz-pending', `foliolabz-session-${sessionId}`],
          showAdvancedOptions: false,
          showCompletedButton: true,
          showUploadMoreButton: multiple,
          singleUploadAutoClose: !multiple,
          styles: {
            palette: {
              window: '#fdfcf8',
              windowBorder: '#d8d2c4',
              tabIcon: '#2a4fd6',
              menuIcons: '#5f6a76',
              textDark: '#182230',
              textLight: '#faf8f2',
              link: '#2a4fd6',
              action: '#2a4fd6',
              inactiveTabIcon: '#8b93a0',
              error: '#b3261e',
              inProgress: '#2a4fd6',
              complete: '#177a45',
              sourceBg: '#f4f1e9',
            },
          },
        },
        (widgetError, result) => {
          if (widgetError) {
            setError(typeof widgetError === 'string' ? widgetError : 'An upload failed. Open the uploader to retry.')
            onUploadingChange(false)
            return
          }
          if (!result) return
          if (result.event === 'queues-start') onUploadingChange(true)
          if (result.event === 'success') uploaded.push(toAsset(result.info))
          if (result.event === 'queues-end') {
            onUploadingChange(false)
            if (uploaded.length) {
              if (multiple) {
                const next = [...assets, ...uploaded].filter(
                  (asset, index, list) => list.findIndex((item) => item.publicId === asset.publicId) === index,
                )
                onChange(next.slice(0, max))
              } else {
                onChange(uploaded.slice(-1))
              }
            }
          }
          if (['abort', 'batch-cancelled'].includes(result.event)) onUploadingChange(false)
        },
      )
      widget.open()
    } catch (loadError) {
      setError(loadError.message || 'The uploader could not open. Please refresh and try again.')
      onUploadingChange(false)
    }
  }

  return (
    <div>
      <p className="mb-1.5 text-sm font-medium">{label}</p>
      <button
        type="button"
        onClick={openWidget}
        disabled={disabled}
        className="w-full rounded-2xl border border-dashed border-frost/25 bg-frost/[0.03] p-5 text-center transition-colors hover:border-frost/45 disabled:cursor-not-allowed disabled:opacity-45"
      >
        <span className="text-sm text-mist">
          {full ? '30-file limit reached' : assets.length ? (multiple ? 'Add more project files' : 'Replace uploaded file') : 'Upload or drag in files'}
        </span>
        <span className="mt-1 block text-xs text-mist/70">
          {hint || 'JPG, PNG, HEIC, WebP or PDF · 15 MB each'}
        </span>
      </button>

      {assets.length > 0 && (
        <ul className="mt-2 space-y-2">
          {assets.map((asset) => (
            <li key={asset.publicId} className="flex items-center gap-3 rounded-xl bg-frost/[0.05] px-3 py-2.5 text-sm">
              {asset.resourceType === 'image' && asset.format !== 'pdf' ? (
                <img src={asset.thumbnailUrl || asset.url} alt="" className="h-10 w-10 rounded-lg object-cover" />
              ) : (
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-frost/[0.06] text-lg" aria-hidden="true">📄</span>
              )}
              <a href={asset.url} target="_blank" rel="noreferrer" className="min-w-0 flex-1 truncate text-mist hover:text-cyan hover:underline">
                {asset.name} {asset.bytes ? <span className="text-xs text-mist/60">({sizeLabel(asset.bytes)})</span> : null}
              </a>
              <button
                type="button"
                onClick={() => onChange(assets.filter((item) => item.publicId !== asset.publicId))}
                className="shrink-0 text-mist hover:text-frost"
                aria-label={`Remove ${asset.name}`}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
      {error && <p className="mt-2 text-xs text-[#8f1d16]">{error}</p>}
    </div>
  )
}