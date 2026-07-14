import { useEffect, useRef, useState } from 'react'
import { loadExternalScript } from '../lib/externalScript.js'

const TURNSTILE_SCRIPT = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY

export default function UploadGate({ sessionId, authorization, onAuthorize, onExpire }) {
  const containerRef = useRef(null)
  const widgetRef = useRef(null)
  const [status, setStatus] = useState('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (authorization?.token || !SITE_KEY) return undefined
    let cancelled = false

    loadExternalScript(TURNSTILE_SCRIPT, () => Boolean(window.turnstile))
      .then(() => {
        if (cancelled || !containerRef.current || widgetRef.current !== null) return
        setStatus('ready')
        widgetRef.current = window.turnstile.render(containerRef.current, {
          sitekey: SITE_KEY,
          theme: 'dark',
          size: 'flexible',
          callback: async (turnstileToken) => {
            setStatus('checking')
            setMessage('')
            try {
              const response = await fetch('/.netlify/functions/upload-authorize', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ turnstileToken, sessionId }),
              })
              const data = await response.json().catch(() => ({}))
              if (!response.ok || !data.token) throw new Error(data.error || 'Verification failed')
              onAuthorize({ token: data.token, expiresAt: data.expiresAt })
              setStatus('authorized')
            } catch (error) {
              setStatus('error')
              setMessage(error.message || 'Could not verify. Please try again.')
              window.turnstile.reset(widgetRef.current)
            }
          },
          'expired-callback': () => {
            onExpire()
            setStatus('ready')
          },
          'error-callback': () => {
            onExpire()
            setStatus('error')
            setMessage('The security check could not load. Please refresh and try again.')
          },
        })
      })
      .catch(() => {
        if (!cancelled) {
          setStatus('error')
          setMessage('The security check could not load. Please refresh and try again.')
        }
      })

    return () => {
      cancelled = true
      if (widgetRef.current !== null && window.turnstile) {
        window.turnstile.remove(widgetRef.current)
        widgetRef.current = null
      }
    }
  }, [authorization?.token, onAuthorize, onExpire, sessionId])

  if (authorization?.token) {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-mint/40 bg-mint/[0.06] px-4 py-3 text-sm">
        <span aria-hidden="true">✓</span>
        <span><span className="font-semibold text-frost">Uploads unlocked.</span> Files go directly to secure Cloudinary storage.</span>
      </div>
    )
  }

  if (!SITE_KEY) {
    return (
      <div className="rounded-2xl border border-[#ff6b5e]/35 bg-[#ff6b5e]/[0.08] p-4 text-sm text-[#ffb3a8]">
        File uploads are not configured yet. Add the Cloudinary and Turnstile environment variables from SETUP.md.
      </div>
    )
  }

  return (
    <div className="rounded-2xl border hairline bg-frost/[0.03] p-4">
      <p className="mb-3 text-sm text-mist">
        Complete this quick security check once before uploading. It protects the file storage from spam.
      </p>
      <div ref={containerRef} />
      {status === 'checking' && <p className="mt-2 text-xs text-cyan">Unlocking uploads…</p>}
      {message && <p className="mt-2 text-xs text-[#ffb3a8]">{message}</p>}
    </div>
  )
}
