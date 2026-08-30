import { Link, useLocation } from 'react-router-dom'
import Reveal from '../components/reactbits/Reveal.jsx'
import StripeNote from '../components/StripeNote.jsx'
import { site, stripeLinks, tier, resumeService, deposit } from '../config/site.js'

export default function Thanks() {
  const { state } = useLocation()
  const track = state?.track
  const packageId = state?.packageId
  const addResume = state?.addResume
  const firstName = state?.name?.split(' ')[0]

  // Work out whether we can offer instant payment.
  let payUrl = ''
  let payNote = ''
  if (track === 'resume') {
    const t = resumeService.tiers.find((x) => x.id === packageId)
    payUrl = t ? stripeLinks[t.stripeKey] : ''
    payNote = t ? `${t.name}, ${t.priceLabel}` : ''
  } else if (track === 'website') {
    payUrl = stripeLinks.deposit
    payNote = `$${deposit.amount} deposit for ${tier.name}`
  }

  const steps =
    track === 'resume'
      ? [
          ['I read your resume', 'Personally. Usually the same day.'],
          ['You pay when I confirm', 'I reply to lock in the details first.'],
          ['You get it back sharper', 'With notes on every change I made.'],
        ]
      : [
          [`You put down a $${deposit.amount} deposit`],
          ['I read your brief'],
          ['I build your site'],
          ['Your preview link arrives'],
        ]

  return (
    <main className="relative flex min-h-[85vh] items-center justify-center overflow-hidden px-6 pt-24">
      <div className="relative z-10 mx-auto max-w-xl py-16 text-center">
        <Reveal>
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-mint/12 text-mint">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
              <path d="M8.5 12.5l2.4 2.4L15.5 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <h1 className="font-head mt-5 text-4xl sm:text-5xl">
            Got it{firstName ? `, ${firstName}` : ''}.
          </h1>
          <p className="mt-4 text-mist">
            Your brief just landed in my inbox. Here is what happens next:
          </p>
        </Reveal>

        <div className="mt-9 space-y-3 text-left">
          {steps.map(([t, d], i) => (
            <Reveal key={t} delay={0.15 + i * 0.1}>
              <div className="glass flex items-start gap-4 rounded-2xl p-5">
                <span className="font-display text-lg font-bold text-gradient">{i + 1}</span>
                <div>
                  <p className="font-display font-semibold">{t}</p>
                  {d && <p className="mt-0.5 text-sm text-mist">{d}</p>}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.5} className="mt-9">
          {payUrl ? (
            <>
              <a href={payUrl} target="_blank" rel="noreferrer" className="btn-primary">
                {track === 'website' ? `Pay ${payNote}` : `Pay now: ${payNote}`}
              </a>
              {track !== 'website' && (
                <p className="mt-3 text-xs text-mist">Prefer to wait? No problem, I will email you a payment link too.</p>
              )}
              {addResume && (
                <p className="mt-3 text-xs text-mist">
                  You also added {resumeService.tiers[0].name} ({resumeService.tiers[0].priceLabel}). That is billed separately and I will email you the link.
                </p>
              )}
              <StripeNote center className="mt-3" />
            </>
          ) : (
            <p className="text-sm text-mist">Questions in the meantime? {site.email}</p>
          )}
        </Reveal>

        {track === 'website' && (
          <Reveal delay={0.55} className="mt-8">
            <div className="glass rounded-2xl p-5 text-left">
              <p className="font-display font-semibold">Your client portal is open</p>
              <p className="mt-1 text-sm leading-relaxed text-mist">
                The email you just used now works in the portal. Sign in there any time to check your build status, pay,
                and request changes. No password needed.
              </p>
              <Link to="/portal" className="mt-3 inline-block text-sm font-semibold text-violet hover:text-frost">
                Open the client portal &rarr;
              </Link>
            </div>
          </Reveal>
        )}

        <Reveal delay={0.6} className="mt-10">
          <Link to="/" className="text-sm text-mist hover:text-frost">← Back home</Link>
        </Reveal>
      </div>
    </main>
  )
}
