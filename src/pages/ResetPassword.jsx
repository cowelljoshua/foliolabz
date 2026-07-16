import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase, supabaseConfigured } from '../lib/supabase.js'

export default function ResetPassword() {
  const navigate = useNavigate()
  const [checking, setChecking] = useState(true)
  const [hasSession, setHasSession] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [saving, setSaving] = useState(false)
  const [notice, setNotice] = useState('')
  const [complete, setComplete] = useState(false)

  useEffect(() => {
    if (!supabaseConfigured) {
      setChecking(false)
      return undefined
    }

    supabase.auth.getSession().then(({ data }) => {
      setHasSession(Boolean(data.session))
      setChecking(false)
    })

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setHasSession(Boolean(session))
      setChecking(false)
    })

    return () => data.subscription.unsubscribe()
  }, [])

  async function updatePassword(event) {
    event.preventDefault()
    setNotice('')

    if (password.length < 10) {
      setNotice('Use at least 10 characters.')
      return
    }
    if (password !== confirmPassword) {
      setNotice('The passwords do not match.')
      return
    }

    setSaving(true)
    const { error } = await supabase.auth.updateUser({ password })
    setSaving(false)

    if (error) {
      setNotice(error.message)
      return
    }

    setComplete(true)
    setNotice('Password updated. Opening your owner workspace…')
    window.setTimeout(() => navigate('/owner', { replace: true }), 900)
  }

  return (
    <main className="grid min-h-screen place-items-center bg-ink-950 px-6 py-16 text-frost">
      <section className="glass w-full max-w-md rounded-3xl p-7 sm:p-9">
        <Link to="/" className="text-sm text-mist hover:text-frost">← FolioLabz</Link>
        <p className="mt-8 text-xs font-bold uppercase tracking-[0.16em] text-violet">Private workspace</p>
        <h1 className="font-display mt-2 text-3xl font-semibold">Choose a new password</h1>

        {checking ? (
          <p className="mt-5 text-sm text-mist">Checking your secure recovery link…</p>
        ) : !supabaseConfigured ? (
          <p className="mt-5 rounded-xl bg-[#b3261e]/10 p-3 text-sm text-[#e98b84]">Password recovery is not configured.</p>
        ) : !hasSession ? (
          <div className="mt-5 space-y-4">
            <p className="rounded-xl bg-[#b3261e]/10 p-3 text-sm text-[#e98b84]">This recovery link is invalid or expired. Return to owner sign-in and request a new one.</p>
            <Link to="/owner" className="btn-primary w-full justify-center">Return to owner sign-in</Link>
          </div>
        ) : (
          <form onSubmit={updatePassword} className="mt-6">
            <label className="block">
              <span className="mb-1.5 block text-xs font-bold uppercase tracking-[0.12em] text-mist">New password</span>
              <input className="field-input" type="password" autoComplete="new-password" minLength="10" required value={password} onChange={(event) => setPassword(event.target.value)} />
            </label>
            <label className="mt-4 block">
              <span className="mb-1.5 block text-xs font-bold uppercase tracking-[0.12em] text-mist">Confirm new password</span>
              <input className="field-input" type="password" autoComplete="new-password" minLength="10" required value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
            </label>
            {notice && <p className={`mt-4 rounded-xl p-3 text-sm ${complete ? 'bg-mint/10 text-mint' : 'bg-[#b3261e]/10 text-[#e98b84]'}`}>{notice}</p>}
            <button className="btn-primary mt-6 w-full justify-center disabled:opacity-40" disabled={saving || complete}>{saving ? 'Updating…' : 'Update password'}</button>
          </form>
        )}
      </section>
    </main>
  )
}