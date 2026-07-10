import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import Reveal from '../components/reactbits/Reveal.jsx'
import SpotlightCard from '../components/reactbits/SpotlightCard.jsx'
import { site, portal, balances, domainOffer, edits, stripeLinks } from '../config/site.js'
import { findClient, balanceFor } from '../config/clients.js'

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

// Monthly / yearly toggle for the domain subscription.
function BillingToggle({ billing, onChange }) {
  return (
    <div className="mx-auto flex w-fit items-center rounded-full border hairline p-1">
      {['monthly', 'yearly'].map((b) => (
        <button
          key={b}
          type="button"
          onClick={() => onChange(b)}
          className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
            billing === b ? 'bg-white/15 text-frost' : 'text-mist'
          }`}
        >
          <span className="capitalize">{b}</span> · {domainOffer[b].label}
        </button>
      ))}
    </div>
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

/* ---------- the page ---------- */

export default function Portal() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [entered, setEntered] = useState(false)

  const [action, setAction] = useState(null) // 'balance' | 'domain' | 'edit'
  const [balancePkg, setBalancePkg] = useState('')
  const [domainWanted, setDomainWanted] = useState('')
  const [domainNotes, setDomainNotes] = useState('')
  const [domainBilling, setDomainBilling] = useState('monthly')
  const [editType, setEditType] = useState('')
  const [editDetails, setEditDetails] = useState('')

  const [sending, setSending] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const emailOk = /.+@.+\..+/.test(email)
  const chosenEdit = edits.find((e) => e.id === editType)

  // Known client? Their profile drives what the dashboard shows.
  const client = findClient(email)
  const owed = balanceFor(client)
  const clientBalanceInfo = client ? balances.find((b) => b.pkg === client.package) : null
  // Standard links assume no rush; a rush balance needs the personal payLink.
  const clientPayUrl = client ? (client.payLink || (!client.rush && clientBalanceInfo ? stripeLinks[clientBalanceInfo.stripeKey] : '')) : ''
  const chosenBalance = balances.find((b) => b.pkg === balancePkg)

  const openAction = (a) => {
    setAction(a)
    setSubmitted(false)
    setError('')
  }

  const buildSummary = (type) => {
    const L = [`FOLIOLAB CLIENT REQUEST`, `=======================`, `Name: ${name}`, `Email: ${email}`, '']
    if (type === 'domain') {
      L.push('Request: Set up a custom domain')
      L.push(`Domain wanted: ${domainWanted || 'not specified'}`)
      if (domainNotes) L.push(`Notes: ${domainNotes}`)
      L.push(`Billing: ${domainOffer[domainBilling].label}`)
    } else if (type === 'edit') {
      L.push(`Request: ${chosenEdit?.name} (${chosenEdit?.priceLabel})`)
      L.push('')
      L.push('CHANGES:')
      L.push(editDetails || 'none provided')
    }
    return L.join('\n')
  }

  const submitRequest = async (type) => {
    setSending(true)
    setError('')
    const fd = new FormData()
    fd.append('form-name', 'client-request')
    fd.append('name', name)
    fd.append('email', email)
    fd.append('request_type', type)
    fd.append('domain', type === 'domain' ? domainWanted : '')
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

  /* ---------- gate ---------- */

  if (!entered) {
    return (
      <main className="mx-auto flex min-h-[80vh] max-w-lg flex-col justify-center px-6 pt-28 pb-16">
        <Reveal className="text-center">
          <h1 className="font-display text-4xl font-bold sm:text-5xl">{portal.heading}</h1>
          <p className="mt-3 text-mist">{portal.sub}</p>
        </Reveal>
        <Reveal delay={0.1} className="mt-9">
          <div className="glass rounded-3xl p-7">
            <h2 className="font-display text-lg font-semibold">{portal.gateTitle}</h2>
            <div className="mt-5 space-y-5">
              <Field label="Email you signed up with">
                <input className="field-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" />
              </Field>
              {/* Known clients skip the name; I already have it on file. */}
              {emailOk && !client && (
                <Field label="Your name">
                  <input className="field-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jordan Smith" />
                </Field>
              )}
              {client && (
                <p className="rounded-xl border border-mint/40 bg-mint/[0.06] p-3.5 text-sm">
                  Found you, <span className="font-semibold text-frost">{client.name.split(' ')[0]}</span>. Your project is loaded.
                </p>
              )}
              <button
                onClick={() => {
                  if (!emailOk) return
                  if (client) {
                    setName(client.name)
                    setEntered(true)
                  } else if (name.trim()) {
                    setEntered(true)
                  }
                }}
                disabled={!emailOk || (!client && !name.trim())}
                className="btn-primary w-full justify-center disabled:opacity-40"
              >
                Continue →
              </button>
              <p className="text-xs text-mist/70">{portal.gateNote}</p>
            </div>
          </div>
        </Reveal>
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
            <h1 className="font-display text-3xl font-bold sm:text-4xl">Welcome back, {firstName}.</h1>
            <p className="mt-1.5 text-sm text-mist">Signed in as {email}</p>
          </div>
          <button
            onClick={() => {
              setEntered(false)
              setName('')
              setEmail('')
              setAction(null)
            }}
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
              <span className={`rounded-full px-3.5 py-1.5 text-xs font-semibold ${client.domainActive ? 'bg-mint/15 text-mint' : 'bg-white/10 text-mist'}`}>
                {client.domain}{client.domainActive ? ' · active ✓' : ' · pending'}
              </span>
            )}
          </div>
        )}
      </Reveal>

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
                <span className="text-2xl">💳</span>
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
                <span className="text-2xl">🌐</span>
                <h2 className="font-display mt-3 text-lg font-semibold">Set up a domain</h2>
                <p className="mt-1 text-sm text-mist">
                  {client?.domainActive
                    ? `${client.domain} is live and billing.`
                    : client?.domain
                      ? `${client.domain} is ready to start.`
                      : `Get your own .com for ${domainOffer.monthly.label}.`}
                </p>
              </SpotlightCard>
            </button>
            <button onClick={() => openAction('edit')} className="text-left">
              <SpotlightCard className="h-full p-6" spotColor="rgba(74,222,128,0.14)">
                <span className="text-2xl">✏️</span>
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
                    <span className="text-2xl">🎉</span>
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
                          balancePkg === b.pkg ? 'border-cyan bg-cyan/10' : 'hairline bg-white/[0.03] hover:border-white/25'
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
                  <span className="text-2xl">🌐</span>
                  <p className="font-display mt-2 font-semibold">{client.domain} is live.</p>
                  <p className="mt-1 text-sm text-mist">Nothing to do here.</p>
                </div>
              ) : client?.domain ? (
                /* I already know the domain they want; just start billing. */
                <div className="mt-5 space-y-4">
                  <div className="rounded-2xl border border-cyan/30 bg-cyan/[0.05] p-6 text-center">
                    <p className="text-sm text-mist">Your domain is picked out</p>
                    <p className="font-display mt-1 text-2xl font-bold">{client.domain}</p>
                    <p className="mt-1 text-xs text-mist">Pick a billing cadence and start the subscription.</p>
                  </div>
                  <BillingToggle billing={domainBilling} onChange={setDomainBilling} />
                  <PayBlock
                    url={stripeLinks[domainOffer[domainBilling].stripeKey]}
                    label={`Start ${client.domain}, ${domainOffer[domainBilling].label}`}
                  />
                </div>
              ) : !submitted ? (
                <div className="mt-5 space-y-5">
                  <Field label="What domain do you want?">
                    <input className="field-input" value={domainWanted} onChange={(e) => setDomainWanted(e.target.value)} placeholder="yourname.com" />
                  </Field>
                  <Field label="Anything I should know?" optional>
                    <textarea className="field-input min-h-20" value={domainNotes} onChange={(e) => setDomainNotes(e.target.value)} placeholder="A backup name in case it is taken, etc." />
                  </Field>
                  <div>
                    <p className="mb-2 text-sm font-medium">How do you want it billed?</p>
                    <BillingToggle billing={domainBilling} onChange={setDomainBilling} />
                  </div>
                  {error && <p className="rounded-xl bg-[#ff6b6b]/10 p-4 text-sm text-[#ff9b9b]">{error}</p>}
                  <button
                    onClick={() => submitRequest('domain')}
                    disabled={sending || !domainWanted.trim()}
                    className="btn-primary w-full justify-center disabled:opacity-40"
                  >
                    {sending ? 'Sending…' : 'Send my domain request'}
                  </button>
                </div>
              ) : (
                <div className="mt-6 space-y-4">
                  <div className="rounded-xl border border-mint/40 bg-mint/[0.06] p-4 text-sm">
                    Request sent. I will grab <span className="text-frost">{domainWanted}</span> (or your backup) and connect it. Start the {domainOffer[domainBilling].label} subscription below.
                  </div>
                  <PayBlock
                    url={stripeLinks[domainOffer[domainBilling].stripeKey]}
                    label={`Start domain, ${domainOffer[domainBilling].label}`}
                  />
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
                          editType === e.id ? 'border-mint bg-mint/10' : 'hairline bg-white/[0.03] hover:border-white/25'
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
                  {error && <p className="rounded-xl bg-[#ff6b6b]/10 p-4 text-sm text-[#ff9b9b]">{error}</p>}
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
