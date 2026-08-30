import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import Reveal from '../components/reactbits/Reveal.jsx'
import SpotlightCard from '../components/reactbits/SpotlightCard.jsx'
import StripeNote from '../components/StripeNote.jsx'
import {
  tier,
  sale,
  deposit,
  promises,
  resumeService,
  realSites,
  faq,
} from '../config/site.js'

const startLink = `/start?package=${tier.id}`

// Show a real client site as the example, not a fictional demo.
const exampleSite = realSites.find((s) => s.live && s.url) || realSites[0]

/* ---------------- Package cards ---------------- */

function TierCard() {
  return (
    <SpotlightCard className="flex h-full flex-col border-violet/60" spotColor="rgba(34,211,238,0.14)">
      <div className="p-7 pb-5 text-left">
        <span className="mb-3 inline-block rounded-full bg-violet/15 px-3 py-1 text-xs font-semibold text-violet-soft">Save $150</span>
        <h3 className="font-display text-xl font-semibold">{tier.name}</h3>
        <div className="mt-2 flex items-baseline gap-2"><span className="font-display text-lg font-semibold text-mist line-through">{tier.originalPriceLabel}</span><span className="font-display text-4xl font-bold">{tier.priceLabel}</span><span className="text-sm text-mist">all in</span></div>
        <p className="mt-1 text-xs font-semibold text-cyan">${tier.price} total &middot; ${deposit.amount} today &middot; ${tier.price - deposit.amount} after approval</p>
        <p className="mt-2 text-sm text-mist">{tier.blurb}</p>
        <ul className="mt-5 space-y-2">{tier.headline.map((f) => <li key={f} className="flex items-start gap-2 text-sm text-mist"><span className="mt-0.5 text-mint">✓</span>{f}</li>)}</ul>
      </div>
      <div className="mt-auto flex flex-col gap-3 px-7 pb-7">
        <Link to={startLink} className="btn-primary justify-center">Start my build</Link>
        <a href={exampleSite.url} target="_blank" rel="noreferrer" className="btn-ghost justify-center">See a real site I built ↗</a>
      </div>
    </SpotlightCard>
  )
}
function ResumeCard() {
  const t = resumeService.tiers[0]
  return (
    <SpotlightCard className="flex h-full flex-col" spotColor="rgba(74,222,128,0.12)">
      <div className="p-7 pb-5 text-left">
        <span className="mb-3 inline-block rounded-full bg-mint/15 px-3 py-1 text-xs font-semibold text-mint">Save ${t.originalPrice - t.price}</span>
        <h3 className="font-display text-xl font-semibold">{t.name}</h3>
        <div className="mt-2 flex items-baseline gap-2"><span className="font-display text-lg font-semibold text-mist line-through">{t.originalPriceLabel}</span><span className="font-display text-4xl font-bold">{t.priceLabel}</span><span className="text-sm text-mist">one time</span></div>
        <p className="mt-1 text-xs font-semibold text-mint">{promises.resume.title}</p>
        <p className="mt-2 text-sm text-mist">{t.blurb}</p>
        <ul className="mt-5 space-y-2">{t.full.map((f) => <li key={f} className="flex items-start gap-2 text-sm text-mist"><span className="mt-0.5 text-mint">✓</span>{f}</li>)}</ul>
      </div>
      <div className="mt-auto flex flex-col gap-3 px-7 pb-7">
        <Link to={`/start?track=resume&package=${t.id}`} className="btn-primary justify-center">Polish my resume</Link>
      </div>
    </SpotlightCard>
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
  return (
    <main className="mx-auto max-w-6xl px-6 pt-32">
      <Reveal className="text-center">
        <h1 className="font-head text-4xl sm:text-5xl">
          One price. <span className="text-gradient italic">Zero surprises.</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-mist">
          Want a website like this? Email <a className="font-semibold text-violet underline underline-offset-4" href="mailto:foliolabz@gmail.com">foliolabz@gmail.com</a> for a quote.
        </p>
      </Reveal>

      <Reveal delay={0.08} className="mx-auto mt-7 max-w-3xl">
        <div className="rounded-2xl border border-violet/30 bg-violet/10 px-5 py-3 text-center text-sm font-semibold text-frost">
          <span className="mr-2 inline-flex rounded-full bg-violet px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-white">Sale</span>
          Portfolio <span className="text-mist line-through">{tier.originalPriceLabel}</span> <span className="text-violet">{tier.priceLabel}</span> &middot; Resume <span className="text-mist line-through">{resumeService.tiers[0].originalPriceLabel}</span> <span className="text-violet">{resumeService.tiers[0].priceLabel}</span>
          <span className="mt-1 block text-xs font-medium text-mist">Sale prices {sale.endsLabel}</span>
        </div>
      </Reveal>
      {/* The two things you can buy, side by side */}
      <div id="resume" className="mx-auto mt-12 grid max-w-4xl scroll-mt-28 gap-6 md:grid-cols-2">
        <Reveal>
          <TierCard />
        </Reveal>
        <Reveal delay={0.1}>
          <ResumeCard />
        </Reveal>
      </div>

      <Reveal delay={0.12} className="mt-6">
        <StripeNote center />
      </Reveal>

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

      {/* FAQ */}
      <section className="mt-24 pb-24">
        <Reveal className="text-center">
          <h2 className="font-head text-3xl">FAQs</h2>
        </Reveal>
        <Faq />
      </section>
    </main>
  )
}
