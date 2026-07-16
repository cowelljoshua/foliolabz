import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase, supabaseConfigured } from '../lib/supabase.js'
import OwnerProjectTracker from '../components/OwnerProjectTracker.jsx'
import { normalizeTracker } from '../config/projectTracker.js'

const stages = [
  ['brief', 'Brief received'],
  ['building', 'Building'],
  ['review', 'Client review'],
  ['polish', 'Final polish'],
  ['live', 'Live'],
]

const emptyClient = {
  name: '', email: '', package: 'launch', rush: false, balance_due: 250,
  build_status: 'brief', pay_link: '', domain: '', domain_active: false,
}

function money(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Number(value) || 0)
}

function dateLabel(value) {
  if (!value) return 'No date'
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(value))
}

function Label({ children }) {
  return <span className="mb-1.5 block text-xs font-bold uppercase tracking-[0.12em] text-mist">{children}</span>
}

function IntakeValue({ label, value }) {
  if (value === undefined || value === null || value === '' || (Array.isArray(value) && value.length === 0)) return null
  const shown = Array.isArray(value) ? value.join(', ') : typeof value === 'boolean' ? (value ? 'Yes' : 'No') : String(value)
  return <div className="rounded-xl border border-frost/10 bg-frost/[0.03] p-3"><dt className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-mist/70">{label}</dt><dd className="mt-1 whitespace-pre-wrap text-sm text-frost">{shown}</dd></div>
}

function IntakeDetails({ intake }) {
  if (!intake || Object.keys(intake).length === 0) return <p className="text-sm text-mist">No intake form is attached to this profile.</p>
  const projects = Array.isArray(intake.projects) ? intake.projects : []
  const assets = Array.isArray(intake.assets) ? intake.assets : []
  return (
    <div className="space-y-5">
      <dl className="grid gap-3 sm:grid-cols-2">
        <IntakeValue label="Phone" value={intake.phone} />
        <IntakeValue label="Profession" value={intake.profession} />
        <IntakeValue label="Site format" value={intake.siteFormat} />
        <IntakeValue label="Domain interest" value={intake.domainInterest} />
        <IntakeValue label="Color directions" value={intake.styles} />
        <IntakeValue label="Brands they like" value={intake.brands} />
        <IntakeValue label="Sections requested" value={intake.pages} />
        <IntakeValue label="Social links" value={intake.socials} />
      </dl>
      <dl className="grid gap-3">
        <IntakeValue label="Bio" value={intake.bio} />
        <IntakeValue label="Style notes" value={intake.styleNotes} />
        <IntakeValue label="Sites to emulate" value={intake.emulate} />
        <IntakeValue label="Extra notes" value={intake.notes} />
      </dl>
      {projects.length > 0 && (
        <div>
          <h4 className="font-display font-semibold">Projects</h4>
          <div className="mt-3 grid gap-3">
            {projects.map((project, index) => (
              <article key={`${project.title}-${index}`} className="rounded-xl border border-frost/10 bg-frost/[0.03] p-4">
                <p className="font-semibold">{project.title || `Project ${index + 1}`}</p>
                {project.description && <p className="mt-2 whitespace-pre-wrap text-sm text-mist">{project.description}</p>}
                {project.link && <a className="mt-2 block break-all text-sm text-cyan hover:underline" href={project.link} target="_blank" rel="noreferrer">{project.link}</a>}
              </article>
            ))}
          </div>
        </div>
      )}
      {assets.length > 0 && (
        <div>
          <h4 className="font-display font-semibold">Uploaded files</h4>
          <div className="mt-3 flex flex-wrap gap-2">
            {assets.map((asset, index) => <a key={`${asset.url}-${index}`} href={asset.url} target="_blank" rel="noreferrer" className="rounded-full border border-cyan/25 px-3 py-1.5 text-xs font-semibold text-cyan hover:bg-cyan/10">{asset.role || asset.name || `File ${index + 1}`}</a>)}
          </div>
        </div>
      )}
    </div>
  )
}

export default function Owner() {
  const [session, setSession] = useState(null)
  const [authReady, setAuthReady] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')
  const [signingIn, setSigningIn] = useState(false)
  const [resetSending, setResetSending] = useState(false)
  const [resetNotice, setResetNotice] = useState('')
  const [clients, setClients] = useState([])
  const [selectedEmail, setSelectedEmail] = useState('')
  const [draft, setDraft] = useState(null)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [notice, setNotice] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [newClient, setNewClient] = useState(emptyClient)

  const selected = clients.find((client) => client.email === selectedEmail) || null
  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return clients
    return clients.filter((client) => `${client.name} ${client.email} ${client.domain}`.toLowerCase().includes(query))
  }, [clients, search])

  useEffect(() => {
    if (!supabaseConfigured) { setAuthReady(true); return undefined }
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setAuthReady(true) })
    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => { setSession(nextSession); setAuthReady(true) })
    return () => data.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (selected) {
      setDraft({
        ...selected,
        next_step: selected.next_step || '',
        target_launch_date: selected.target_launch_date || '',
        preview_url: selected.preview_url || '',
        owner_tracker: normalizeTracker(selected.owner_tracker),
      })
    }
  }, [selected])

  useEffect(() => {
    if (!session) { setClients([]); setSelectedEmail(''); return }
    loadClients(session)
  }, [session])

  async function api(method, body, activeSession = session) {
    const response = await fetch('/.netlify/functions/owner-clients', {
      method,
      headers: {
        Authorization: `Bearer ${activeSession?.access_token}`,
        ...(body ? { 'Content-Type': 'application/json' } : {}),
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    })
    const result = await response.json()
    if (!response.ok) throw new Error(result.error || 'Something went wrong')
    return result
  }

  async function loadClients(activeSession = session) {
    setLoading(true)
    setNotice('')
    try {
      const result = await api('GET', null, activeSession)
      setClients(result.clients || [])
      setSelectedEmail((current) => current || result.clients?.[0]?.email || '')
    } catch (error) {
      setNotice(error.message)
    } finally {
      setLoading(false)
    }
  }

  async function signIn(event) {
    event.preventDefault()
    setSigningIn(true)
    setAuthError('')
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password })
    if (error) setAuthError(error.message)
    setSigningIn(false)
  }

  async function sendPasswordReset() {
    const ownerEmail = email.trim().toLowerCase()
    setAuthError('')
    setResetNotice('')
    if (!ownerEmail) {
      setAuthError('Enter your owner email first.')
      return
    }

    setResetSending(true)
    const { error } = await supabase.auth.resetPasswordForEmail(ownerEmail, {
      redirectTo: `${window.location.origin}/reset-password?return=owner`,
    })
    setResetSending(false)

    if (error) setAuthError(error.message)
    else setResetNotice('Password reset email sent. Open the newest message from Supabase.')
  }

  async function saveClient() {
    setLoading(true)
    setNotice('')
    try {
      const updates = {
        name: draft.name,
        package: draft.package,
        rush: draft.rush,
        balance_due: Number(draft.balance_due),
        build_status: draft.build_status,
        pay_link: draft.pay_link,
        domain: draft.domain,
        domain_active: draft.domain_active,
        next_step: draft.next_step,
        target_launch_date: draft.target_launch_date,
        preview_url: draft.preview_url,
      }
      const result = await api('PATCH', { email: draft.email, updates, ownerTracker: draft.owner_tracker })
      setClients((current) => current.map((client) => client.email === result.client.email ? result.client : client))
      setNotice('Client updated.')
    } catch (error) {
      setNotice(error.message)
    } finally {
      setLoading(false)
    }
  }

  async function createClient(event) {
    event.preventDefault()
    setLoading(true)
    setNotice('')
    try {
      const result = await api('POST', newClient)
      setClients((current) => [result.client, ...current])
      setSelectedEmail(result.client.email)
      setNewClient(emptyClient)
      setShowAdd(false)
      setNotice('Client added. They can now request a portal sign-in link.')
    } catch (error) {
      setNotice(error.message)
    } finally {
      setLoading(false)
    }
  }

  function updateNew(key, value) {
    setNewClient((current) => {
      const next = { ...current, [key]: value }
      if (key === 'package' || key === 'rush') {
        next.balance_due = (next.package === 'pro' ? 500 : 250) + (next.rush ? 75 : 0)
      }
      return next
    })
  }

  if (!authReady) return <main className="grid min-h-screen place-items-center bg-ink-950 text-mist">Loading owner dashboard…</main>

  if (!supabaseConfigured) {
    return <main className="grid min-h-screen place-items-center bg-ink-950 px-6 text-center text-frost"><div><h1 className="font-display text-3xl font-semibold">Owner dashboard is not configured</h1><p className="mt-3 text-mist">Add the Supabase browser values before using this page.</p></div></main>
  }

  if (!session) {
    return (
      <main className="grid min-h-screen place-items-center bg-ink-950 px-6 py-16 text-frost">
        <form onSubmit={signIn} className="glass w-full max-w-md rounded-3xl p-7 sm:p-9">
          <Link to="/" className="text-sm text-mist hover:text-frost">← FolioLabz</Link>
          <p className="mt-8 text-xs font-bold uppercase tracking-[0.16em] text-violet">Private workspace</p>
          <h1 className="font-display mt-2 text-3xl font-semibold">Owner sign-in</h1>
          <p className="mt-2 text-sm text-mist">Manage client profiles, balances, and build progress.</p>
          <label className="mt-7 block"><Label>Email</Label><input className="field-input" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} /></label>
          <label className="mt-4 block"><Label>Password</Label><input className="field-input" type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} /></label>
          {authError && <p className="mt-4 rounded-xl bg-[#b3261e]/10 p-3 text-sm text-[#e98b84]">{authError}</p>}
          {resetNotice && <p className="mt-4 rounded-xl bg-mint/10 p-3 text-sm text-mint">{resetNotice}</p>}
          <button className="btn-primary mt-6 w-full justify-center disabled:opacity-40" disabled={signingIn}>{signingIn ? 'Signing in…' : 'Sign in'}</button>
          <button type="button" onClick={sendPasswordReset} className="mt-4 w-full text-center text-sm text-cyan hover:underline disabled:opacity-40" disabled={resetSending}>{resetSending ? 'Sending reset email…' : 'Forgot password?'}</button>
        </form>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-ink-950 text-frost">
      <header className="border-b border-frost/10 bg-ink-950/90 px-5 py-4 backdrop-blur-xl sm:px-8">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4">
          <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-violet">FolioLabz</p><h1 className="font-display text-xl font-semibold">Owner workspace</h1></div>
          <div className="flex items-center gap-3"><span className="hidden text-sm text-mist sm:inline">{session.user.email}</span><button onClick={() => supabase.auth.signOut()} className="rounded-full border border-frost/15 px-4 py-2 text-sm hover:bg-frost/5">Sign out</button></div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1500px] gap-6 px-5 py-6 lg:grid-cols-[22rem_minmax(0,1fr)] sm:px-8">
        <aside className="lg:sticky lg:top-6 lg:h-[calc(100vh-7rem)]">
          <div className="glass flex h-full flex-col rounded-3xl p-4">
            <div className="flex items-center justify-between gap-3 px-1"><div><p className="font-display text-lg font-semibold">Clients</p><p className="text-xs text-mist">{clients.length} total</p></div><button onClick={() => setShowAdd((value) => !value)} className="rounded-full bg-violet px-4 py-2 text-sm font-semibold text-white">{showAdd ? 'Close' : '+ Add'}</button></div>
            <input className="field-input mt-4" type="search" placeholder="Search clients…" value={search} onChange={(event) => setSearch(event.target.value)} />
            <div className="mt-3 flex-1 space-y-2 overflow-y-auto pr-1">
              {loading && clients.length === 0 && <p className="p-4 text-sm text-mist">Loading clients…</p>}
              {!loading && filtered.length === 0 && <p className="p-4 text-sm text-mist">No clients found.</p>}
              {filtered.map((client) => (
                <button key={client.email} onClick={() => { setSelectedEmail(client.email); setShowAdd(false) }} className={`w-full rounded-2xl border p-4 text-left transition ${selectedEmail === client.email ? 'border-violet bg-violet/10' : 'border-frost/10 bg-frost/[0.025] hover:border-frost/25'}`}>
                  <span className="font-display block font-semibold">{client.name}</span><span className="mt-0.5 block truncate text-xs text-mist">{client.email}</span>
                  <span className="mt-3 flex items-center justify-between text-xs"><span className="rounded-full bg-frost/5 px-2.5 py-1 text-mist">{stages.find(([id]) => id === client.build_status)?.[1]}</span><span className={client.balance_due > 0 ? 'text-cyan' : 'text-mint'}>{client.balance_due > 0 ? money(client.balance_due) : 'Paid'}</span></span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        <section className="min-w-0">
          {notice && <div className="mb-5 rounded-2xl border border-cyan/25 bg-cyan/[0.06] p-4 text-sm text-mist">{notice}</div>}
          {showAdd ? (
            <form onSubmit={createClient} className="glass rounded-3xl p-6 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet">New profile</p><h2 className="font-display mt-2 text-2xl font-semibold">Add a client</h2>
              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <label><Label>Name</Label><input className="field-input" required value={newClient.name} onChange={(event) => updateNew('name', event.target.value)} /></label>
                <label><Label>Email</Label><input className="field-input" type="email" required value={newClient.email} onChange={(event) => updateNew('email', event.target.value)} /></label>
                <label><Label>Package</Label><select className="field-input" value={newClient.package} onChange={(event) => updateNew('package', event.target.value)}><option value="launch">Launch</option><option value="pro">Pro</option></select></label>
                <label><Label>Balance due</Label><input className="field-input" type="number" min="0" value={newClient.balance_due} onChange={(event) => updateNew('balance_due', event.target.value)} /></label>
                <label className="flex items-center gap-3 rounded-2xl border border-frost/10 p-4"><input type="checkbox" checked={newClient.rush} onChange={(event) => updateNew('rush', event.target.checked)} /><span className="text-sm font-semibold">Rush build (+$75)</span></label>
              </div>
              <button className="btn-primary mt-7 disabled:opacity-40" disabled={loading}>{loading ? 'Adding…' : 'Add client'}</button>
            </form>
          ) : draft ? (
            <div className="space-y-6">
              <section className="glass rounded-3xl p-6 sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-violet">Client profile</p><h2 className="font-display mt-2 text-3xl font-semibold">{draft.name}</h2><p className="mt-1 text-sm text-mist">{draft.email} · Added {dateLabel(draft.created_at)}</p></div><button onClick={saveClient} disabled={loading} className="btn-primary disabled:opacity-40">{loading ? 'Saving…' : 'Save changes'}</button></div>
                <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  <label><Label>Name</Label><input className="field-input" value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} /></label>
                  <label><Label>Package</Label><select className="field-input" value={draft.package} onChange={(event) => setDraft({ ...draft, package: event.target.value })}><option value="launch">Launch</option><option value="pro">Pro</option></select></label>
                  <label><Label>Build status</Label><select className="field-input" value={draft.build_status} onChange={(event) => setDraft({ ...draft, build_status: event.target.value })}>{stages.map(([id, label]) => <option key={id} value={id}>{label}</option>)}</select></label>
                  <label><Label>Balance due</Label><input className="field-input" type="number" min="0" value={draft.balance_due} onChange={(event) => setDraft({ ...draft, balance_due: event.target.value })} /></label>
                  <label><Label>Domain</Label><input className="field-input" placeholder="name.com" value={draft.domain || ''} onChange={(event) => setDraft({ ...draft, domain: event.target.value })} /></label>
                  <label><Label>Personal payment link</Label><input className="field-input" placeholder="https://…" value={draft.pay_link || ''} onChange={(event) => setDraft({ ...draft, pay_link: event.target.value })} /></label>
                </div>
                <div className="mt-5 flex flex-wrap gap-4"><label className="flex items-center gap-3 rounded-2xl border border-frost/10 px-4 py-3"><input type="checkbox" checked={draft.rush} onChange={(event) => setDraft({ ...draft, rush: event.target.checked })} /><span className="text-sm font-semibold">Rush build</span></label><label className="flex items-center gap-3 rounded-2xl border border-frost/10 px-4 py-3"><input type="checkbox" checked={draft.domain_active} onChange={(event) => setDraft({ ...draft, domain_active: event.target.checked })} /><span className="text-sm font-semibold">Domain active</span></label></div>
              </section>
              <OwnerProjectTracker
                tracker={draft.owner_tracker}
                onChange={(owner_tracker) => setDraft({ ...draft, owner_tracker })}
                publicFields={draft}
                onPublicChange={(key, value) => setDraft({ ...draft, [key]: value })}
              />
              <section className="glass rounded-3xl p-6 sm:p-8"><p className="text-xs font-bold uppercase tracking-[0.16em] text-violet">Original brief</p><h3 className="font-display mt-2 text-2xl font-semibold">Everything they submitted</h3><div className="mt-6"><IntakeDetails intake={draft.intake} /></div></section>
            </div>
          ) : (
            <div className="glass grid min-h-[32rem] place-items-center rounded-3xl p-8 text-center"><div><p className="font-display text-2xl font-semibold">Select a client</p><p className="mt-2 text-sm text-mist">Choose a profile from the list or add a new client.</p></div></div>
          )}
        </section>
      </div>
    </main>
  )
}