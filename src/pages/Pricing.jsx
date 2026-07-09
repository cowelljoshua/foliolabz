import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import Reveal from '../components/reactbits/Reveal.jsx'
import SpotlightCard from '../components/reactbits/SpotlightCard.jsx'
import StarBorder from '../components/reactbits/StarBorder.jsx'
import RushSwitch from '../components/RushSwitch.jsx'
import ResumeXray from '../components/ResumeXray.jsx'
import {
  tiers,
  carePlan,
  smartFeatures,
  rush,
  promises,
  resumeService,
  stripeLinks,
  faq,
} from '../config/site.js'

function startLink(tierId, care, rushOn) {
  return `/start?package=${tierId}${care ? '&care=1' : ''}${rushOn ? '&rush=1' : ''}`
}

function payUrl(tier, care) {
  const key = care ? tier.stripeCareKey : tier.stripeKey
  return key ? stripeLinks[key] : ''
}

/* ---------------- Tier card + expanded panel ---------------- */

function TierCard({ tier, care, onOpen }) {
  const monthly = care ? tier.careMonthly : 0
  return (
    <SpotlightCard
      className={`h-full ${tier.popular ? 'border-violet/60' : ''}`}
      spotColor={tier.popular ? 'rgba(34,211,238,0.14)' : 'rgba(124,92,255,0.14)'}
    >
      <button onClick={onOpen} className="block h-full w-full p-7 text-left">
        {tier.popular && (
          <span className="mb-3 inline-block rounded-full bg-violet/20 px-3 py-1 text-xs font-semibold text-violet-soft">
            Most popular
          </span>
        )}
        <h3 className="font-display text-xl font-semibold">{tier.name}</h3>
        <p className="font-display mt-2 text-4xl font-bold">
          {tier.priceLabel}
          {monthly > 0 && <span className="text-lg font-semibold text-mist"> + ${monthly}/mo</span>}
        </p>
        <p className="mt-2 text-sm text-mist">{tier.blurb}</p>
        <ul className="mt-5 space-y-2">
          {tier.headline.map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm text-mist">
              <span className="mt-0.5 text-mint">✓</span> {f}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm font-semibold text-gradient">See everything included →</p>
      </button>
    </SpotlightCard>
  )
}

function TierModal({ tier, care, onClose }) {
  const [rushOn, setRushOn] = useState(false)
  const pay = payUrl(tier, care)
  const showPay = pay && !tier.customQuote && !rushOn
  const monthly = care ? tier.careMonthly : 0

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/70 p-4 backdrop-blur-sm sm:items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="glass max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-3xl p-8"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-display text-2xl font-bold">{tier.name}</h3>
            <p className="font-display mt-1 text-3xl font-bold text-gradient">
              {tier.priceLabel}
              {monthly > 0 && <span className="text-lg text-mist"> + ${monthly}/mo</span>}
            </p>
          </div>
          <button onClick={onClose} className="rounded-full p-2 text-mist hover:bg-white/10 hover:text-frost" aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <ul className="mt-6 space-y-2.5">
          {tier.full.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-sm text-mist">
              <span className="mt-0.5 text-mint">✓</span> {f}
            </li>
          ))}
        </ul>

        {tier.customQuote && (
          <div className="mt-6 rounded-2xl border hairline bg-white/[0.03] p-5">
            <p className="font-display text-sm font-semibold">Smart features and what they add</p>
            <ul className="mt-3 space-y-2">
              {smartFeatures.map((s) => (
                <li key={s.id} className="flex items-baseline justify-between gap-3 text-sm">
                  <span className="text-mist">{s.label}</span>
                  <span className="shrink-0 font-semibold text-cyan">{s.range}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-mist">
              Pick yours in the form. I confirm your exact quote within 24 hours.
            </p>
          </div>
        )}

        {care && (
          <div className="mt-6 rounded-2xl border hairline bg-white/[0.03] p-5">
            <p className="font-display text-sm font-semibold">What your ${tier.careMonthly}/mo Care Plan covers</p>
            <p className="mt-2 text-sm text-mist">{carePlan.editDefinition}</p>
            <ul className="mt-3 space-y-1.5">
              {carePlan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-mist">
                  <span className="mt-0.5 text-mint">✓</span> {f}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-6">
          <RushSwitch on={rushOn} onChange={setRushOn} />
        </div>

        <div className="mt-7 flex flex-col gap-3">
          <Link to={startLink(tier.id, care, rushOn)} className="btn-primary justify-center">
            Start my build
          </Link>
          {showPay && (
            <a href={pay} target="_blank" rel="noreferrer" className="btn-ghost justify-center">
              Pay now with card
            </a>
          )}
          {(tier.customQuote || rushOn) && (
            <p className="text-center text-xs text-mist">
              {tier.customQuote
                ? 'Custom builds are paid after I confirm your quote. Form first, payment second.'
                : 'Rush orders are paid after I confirm your total. Form first, payment second.'}
            </p>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ---------------- FAQ ---------------- */

function Faq() {
  const [open, setOpen] = useState(null)
  return (
    <div className="mx-auto mt-10 max-w-2xl">
      {faq.map((item, i) => (
        <div key={item.q} className="border-b hairline">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between gap-4 py-5 text-left"
          >
            <span className="font-display font-semibold">{item.q}</span>
            <span className={`text-mist transition-transform duration-300 ${open === i ? 'rotate-45' : ''}`}>+</span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="pb-5 text-sm leading-relaxed text-mist">{item.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}

/* ---------------- Page ---------------- */

export default function Pricing() {
  const [care, setCare] = useState(true)
  const [openTier, setOpenTier] = useState(null)

  return (
    <main className="mx-auto max-w-6xl px-6 pt-32">
      <Reveal className="text-center">
        <h1 className="font-display text-4xl font-bold sm:text-5xl">
          Simple pricing. <span className="text-gradient">Zero surprises.</span>
        </h1>
      </Reveal>

      {/* Care toggle */}
      <Reveal className="mt-10 flex justify-center">
        <div className="glass flex items-center rounded-full p-1">
          <button
            onClick={() => setCare(false)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${!care ? 'bg-white/15 text-frost' : 'text-mist'}`}
          >
            One-time build
          </button>
          <button
            onClick={() => setCare(true)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${care ? 'bg-white/15 text-frost' : 'text-mist'}`}
          >
            Build + Care Plan
          </button>
        </div>
      </Reveal>
      <Reveal delay={0.1} className="mt-3 text-center">
        <p className="text-xs text-mist">
          {care ? `${carePlan.blurb} Cancel anytime, your site stays online either way.` : 'Just the build. Hosting is included free. You can add the Care Plan later.'}
        </p>
      </Reveal>

      {/* Tiers */}
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {tiers.map((t, i) => (
          <Reveal key={t.id} delay={i * 0.1}>
            <TierCard tier={t} care={care} onOpen={() => setOpenTier(t)} />
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {openTier && <TierModal tier={openTier} care={care} onClose={() => setOpenTier(null)} />}
      </AnimatePresence>

      {/* RESUME POLISH */}
      <section id="resume" className="mt-28 scroll-mt-28">
        <Reveal className="text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">{resumeService.heading}</h2>
          <p className="mt-3 text-mist">{resumeService.humanLine}</p>
        </Reveal>

        <div className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-2">
          {resumeService.tiers.map((t, i) => {
            const pay = stripeLinks[t.stripeKey]
            return (
              <Reveal key={t.id} delay={i * 0.1}>
                <SpotlightCard className="h-full p-7" spotColor="rgba(74,222,128,0.12)">
                  <h3 className="font-display text-lg font-semibold">{t.name}</h3>
                  <p className="font-display mt-1 text-3xl font-bold">{t.priceLabel}</p>
                  <p className="mt-1.5 text-sm text-mist">{t.blurb}</p>
                  <ul className="mt-4 space-y-2">
                    {t.full.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-mist">
                        <span className="mt-0.5 text-mint">✓</span> {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-col gap-2.5">
                    <Link to={`/start?track=resume&package=${t.id}`} className="btn-primary justify-center !py-2.5 text-sm">
                      {i === 0 ? 'Polish my resume' : 'Polish + meet with me'}
                    </Link>
                    {pay && (
                      <a href={pay} target="_blank" rel="noreferrer" className="btn-ghost justify-center !py-2.5 text-sm">
                        Pay now with card
                      </a>
                    )}
                  </div>
                  <p className="mt-4 text-center text-xs font-semibold text-mint">
                    {promises.resume.title}
                  </p>
                </SpotlightCard>
              </Reveal>
            )
          })}
        </div>

        {/* Resume X-ray */}
        <Reveal className="mx-auto mt-12 max-w-3xl">
          <ResumeXray />
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="mt-24">
        <Reveal className="text-center">
          <h2 className="font-display text-3xl font-bold">Questions, answered.</h2>
        </Reveal>
        <Faq />
      </section>

      {/* CTA */}
      <Reveal className="mx-auto my-20 max-w-2xl">
        <StarBorder className="rounded-3xl">
          <div className="rounded-3xl p-10 text-center">
            <h2 className="font-display text-2xl font-bold">Still deciding? Start the form.</h2>
            <p className="mt-2 text-sm text-mist">Answering a few questions usually makes the choice obvious.</p>
            <Link to="/start" className="btn-primary mt-6">Start my build</Link>
          </div>
        </StarBorder>
      </Reveal>
    </main>
  )
}
