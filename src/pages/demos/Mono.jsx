import DemoBar from '../../components/DemoBar.jsx'
import Reveal from '../../components/reactbits/Reveal.jsx'

const ink = '#111111'

const projects = [
  { year: '2025', name: 'Cliffside Residence', place: 'Big Sur, CA', type: 'Residential' },
  { year: '2024', name: 'Fold Museum Pavilion', place: 'Copenhagen', type: 'Cultural' },
  { year: '2024', name: 'Warehouse No. 7', place: 'Detroit, MI', type: 'Adaptive reuse' },
  { year: '2023', name: 'Glasshouse Studio', place: 'Portland, OR', type: 'Commercial' },
]

export default function Mono() {
  return (
    <div className="min-h-screen bg-white pb-28" style={{ color: ink, fontFamily: 'Inter, sans-serif' }}>
      <header className="mx-auto max-w-5xl px-6 pt-28">
        <Reveal>
          <div className="flex items-baseline justify-between border-b-2 pb-6" style={{ borderColor: ink }}>
            <h1 className="text-5xl font-semibold tracking-tight sm:text-7xl">Theo Laurent</h1>
            <span className="hidden text-sm font-medium uppercase tracking-widest sm:block">Architect</span>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-[2fr_1fr]">
            <p className="text-2xl font-light leading-snug sm:text-3xl">
              Space, light, and restraint. I design buildings that say more by showing less.
            </p>
            <div className="flex items-end justify-start sm:justify-end">
              <a href="#work" className="border-b-2 pb-1 text-sm font-semibold uppercase tracking-widest transition-opacity hover:opacity-60" style={{ borderColor: ink }}>
                Selected work
              </a>
            </div>
          </div>
        </Reveal>
      </header>

      <section id="work" className="mx-auto max-w-5xl px-6 py-16">
        {projects.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.05}>
            <article className="group grid grid-cols-[3.5rem_1fr] items-baseline gap-4 border-t py-8 sm:grid-cols-[5rem_2fr_1fr_1fr] sm:gap-8" style={{ borderColor: '#e2e2e2' }}>
              <span className="text-sm font-medium text-[#999]">{p.year}</span>
              <h2 className="text-2xl font-semibold transition-transform duration-300 group-hover:translate-x-2 sm:text-3xl">{p.name}</h2>
              <span className="col-start-2 text-sm text-[#666] sm:col-start-3">{p.place}</span>
              <span className="col-start-2 text-sm uppercase tracking-wide text-[#999] sm:col-start-4 sm:text-right">{p.type}</span>
            </article>
          </Reveal>
        ))}
        <div className="border-t" style={{ borderColor: '#e2e2e2' }} />
      </section>

      <section id="contact" className="mx-auto max-w-5xl px-6 py-12">
        <Reveal>
          <div className="flex flex-col gap-4 border-t-2 pt-8 sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: ink }}>
            <p className="text-3xl font-semibold tracking-tight">I design quiet spaces.</p>
            <a href="mailto:theo@example.com" className="text-lg font-medium underline underline-offset-4">
              theo@example.com
            </a>
          </div>
        </Reveal>
        <p className="mt-14 text-xs text-[#aaa]">A FolioLabz style example, not a finished site. Theo is made up; yours is built around you.</p>
      </section>

      <DemoBar styleId="mono" styleName="Mono" />
    </div>
  )
}
