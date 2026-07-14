import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import Reveal from '../components/reactbits/Reveal.jsx'
import SpotlightCard from '../components/reactbits/SpotlightCard.jsx'
import StarBorder from '../components/reactbits/StarBorder.jsx'
import RushSwitch from '../components/RushSwitch.jsx'
import ResumeXray from '../components/ResumeXray.jsx'
import {
  tiers,
  deposit,
  hosting,
  rush,
  promises,
  resumeService,
  faq,
} from '../config/site.js'

function startLink(tierId, rushOn) {
  return `/start?package=${tierId}${rushOn ? '&rush=1' : ''}`
}

/* ---------------- Tier card + expanded panel ---------------- */

function TierCard({ tier, onOpen }) {
  return (
    <SpotlightCard
      className={`h-full ${tier.popular ? 'border-violet/60' : ''}`}
      spotColor={tier.popular ? 'rgba(34,211,238,0.14)' : 'rgba(124,92,255,0.14)'}
    >
      <button onClick={onOpen} className="block h-full w-full p-7 text-left">
        {tier.popular && (
          <span className="mb-3 inline-block rounded-full bg-violet/15 px-3 py-1 text-xs font-semibold text-violet-soft">
            Best value
          </span>
        )}
        <h3 className="font-display text-xl font-semibold">{tier.name}</h3>
        <p className="font-display mt-2 text-4xl font-bold">{tier.priceLabel}</p>
        <p className="mt-1 text-xs font-semibold text-cyan">${deposit.amount} deposit to start</p>
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

function TierModal({ tier, onClose }) {
  const [rushOn, setRushOn] = useState(false)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

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
            <p className="font-display mt-1 text-3xl font-bold text-gradient">{tier.priceLabel}</p>
            <p className="mt-1 text-xs font-semibold text-cyan">${deposit.amount} deposit to start</p>
          </div>
          <button onClick={onClose} className="rounded-full p-2 text-mist hover:bg-frost/10 hover:text-frost" aria-label="Close">
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

        <div className="mt-6 rounded-2xl border border-cyan/30 bg-cyan/[0.05] p-5">
          <p className="font-display text-sm font-semibold text-frost">How payment works</p>
          <p className="mt-2 text-sm leading-relaxed text-mist">{deposit.detail}</p>
        </div>

        <div className="mt-6">
          <RushSwitch on={rushOn} onChange={setRushOn} />
        </div>

        <div className="mt-7 flex flex-col gap-3">
          <Link to={startLink(tier.id, rushOn)} className="btn-primary justify-center">
            Start my build
          </Link>
          <p className="text-center text-xs text-mist">
            The rest of your {tier.priceLabel} is due only when your site is live{rushOn ? ', rush add-on included in that balance' : ''}.
          </p>
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
  const [openTier, setOpenTier] = useState(null)

  return (
    <main className="mx-auto max-w-6xl px-6 pt-32">
      <Reveal className="text-center">
        <h1 className="font-head text-4xl sm:text-5xl">
          Simple pricing. <span className="text-gradient italic">Zero surprises.</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-mist">
          Start with a ${deposit.amount} deposit. You pay the rest only once your site is live and you love it.
        </p>
      </Reveal>

      {/* Tiers */}
      <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-2">
        {tiers.map((t, i) => (
          <Reveal key={t.id} delay={i * 0.1}>
            <TierCard tier={t} onOpen={() => setOpenTier(t)} />
          </Reveal>
        ))}
      </div>

      {/* How payment + web address work */}
      <div className="mx-auto mt-8 grid max-w-3xl gap-6 sm:grid-cols-2">
        <Reveal>
          <SpotlightCard className="h-full p-7" spotColor="rgba(34,211,238,0.14)">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan/15 text-cyan">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
                <path d="M3 10h18" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </span>
            <h3 className="font-display mt-4 text-lg font-semibold">{deposit.label}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-mist">{deposit.detail}</p>
          </SpotlightCard>
        </Reveal>
        <Reveal delay={0.1}>
          <SpotlightCard className="h-full p-7" spotColor="rgba(124,92,255,0.14)">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet/15 text-violet">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
                <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </span>
            <h3 className="font-display mt-4 text-lg font-semibold">Your web address, sorted</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-mist">
              Go live free on a clean address like <span className="text-frost">{hosting.free.example}</span>. Want your own .com or .net?
              It runs {hosting.custom.monthly} or {hosting.custom.yearly} and I set it up and bill it through your account, so you never touch a domain company.
            </p>
          </SpotlightCard>
        </Reveal>
      </div>

      <Reveal delay={0.2} className="mt-10">
        <div className="star-border mx-auto max-w-3xl rounded-3xl">
          <div className="flex flex-col items-center gap-4 rounded-3xl p-7 text-center sm:flex-row sm:gap-6 sm:p-8 sm:text-left">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-violet/15 text-violet">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
                <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <div>
              <p className="font-display text-xl font-bold">{promises.website.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-mist">{promises.website.detail}</p>
            </div>
          </div>
        </div>
      </Reveal>

      <AnimatePresence>
        {openTier && <TierModal tier={openTier} onClose={() => setOpenTier(null)} />}
      </AnimatePresence>

      {/* RESUME POLISH */}
      <section id="resume" className="mt-28 scroll-mt-28">
        <Reveal className="text-center">
          <h2 className="font-head text-3xl sm:text-4xl">{resumeService.heading}</h2>
          <p className="mt-3 text-mist">{resumeService.humanLine}</p>
        </Reveal>

        <div className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-2">
          {resumeService.tiers.map((t, i) => (
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
                </div>
                <p className="mt-4 text-center text-xs font-semibold text-mint">
                  {promises.resume.title}
                </p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        {/* Resume X-ray */}
        <Reveal className="mx-auto mt-12 max-w-3xl">
          <ResumeXray />
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="mt-24">
        <Reveal className="text-center">
          <h2 className="font-head text-3xl">Questions, answered.</h2>
        </Reveal>
        <Faq />
      </section>

      {/* CTA */}
      <Reveal className="mx-auto my-20 max-w-2xl">
        <StarBorder className="rounded-2xl">
          <div className="rounded-2xl p-10 text-center">
            <h2 className="font-head text-2xl">Still deciding? Start the form.</h2>
            <p className="mt-2 text-sm text-mist">Answering a few questions usually makes the choice obvious.</p>
            <Link to="/start" className="btn-primary mt-6">Start my build</Link>
          </div>
        </StarBorder>
      </Reveal>
    </main>
  )
}
