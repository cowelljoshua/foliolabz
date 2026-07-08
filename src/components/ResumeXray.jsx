import { useState } from 'react'
import { motion } from 'motion/react'
import { resumeService } from '../config/site.js'

// Before/after resume demo. The bullets are a generic EXAMPLE (clearly labeled);
// the real payoff is the button that opens Josh's actual resume.
export default function ResumeXray() {
  const [after, setAfter] = useState(true)
  const { xray, resumePdf } = resumeService

  return (
    <div className="glass rounded-3xl p-6 sm:p-9">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="font-display text-xl font-semibold">See the difference a polish makes</h3>
          <p className="mt-1 text-sm text-mist">Same experience, rewritten. Drag the toggle.</p>
        </div>
        <div className="flex items-center rounded-full border hairline p-1">
          {['Before', 'After'].map((label, i) => {
            const active = after === (i === 1)
            return (
              <button
                key={label}
                onClick={() => setAfter(i === 1)}
                className={`rounded-full px-5 py-1.5 text-sm font-semibold transition-colors ${
                  active ? (i === 1 ? 'bg-mint/20 text-mint' : 'bg-white/15 text-frost') : 'text-mist'
                }`}
              >
                {label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Side-by-side comparison (stacks on mobile) */}
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {/* BEFORE column */}
        <div
          className={`rounded-2xl border p-5 transition-all duration-300 ${
            after ? 'hairline bg-white/[0.02] opacity-45 lg:opacity-60' : 'border-white/25 bg-white/[0.04]'
          } ${after ? 'hidden lg:block' : 'block'}`}
        >
          <div className="mb-3 flex items-center gap-2">
            <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-mist">Before</span>
            <span className="text-xs text-mist">Example resume</span>
          </div>
          <ul className="space-y-2.5">
            {xray.before.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-sm leading-relaxed text-mist">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white/30" />
                {b}
              </li>
            ))}
          </ul>
        </div>

        {/* AFTER column */}
        <div
          className={`rounded-2xl border p-5 transition-all duration-300 ${
            after ? 'border-mint/50 bg-mint/[0.05]' : 'hairline bg-white/[0.02] opacity-45 lg:opacity-60'
          } ${!after ? 'hidden lg:block' : 'block'}`}
        >
          <div className="mb-3 flex items-center gap-2">
            <span className="rounded-full bg-mint/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-mint">After my polish</span>
            <span className="text-xs text-mist">Example resume</span>
          </div>
          <ul className="space-y-2.5">
            {xray.after.map((b, i) => (
              <li key={b} className="flex items-start gap-2.5 text-sm leading-relaxed text-frost">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-mint/20 text-[10px] font-bold text-mint">
                  {i + 1}
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* What changed */}
      <motion.div
        key={after ? 'after' : 'before'}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-4 flex flex-wrap gap-2"
      >
        {after
          ? xray.lessons.map((l, i) => (
              <span key={l} className="inline-flex items-center gap-1.5 rounded-full bg-mint/10 px-3 py-1.5 text-xs font-medium text-mint">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-mint/20 text-[10px] font-bold">{i + 1}</span>
                {l}
              </span>
            ))
          : <span className="text-xs text-mist">Flip to "After" to see exactly what I would change.</span>}
      </motion.div>

      {/* The real CTA: Josh's actual resume */}
      <div className="mt-7 flex flex-col items-center justify-between gap-4 rounded-2xl border border-violet/40 bg-violet/[0.06] p-5 text-center sm:flex-row sm:text-left">
        <div>
          <p className="font-display font-semibold">Want proof I practice what I preach?</p>
          <p className="mt-0.5 text-sm text-mist">Take a look at my own resume, the one I built with these exact rules.</p>
        </div>
        <a href={resumePdf} target="_blank" rel="noreferrer" className="btn-primary shrink-0 !py-2.5 text-sm">
          View my resume ↗
        </a>
      </div>
    </div>
  )
}
