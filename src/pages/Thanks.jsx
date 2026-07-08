import { Link, useLocation } from 'react-router-dom'
import Aurora from '../components/reactbits/Aurora.jsx'
import Reveal from '../components/reactbits/Reveal.jsx'
import { site, stripeLinks, tiers, resumeService } from '../config/site.js'

export default function Thanks() {
  const { state } = useLocation()
  const track = state?.track
  const packageId = state?.packageId
  const care = state?.care
  const rushOn = state?.rush
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
    if (t && !t.customQuote && !rushOn) {
      payUrl = stripeLinks[care ? t.stripeCareKey : t.stripeKey]
      payNote = t ? `${t.name}, ${t.priceLabel}${care ? ` + $${t.careMonthly}/mo` : ''}` : ''
    }
  }
  const customTotal = track === 'website' && (packageId === 'signature' || rushOn)

  const steps =
    track === 'resume'
      ? [
          ['I read your resume', 'Personally. Usually the same day.'],
          ['You pay when I confirm', 'I reply to lock in the details first.'],
          ['You get it back sharper', 'With notes on every change I made.'],
        ]
      : [
          ['I read your brief', 'Personally. Usually the same day.'],
          [customTotal ? 'I confirm your exact total' : 'Payment', customTotal ? 'You get a reply within 24 hours with your quote and payment link.' : 'Pay online whenever you are ready.'],
          ['Your preview link arrives', 'Then up to 5 rounds of changes until you love it.'],
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
                  <p className="mt-0.5 text-sm text-mist">{d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.5} className="mt-9">
          {payUrl ? (
            <>
              <a href={payUrl} target="_blank" rel="noreferrer" className="btn-primary">
                Pay now: {payNote}
              </a>
              <p className="mt-3 text-xs text-mist">Prefer to wait? No problem, I will email you a payment link too.</p>
            </>
          ) : (
            <p className="text-sm text-mist">
              {customTotal
                ? 'Since your build has custom pieces, I will email your exact total and a payment link within 24 hours.'
                : `Questions in the meantime? ${site.email}`}
            </p>
          )}
        </Reveal>

        <Reveal delay={0.6} className="mt-10">
          <Link to="/" className="text-sm text-mist hover:text-frost">← Back home</Link>
        </Reveal>
      </div>
    </main>
  )
}
