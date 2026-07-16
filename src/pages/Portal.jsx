import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import Reveal from '../components/reactbits/Reveal.jsx'
import SpotlightCard from '../components/reactbits/SpotlightCard.jsx'
import { site, portal, balances, domainOffer, edits, stripeLinks } from '../config/site.js'
import ClientProjectStatus from '../components/ClientProjectStatus.jsx'
import { supabase, supabaseConfigured } from '../lib/supabase.js'

/* ---------- shared bits ---------- */

function Field({ label, optional, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-baseline gap-2 text-sm font-medium">
        {label}
        {optional && <span className="text-xs text-mist/60">optional</span>}
      </span>
      {children}
    </label>
  )
}

function BackLink({ onClick }) {
  return (
    <button onClick={onClick} className="text-sm text-mist hover:text-frost">
      ← All options
    </button>
  )
}


// Payment button that gracefully falls back when a Stripe link is not set yet.
function PayBlock({ url, label }) {
  if (url) {
    return (
      <a href={url} target="_blank" rel="noreferrer" className="btn-primary justify-center">
        {label}
      </a>
    )
  }
  return (
    <p className="rounded-xl border border-cyan/30 bg-cyan/[0.05] p-4 text-sm text-mist">
      Got it. I will email you a secure payment link at <span className="text-frost">{site.email}</span> shortly.
    </p>
  )
}

const buildStages = [
  { id: 'brief', label: 'Brief received', detail: 'I have your information and files.' },
  { id: 'building', label: 'Building', detail: 'Your portfolio is being designed and built.' },
  { id: 'review', label: 'Your review', detail: 'Your private preview is ready for feedback.' },
  { id: 'polish', label: 'Final polish', detail: 'I am applying the final changes before launch.' },
  { id: 'live', label: 'Live', detail: 'Your portfolio is launched.' },
]

function BuildStatus({ status = 'brief' }) {
  const matchedIndex = buildStages.findIndex((stage) => stage.id === status)
  const currentIndex = matchedIndex >= 0 ? matchedIndex : 0
  const current = buildStages[currentIndex]

  return (
    <section className="glass rounded-3xl p-6 sm:p-7" aria-label="Website build status">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet">Build status</p>
          <h2 className="font-display mt-1 text-xl font-semibold">{current.label}</h2>
          <p className="mt-1 text-sm text-mist">{current.detail}</p>
        </div>
        <span className="rounded-full bg-violet/10 px-3 py-1 text-xs font-semibold text-violet">
          Step {currentIndex + 1} of {buildStages.length}
        </span>
      </div>
      <div className="mt-6 overflow-x-auto pb-1">
        <div className="grid min-w-[34rem] grid-cols-5 gap-2">
          {buildStages.map((stage, index) => {
            const complete = index <= currentIndex
            return (
              <div key={stage.id} className="relative text-center">
                {index > 0 && (
                  <span className={`absolute right-1/2 top-3.5 h-0.5 w-full ${index <= currentIndex ? 'bg-violet' : 'bg-frost/10'}`} />
                )}
                <span className={`relative z-10 mx-auto flex h-7 w-7 items-center justify-center rounded-full border text-xs font-bold ${
                  complete ? 'border-violet bg-violet text-white' : 'border-frost/15 bg-ink-800 text-mist'
                }`}>
                  {index < currentIndex ? '✓' : index + 1}
                </span>
                <span className={`mt-2 block text-[0.68rem] font-semibold ${complete ? 'text-frost' : 'text-mist/65'}`}>{stage.label}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ---------- the page ---------- */

export default function Portal() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [session, setSession] = useState(null)
  const [client, setClient] = useState(null)
  const [loadingPortal, setLoadingPortal] = useState(true)
  const [signingIn, setSigningIn] = useState(false)
  const [authMessage, setAuthMessage] = useState('')

  const [action, setAction] = useState(null) // 'balance' | 'domain' | 'edit'
  const [balancePkg, setBalancePkg] = useState('')
  const [domainChoices, setDomainChoices] = useState(['', '', ''])
  const [domainNotes, setDomainNotes] = useState('')
  const [editType, setEditType] = useState('')
  const [editDetails, setEditDetails] = useState('')

  const [sending, setSending] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const emailOk = /.+@.+\..+/.test(email)
  const chosenEdit = edits.find((e) => e.id === editType)

  const owed = client?.balanceDue || 0
  const clientBalanceInfo = client ? balances.find((b) => b.pkg === client.package) : null
  const clientPayUrl = client ? (client.payLink || (!client.rush && clientBalanceInfo ? stripeLinks[clientBalanceInfo.stripeKey] : '')) : ''
  const chosenBalance = balances.find((b) => b.pkg === balancePkg)

  useEffect(() => {
    if (!supabaseConfigured) {
      setLoadingPortal(false)
      return undefined
    }

    let active = true
    const loadClient = async (nextSession) => {
      if (!active) return
      setSession(nextSession)
      if (!nextSession) {
        setClient(null)
        setLoadingPortal(false)
        return
      }

      setLoadingPortal(true)
      const { data, error: profileError } = await supabase
        .from('client_profiles')
        .select('name, email, package, rush, balance_due, build_status, pay_link, domain, domain_active, next_step, target_launch_date, preview_url, client_progress')
        .maybeSingle()

      if (!active) return
      if (profileError || !data) {
        setClient(null)
        setAuthMessage(`Your account is not set up for the client portal yet. Please email me at ${site.email}.`)
      } else {
        setClient({
          name: data.name,
          email: data.email,
          package: data.package,
          rush: data.rush,
          balanceDue: data.balance_due,
          buildStatus: data.build_status,
          payLink: data.pay_link,
          domain: data.domain,
          domainActive: data.domain_active,
          nextStep: data.next_step,
          targetLaunchDate: data.target_launch_date,
          previewUrl: data.preview_url,
          clientProgress: data.client_progress,
        })
        setName(data.name)
        setEmail(data.email)
        setAuthMessage('')
      }
      setLoadingPortal(false)
    }

    supabase.auth.getSession().then(({ data }) => loadClient(data.session))
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => loadClient(nextSession))
    return () => {
      active = false
      listener.subscription.unsubscribe()
    }
  }, [])

  const openAction = (a) => {
    setAction(a)
    setSubmitted(false)
    setError('')
  }

  const buildSummary = (type) => {
    const L = [`FOLIOLAB CLIENT REQUEST`, `=======================`, `Name: ${name}`, `Email: ${email}`, '']
    if (type === 'domain') {
      L.push('Request: Set up a custom domain')
      domainChoices.forEach((choice, index) => {
        L.push(`Choice ${index + 1}: ${choice || 'left blank'}`)
      })
      if (domainNotes) L.push(`Notes: ${domainNotes}`)
      L.push('Next step: Check availability before updating the client profile or requesting payment.')
    } else if (type === 'edit') {
      L.push(`Request: ${chosenEdit?.name} (${chosenEdit?.priceLabel})`)
      L.push('')
      L.push('CHANGES:')
      L.push(editDetails || 'none provided')
    }
    return L.join('\n')
  }

  const submitRequest = async (type) => {
    if (type === 'domain' && domainChoices.some((choice) => !choice.trim())) {
      setError('Please enter all three domain choices before sending your request.')
      return
    }
    setSending(true)
    setError('')
    const fd = new FormData()
    fd.append('form-name', 'client-request')
    fd.append('name', name)
    fd.append('email', email)
    fd.append('request_type', type)
    domainChoices.forEach((choice, index) => {
      fd.append(`domain_option_${index + 1}`, type === 'domain' ? choice : '')
    })
    fd.append('domain_notes', type === 'domain' ? domainNotes : '')
    fd.append('edit_type', type === 'edit' ? editType : '')
    fd.append('details', type === 'edit' ? editDetails : '')
    fd.append('summary', buildSummary(type))
    try {
      const res = await fetch('/', { method: 'POST', body: fd })
      if (!res.ok) throw new Error(`Status ${res.status}`)
      setSubmitted(true)
    } catch (e) {
      if (import.meta.env.DEV) {
        console.warn('DEV: simulating successful request', e)
        setSubmitted(true)
      } else {
        setError(`Something went wrong sending that. Email me directly at ${site.email} and I will sort it out.`)
      }
    } finally {
      setSending(false)
    }
  }

  /* ---------- secure sign-in gate ---------- */

  const signInWithPassword = async (event) => {
    event.preventDefault()
    if (!emailOk || !password || !supabaseConfigured) return
    setSigningIn(true)
    setAuthMessage('')
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    })
    if (signInError) setAuthMessage('That username or password did not work. Use “Set or reset password” if needed.')
    setSigningIn(false)
  }

  const sendPasswordSetup = async () => {
    if (!emailOk || !supabaseConfigured) return
    setSigningIn(true)
    setAuthMessage('')
    try {
      const response = await fetch('/.netlify/functions/portal-sign-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error)
      setAuthMessage(result.approved
        ? 'Check your email for a secure link to choose your password.'
        : `We could not find an approved client account for that email. Please email me at ${site.email}.`)
    } catch (requestError) {
      setAuthMessage(requestError.message || `We could not send the password email. Please email me at ${site.email}.`)
    } finally {
      setSigningIn(false)
    }
  }

  if (loadingPortal) {
    return <main className="mx-auto flex min-h-[80vh] max-w-lg items-center justify-center px-6 pt-28 pb-16 text-mist">Loading your portal…</main>
  }

  if (!supabaseConfigured) {
    return (
      <main className="mx-auto flex min-h-[80vh] max-w-lg flex-col justify-center px-6 pt-28 pb-16">
        <div className="glass rounded-3xl p-7 text-center">
          <h1 className="font-head text-3xl">Client portal is being set up</h1>
          <p className="mt-3 text-mist">Please email me at <a href={`mailto:${site.email}`} className="text-cyan hover:underline">{site.email}</a> for help.</p>
        </div>
      </main>
    )
  }

  if (!session) {
    return (
      <main className="mx-auto flex min-h-[80vh] max-w-lg flex-col justify-center px-6 pt-28 pb-16">
        <Reveal className="text-center">
          <h1 className="font-head text-4xl sm:text-5xl">{portal.heading}</h1>
          <p className="mt-3 text-mist">Use the email on your project as your username, plus the password you created.</p>
        </Reveal>
        <Reveal delay={0.1} className="mt-9">
          <form onSubmit={signInWithPassword} className="glass rounded-3xl p-7">
            <h2 className="font-display text-lg font-semibold">Client sign-in</h2>
            <div className="mt-5 space-y-5">
              <Field label="Username / email">
                <input className="field-input" type="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@email.com" required />
              </Field>
              <Field label="Password">
                <input className="field-input" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required />
              </Field>
              <button type="submit" disabled={!emailOk || !password || signingIn} className="btn-primary w-full justify-center disabled:opacity-40">
                {signingIn ? 'Signing in…' : 'Sign in'}
              </button>
              <button type="button" onClick={sendPasswordSetup} disabled={!emailOk || signingIn} className="w-full text-center text-sm font-semibold text-cyan hover:underline disabled:opacity-40">
                Set or reset password
              </button>
              {authMessage && <p className="rounded-xl border border-cyan/30 bg-cyan/[0.05] p-3.5 text-sm text-mist">{authMessage}</p>}
              <p className="text-xs text-mist/70">New client? Enter the email used on your intake, then choose “Set or reset password.”</p>
            </div>
          </form>
        </Reveal>
      </main>
    )
  }

  if (!client) {
    return (
      <main className="mx-auto flex min-h-[80vh] max-w-lg flex-col justify-center px-6 pt-28 pb-16">
        <div className="glass rounded-3xl p-7 text-center">
          <h1 className="font-head text-3xl">Account not found</h1>
          <p className="mt-3 text-mist">{authMessage || `Please email me at ${site.email} and I’ll help you get access.`}</p>
          <button onClick={() => supabase.auth.signOut()} className="mt-6 text-sm text-cyan hover:underline">Use a different email</button>
        </div>
      </main>
    )
  }

  /* ---------- dashboard ---------- */

  const firstName = name.split(' ')[0]

  return (
    <main className="mx-auto max-w-3xl px-6 pt-32 pb-24">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="font-head text-3xl sm:text-4xl">Welcome back, {firstName}.</h1>
            <p className="mt-1.5 text-sm text-mist">Signed in as {email}</p>
          </div>
          <button
            onClick={() => supabase.auth.signOut()}
            className="text-sm text-mist hover:text-frost"
          >
            Not you? Switch
          </button>
        </div>
        {client && (
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-full bg-violet/15 px-3.5 py-1.5 text-xs font-semibold text-violet-soft">
              {clientBalanceInfo?.name} build{client.rush ? ' · Rush' : ''}
            </span>
            <span className={`rounded-full px-3.5 py-1.5 text-xs font-semibold ${owed > 0 ? 'bg-cyan/15 text-cyan' : 'bg-mint/15 text-mint'}`}>
              {owed > 0 ? `$${owed} due at launch` : 'Fully paid ✓'}
            </span>
            {client.domain && (
              <span className={`rounded-full px-3.5 py-1.5 text-xs font-semibold ${client.domainActive ? 'bg-mint/15 text-mint' : 'bg-frost/10 text-mist'}`}>
                {client.domain}{client.domainActive ? ' · active ✓' : ' · payment needed'}
              </span>
            )}
          </div>
        )}
      </Reveal>

      {client && (
        <Reveal delay={0.08} className="mt-6">
          <BuildStatus status={client.buildStatus} />
          <ClientProjectStatus
            progress={client.clientProgress}
            nextStep={client.nextStep}
            targetLaunchDate={client.targetLaunchDate}
            previewUrl={client.previewUrl}
          />
        </Reveal>
      )}

      <AnimatePresence mode="wait">
        {/* ---- menu ---- */}
        {!action && (
          <motion.div
            key="menu"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="mt-10 grid gap-5 sm:grid-cols-3"
          >
            <button onClick={() => openAction('balance')} className="text-left">
              <SpotlightCard className="h-full p-6" spotColor="rgba(34,211,238,0.14)">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan/12 text-cyan">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
                    <path d="M3 10h18" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                </span>
                <h2 className="font-display mt-3 text-lg font-semibold">Pay your balance</h2>
                <p className="mt-1 text-sm text-mist">
                  {client
                    ? owed > 0
                      ? `$${owed} due when your site goes live.`
                      : 'All paid up, nothing due.'
                    : 'Clear the rest of your build once it is live.'}
                </p>
              </SpotlightCard>
            </button>
            <button onClick={() => openAction('domain')} className="text-left">
              <SpotlightCard className="h-full p-6" spotColor="rgba(124,92,255,0.14)">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet/12 text-violet">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
                    <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                </span>
                <h2 className="font-display mt-3 text-lg font-semibold">Set up a domain</h2>
                <p className="mt-1 text-sm text-mist">
                  {client?.domainActive
                    ? `${client.domain} is live and billing.`
                    : client?.domain
                      ? `${client.domain} is available. Payment is needed before launch.`
                      : 'Share any domain names you want me to check.'}
                </p>
              </SpotlightCard>
            </button>
            <button onClick={() => openAction('edit')} className="text-left">
              <SpotlightCard className="h-full p-6" spotColor="rgba(74,222,128,0.14)">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-mint/12 text-mint">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M4 20l1-4L16.5 4.5a2.1 2.1 0 013 3L8 19l-4 1z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                    <path d="M14.5 6.5l3 3" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                </span>
                <h2 className="font-display mt-3 text-lg font-semibold">Request an edit</h2>
                <p className="mt-1 text-sm text-mist">Wording from $10, design changes from $40.</p>
              </SpotlightCard>
            </button>
          </motion.div>
        )}

        {/* ---- pay balance ---- */}
        {action === 'balance' && (
          <motion.div key="balance" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.25 }} className="mt-10">
            <div className="glass rounded-3xl p-7">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-xl font-semibold">Pay your balance</h2>
                <BackLink onClick={() => setAction(null)} />
              </div>

              {client ? (
                /* Known client: exactly their number, nothing to pick. */
                owed > 0 ? (
                  <div className="mt-5 space-y-5">
                    <div className="rounded-2xl border border-cyan/30 bg-cyan/[0.05] p-6 text-center">
                      <p className="text-sm text-mist">
                        {clientBalanceInfo?.name} build{client.rush ? ' with rush' : ''}, $50 deposit paid
                      </p>
                      <p className="font-display mt-2 text-4xl font-bold">${owed}</p>
                      <p className="mt-1 text-xs text-mist">due when your site goes live</p>
                    </div>
                    <PayBlock url={clientPayUrl} label={`Pay my $${owed} balance`} />
                  </div>
                ) : (
                  <div className="mt-5 rounded-2xl border border-mint/40 bg-mint/[0.06] p-6 text-center">
                    <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-mint/12 text-mint">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
                        <path d="M8.5 12.5l2.4 2.4L15.5 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <p className="font-display mt-2 font-semibold">You are all paid up.</p>
                    <p className="mt-1 text-sm text-mist">Nothing due on your build.</p>
                  </div>
                )
              ) : (
                /* Unknown email: fall back to picking the package. */
                <>
                  <p className="mt-2 text-sm text-mist">
                    Your $50 deposit is already in. Pick the package you signed up for to pay the rest.
                  </p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {balances.map((b) => (
                      <button
                        key={b.pkg}
                        onClick={() => setBalancePkg(b.pkg)}
                        className={`rounded-2xl border p-5 text-left transition-colors ${
                          balancePkg === b.pkg ? 'border-cyan bg-cyan/10' : 'hairline bg-frost/[0.03] hover:border-frost/30'
                        }`}
                      >
                        <span className="font-display block font-semibold">{b.name}</span>
                        <span className="mt-0.5 block text-xs text-mist">{b.total} total, $50 deposit paid</span>
                        <span className="font-display mt-2 block text-2xl font-bold">{b.balanceLabel} left</span>
                      </button>
                    ))}
                  </div>
                  {chosenBalance && (
                    <div className="mt-6 flex flex-col gap-3">
                      <PayBlock url={stripeLinks[chosenBalance.stripeKey]} label={`Pay ${chosenBalance.balanceLabel} balance`} />
                      <p className="text-center text-xs text-mist">
                        Added rush? Your balance is $75 higher, I will email that link so nothing double-charges.
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        )}

        {/* ---- domain ---- */}
        {action === 'domain' && (
          <motion.div key="domain" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.25 }} className="mt-10">
            <div className="glass rounded-3xl p-7">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-xl font-semibold">Set up your custom domain</h2>
                <BackLink onClick={() => setAction(null)} />
              </div>
              <p className="mt-2 text-sm text-mist">{domainOffer.detail}</p>

              {client?.domainActive ? (
                /* Their domain is already live and billing. */
                <div className="mt-5 rounded-2xl border border-mint/40 bg-mint/[0.06] p-6 text-center">
                  <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-mint/12 text-mint">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
                      <path d="M8.5 12.5l2.4 2.4L15.5 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <p className="font-display mt-2 font-semibold">{client.domain} is live.</p>
                  <p className="mt-1 text-sm text-mist">Nothing to do here.</p>
                </div>
              ) : client?.domain ? (
                /* I already know the domain they want; just start billing. */
                <div className="mt-5 space-y-4">
                  <div className="rounded-2xl border border-cyan/30 bg-cyan/[0.05] p-6 text-center">
                    <p className="text-sm text-mist">Available domain confirmed</p>
                    <p className="font-display mt-1 text-2xl font-bold">{client.domain}</p>
                    <p className="mt-2 text-sm text-mist">
                      Your domain payment has not started yet. Start the {domainOffer.yearly.label} subscription before I can register it and put your site live there.
                    </p>
                  </div>
                  <PayBlock
                    url={stripeLinks[domainOffer.yearly.stripeKey]}
                    label={`Start ${client.domain} · ${domainOffer.yearly.label}`}
                  />
                </div>
              ) : !submitted ? (
                <div className="mt-5 space-y-5">
                  <p className="text-sm text-mist">
                    Share three domain names you would like me to check, in order of preference.
                  </p>
                  {domainChoices.map((choice, index) => (
                    <Field key={index} label={`${index === 0 ? 'First' : index === 1 ? 'Second' : 'Third'} choice`}>
                      <input
                        className="field-input"
                        value={choice}
                        onChange={(e) => setDomainChoices((current) => current.map((item, choiceIndex) => choiceIndex === index ? e.target.value : item))}
                        required
                        autoCapitalize="none"
                        autoCorrect="off"
                        spellCheck={false}
                      />
                    </Field>
                  ))}
                  <Field label="Anything I should know?" optional>
                    <textarea className="field-input min-h-20" value={domainNotes} onChange={(e) => setDomainNotes(e.target.value)} placeholder="Anything else you want me to know." />
                  </Field>
                  {error && <p className="rounded-xl bg-[#b3261e]/10 p-4 text-sm text-[#8f1d16]">{error}</p>}
                  <button
                    onClick={() => submitRequest('domain')}
                    disabled={sending || domainChoices.some((choice) => !choice.trim())}
                    className="btn-primary w-full justify-center disabled:opacity-40"
                  >
                    {sending ? 'Sending…' : 'Send my domain request'}
                  </button>
                </div>
              ) : (
                <div className="mt-6 rounded-xl border border-mint/40 bg-mint/[0.06] p-4 text-sm">
                  Request sent. I will check the names you shared and reach out before confirming a domain. No payment is due until I confirm the name. After that, come back here to start the {domainOffer.yearly.label} subscription so I can put it live.
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* ---- edit ---- */}
        {action === 'edit' && (
          <motion.div key="edit" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.25 }} className="mt-10">
            <div className="glass rounded-3xl p-7">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-xl font-semibold">Request an edit</h2>
                <BackLink onClick={() => setAction(null)} />
              </div>

              {!submitted ? (
                <div className="mt-5 space-y-5">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {edits.map((e) => (
                      <button
                        key={e.id}
                        onClick={() => setEditType(e.id)}
                        className={`rounded-2xl border p-5 text-left transition-colors ${
                          editType === e.id ? 'border-mint bg-mint/10' : 'hairline bg-frost/[0.03] hover:border-frost/30'
                        }`}
                      >
                        <span className="flex items-baseline justify-between">
                          <span className="font-display font-semibold">{e.name}</span>
                          <span className="font-display font-bold">{e.priceLabel}</span>
                        </span>
                        <span className="mt-1.5 block text-xs leading-relaxed text-mist">{e.blurb}</span>
                      </button>
                    ))}
                  </div>
                  <Field label="What would you like changed?">
                    <textarea
                      className="field-input min-h-32"
                      value={editDetails}
                      onChange={(e) => setEditDetails(e.target.value)}
                      placeholder="Be specific: the exact text, the section, the color. For wording, list everything you want in one go, it is all one request."
                    />
                  </Field>
                  {error && <p className="rounded-xl bg-[#b3261e]/10 p-4 text-sm text-[#8f1d16]">{error}</p>}
                  <button
                    onClick={() => submitRequest('edit')}
                    disabled={sending || !editType || !editDetails.trim()}
                    className="btn-primary w-full justify-center disabled:opacity-40"
                  >
                    {sending ? 'Sending…' : `Send my ${chosenEdit ? chosenEdit.name.toLowerCase() : 'edit'} request`}
                  </button>
                </div>
              ) : (
                <div className="mt-6 space-y-4">
                  <div className="rounded-xl border border-mint/40 bg-mint/[0.06] p-4 text-sm">
                    Got your changes. Pay below and I will get to work, usually fast.
                  </div>
                  <PayBlock url={stripeLinks[chosenEdit?.stripeKey]} label={`Pay ${chosenEdit?.priceLabel} for ${chosenEdit?.name.toLowerCase()}`} />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Reveal delay={0.3} className="mt-10 text-center">
        <p className="text-sm text-mist">
          Something not covered here? Email me at{' '}
          <a href={`mailto:${site.email}`} className="text-cyan hover:underline">{site.email}</a>.
        </p>
        <Link to="/" className="mt-3 inline-block text-sm text-mist hover:text-frost">← Back home</Link>
      </Reveal>
    </main>
  )
}
