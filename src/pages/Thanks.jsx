import { Link, useLocation } from 'react-router-dom'
import Aurora from '../components/reactbits/Aurora.jsx'
import Reveal from '../components/reactbits/Reveal.jsx'
import { site, stripeLinks, tiers, resumeService, deposit } from '../config/site.js'

export default function Thanks() {
  const { state } = useLocation()
  const track = state?.track
  const packageId = state?.packageId
  const firstName = state?.name?.split(' ')[0]

  // Work out whether we can offer instant payment.
  let payUrl = ''
  let payNote = ''
  if (track === 'resume') {
    const t = resumeService.tiers.find((x) => x.id === packageId)
    payUrl = t ? stripeLinks[t.stripeKey] : ''
    payNote = t ? `${t.name}, ${t.priceLabel}` : ''
  } else if (track === 'website') {
    const t = tiers.find((x) => x.id === packageId)
    payUrl = stripeLinks.deposit
    payNote = t ? `$${deposit.amount} deposit for ${t.name}` : `$${deposit.amount} deposit`
  }

  const steps =
    track === 'resume'
      ? [
          ['I read your resume', 'Personally. Usually the same day.'],
          ['You pay when I confirm', 'I reply to lock in the details first.'],
          ['You get it back sharper', 'With notes on every change I made.'],
        ]
      : [
          ['I read your brief'],
          [`You put down a $${deposit.amount} deposit`],
          ['Your preview link arrives'],
        ]

  return (
    <main className="relative flex min-h-[85vh] items-center justify-center overflow-hidden px-6 pt-24">
      <Aurora />
      <div className="relative z-10 mx-auto max-w-xl py-16 text-center">
        <Reveal>
          <span className="text-5xl">🎉</span>
          <h1 className="font-display mt-5 text-4xl font-bold sm:text-5xl">
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
              <p className="mt-3 text-xs text-mist">
                {track === 'website'
                  ? 'The rest is due only when your site is live. Prefer to wait on the deposit? I will email you a link too.'
                  : 'Prefer to wait? No problem, I will email you a payment link too.'}
              </p>
            </>
          ) : (
            <p className="text-sm text-mist">Questions in the meantime? {site.email}</p>
          )}
        </Reveal>

        <Reveal delay={0.6} className="mt-10">
          <Link to="/" className="text-sm text-mist hover:text-frost">← Back home</Link>
        </Reveal>
      </div>
    </main>
  )
}
