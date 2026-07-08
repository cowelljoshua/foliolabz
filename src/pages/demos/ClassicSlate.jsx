import DemoBar from '../../components/DemoBar.jsx'
import Reveal from '../../components/reactbits/Reveal.jsx'

const slate = '#1e293b'
const gold = '#996515'
const paper = '#f4f4f6'

const experience = [
  { role: 'Investment Banking Summer Analyst', firm: 'Meridian Capital', years: '2025', note: 'M&A coverage. Built models for two closed deals totaling $340M.' },
  { role: 'Finance Club President', firm: 'University Investment Society', years: '2024 to 2026', note: 'Grew the student fund from $80k to $210k AUM.' },
  { role: 'B.S. Finance, minor in CS', firm: 'Commonwealth University', years: '2022 to 2026', note: 'GPA 3.9. Dean’s list every semester.' },
]

export default function ClassicSlate() {
  return (
    <div className="min-h-screen pb-28" style={{ background: paper, color: slate, fontFamily: 'Inter, sans-serif' }}>
      {/* Hero */}
      <header className="mx-auto max-w-3xl px-6 pt-28 text-center">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.35em]" style={{ color: gold }}>
            Finance · Class of 2026
          </p>
          <h1 className="mt-5 text-6xl tracking-tight" style={{ fontFamily: '"DM Serif Display", Georgia, serif' }}>
            James Whitfield
          </h1>
          <div className="mx-auto mt-6 h-px w-24" style={{ background: gold }} />
          <p className="mx-auto mt-6 max-w-lg leading-relaxed" style={{ color: '#5b6472' }}>
            Aspiring investment banker with a builder&rsquo;s mindset. I believe careful analysis and clear writing are a competitive advantage.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <a
              href="#experience"
              className="px-7 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: slate }}
            >
              Experience
            </a>
            <a
              href="#contact"
              className="border px-7 py-3 text-sm font-semibold transition-colors"
              style={{ borderColor: slate }}
            >
              Download resume
            </a>
          </div>
        </Reveal>
      </header>

      {/* Experience */}
      <section id="experience" className="mx-auto max-w-3xl px-6 py-20">
        <Reveal>
          <h2 className="text-center text-3xl" style={{ fontFamily: '"DM Serif Display", Georgia, serif' }}>
            Experience
          </h2>
        </Reveal>
        <div className="mt-10">
          {experience.map((e, i) => (
            <Reveal key={e.role} delay={i * 0.08}>
              <div className="border-t py-7" style={{ borderColor: '#dcdfe5' }}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold">{e.role}</h3>
                  <span className="text-sm" style={{ color: gold }}>{e.years}</span>
                </div>
                <p className="mt-0.5 text-sm font-medium" style={{ color: '#5b6472' }}>{e.firm}</p>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: '#5b6472' }}>{e.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="px-6 pb-16 text-center">
        <Reveal>
          <h2 className="text-2xl" style={{ fontFamily: '"DM Serif Display", Georgia, serif' }}>
            james.whitfield@example.com
          </h2>
          <p className="mt-2 text-sm" style={{ color: '#5b6472' }}>New York · Open to 2026 analyst roles</p>
        </Reveal>
        <p className="mt-14 text-xs" style={{ color: '#9aa1ac' }}>
          A Foliolab style demo. James is fictional, your site will not be.
        </p>
      </section>

      <DemoBar styleId="classicslate" styleName="Classic Slate" />
    </div>
  )
}
