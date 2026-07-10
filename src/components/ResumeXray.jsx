import { resumeService } from '../config/site.js'
import { asset } from '../lib/asset.js'

// Full before/after resume comparison. Both are the SAME person and the SAME
// facts, just rewritten, so it reads as an honest edit rather than a highlight reel.

function ResumeDoc({ data, variant }) {
  const isAfter = variant === 'after'
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-[#faf9f6] text-[#1a1a1a] shadow-lg ring-1 ring-black/5">
      {/* paper header */}
      <div className={`px-5 pt-5 pb-4 ${isAfter ? 'border-b-2 border-[#1f7a5c]' : 'border-b border-[#d9d6ce]'}`}>
        <p className="font-display text-lg font-bold leading-tight">{data.name}</p>
        <p className={`mt-0.5 text-[13px] font-semibold ${isAfter ? 'text-[#1f7a5c]' : 'text-[#555]'}`}>{data.title}</p>
        <p className="mt-1 text-[10px] leading-snug text-[#666]">{data.contact}</p>
      </div>

      <div className="flex-1 space-y-4 px-5 py-4">
        {/* summary */}
        <div>
          <p className="text-[9px] font-bold uppercase tracking-widest text-[#999]">Summary</p>
          <p className="mt-1 text-[11px] leading-relaxed text-[#333]">{data.summary}</p>
        </div>

        {/* experience */}
        <div>
          <p className="text-[9px] font-bold uppercase tracking-widest text-[#999]">Experience</p>
          <div className="mt-1.5 space-y-3">
            {data.experience.map((job) => (
              <div key={job.role}>
                <div className="flex items-baseline justify-between gap-2">
                  <p className="text-[11.5px] font-bold text-[#1a1a1a]">{job.role}</p>
                  <p className="shrink-0 text-[9.5px] text-[#888]">{job.date}</p>
                </div>
                <p className="text-[10.5px] italic text-[#666]">{job.org}</p>
                <ul className="mt-1 space-y-1">
                  {job.bullets.map((b) => (
                    <li key={b} className="flex gap-1.5 text-[10.5px] leading-relaxed text-[#333]">
                      <span className={`mt-[3px] h-1 w-1 shrink-0 rounded-full ${isAfter ? 'bg-[#1f7a5c]' : 'bg-[#bbb]'}`} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* skills */}
        <div>
          <p className="text-[9px] font-bold uppercase tracking-widest text-[#999]">Skills</p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {data.skills.map((s) => (
              <span
                key={s}
                className={`rounded px-2 py-0.5 text-[10px] font-medium ${
                  isAfter ? 'bg-[#1f7a5c]/12 text-[#1f7a5c]' : 'bg-black/[0.05] text-[#666]'
                }`}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ResumeXray() {
  const { compare, resumePdf } = resumeService

  return (
    <div className="glass rounded-3xl p-6 sm:p-9">
      <div className="text-center sm:text-left">
        <h3 className="font-display text-xl font-semibold sm:text-2xl">The same resume, before and after</h3>
        <p className="mt-1.5 text-sm text-mist">
          Same person, same experience. Just rewritten so recruiters actually stop and read it.
        </p>
      </div>

      {/* Two full resumes, side by side (stack on mobile) */}
      <div className="mt-6 grid items-stretch gap-5 lg:grid-cols-2">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-mist">Before</span>
            <span className="text-xs text-mist">What most people send</span>
          </div>
          <ResumeDoc data={compare.before} variant="before" />
        </div>
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-full bg-mint/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-mint">After my polish</span>
            <span className="text-xs text-mist">Same facts, sharper</span>
          </div>
          <ResumeDoc data={compare.after} variant="after" />
        </div>
      </div>

      {/* What changed */}
      <div className="mt-5 flex flex-wrap gap-2">
        {compare.lessons.map((l, i) => (
          <span key={l} className="inline-flex items-center gap-1.5 rounded-full bg-mint/10 px-3 py-1.5 text-xs font-medium text-mint">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-mint/20 text-[10px] font-bold">{i + 1}</span>
            {l}
          </span>
        ))}
      </div>

      {/* The real CTA: Josh's actual resume */}
      <div className="mt-7 flex flex-col items-center justify-between gap-4 rounded-2xl border border-violet/40 bg-violet/[0.06] p-5 text-center sm:flex-row sm:text-left">
        <p className="font-display font-semibold">Want proof I practice what I preach?</p>
        <a href={asset(resumePdf)} target="_blank" rel="noreferrer" className="btn-primary shrink-0 !py-2.5 text-sm">
          View my resume ↗
        </a>
      </div>
    </div>
  )
}
