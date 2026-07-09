import DemoBar from '../../components/DemoBar.jsx'
import Reveal from '../../components/reactbits/Reveal.jsx'

const magenta = '#ff2e97'
const cyan = '#0ff0fc'
const mono = 'ui-monospace, "SFMono-Regular", "Menlo", monospace'

const projects = [
  { name: 'ledgerlite', desc: 'A zero-dependency personal finance app. 4k stars on GitHub.', stack: ['TypeScript', 'React', 'SQLite'] },
  { name: 'shipd', desc: 'CI that deploys on merge in under 40 seconds. Used by 3 startups.', stack: ['Go', 'Docker', 'AWS'] },
  { name: 'promptforge', desc: 'Open-source prompt testing harness for LLM apps.', stack: ['Python', 'FastAPI'] },
]

export default function Neon() {
  return (
    <div
      className="min-h-screen pb-28 text-[#e9e6f0]"
      style={{
        background:
          'radial-gradient(circle at 20% 10%, rgba(255,46,151,0.12), transparent 40%), radial-gradient(circle at 80% 30%, rgba(15,240,252,0.12), transparent 40%), #0b0710',
        fontFamily: mono,
      }}
    >
      {/* Grid overlay */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />

      <header className="relative mx-auto max-w-4xl px-6 pt-28">
        <Reveal>
          <p className="text-sm" style={{ color: cyan }}>
            <span style={{ color: magenta }}>$</span> whoami
          </p>
          <h1 className="mt-3 text-5xl font-bold tracking-tight sm:text-7xl" style={{ fontFamily: mono }}>
            Kai Nakamura
            <span style={{ color: magenta }}>_</span>
          </h1>
          <p className="mt-4 max-w-lg text-[#a9a4bb]">
            Software developer. I ship fast, readable code and open-source the useful parts.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm">
            <a href="#work" className="border px-5 py-2.5 font-semibold transition-colors" style={{ borderColor: magenta, color: magenta }}>
              ./projects
            </a>
            <a href="#contact" className="border px-5 py-2.5 font-semibold transition-colors" style={{ borderColor: cyan, color: cyan }}>
              ./contact
            </a>
          </div>
        </Reveal>
      </header>

      <section id="work" className="relative mx-auto max-w-4xl px-6 py-16">
        <Reveal>
          <h2 className="text-2xl font-bold">
            <span style={{ color: cyan }}>const</span> projects <span style={{ color: magenta }}>=</span> [
          </h2>
        </Reveal>
        <div className="mt-6 space-y-4">
          {projects.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1}>
              <article
                className="group border border-white/10 bg-white/[0.02] p-5 transition-colors"
                style={{ backdropFilter: 'blur(2px)' }}
              >
                <div className="flex items-baseline justify-between">
                  <h3 className="text-lg font-bold" style={{ color: magenta }}>
                    {p.name}
                  </h3>
                  <span className="text-xs text-[#6f6a82]">{'{...}'}</span>
                </div>
                <p className="mt-2 text-sm text-[#a9a4bb]">{p.desc}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span key={s} className="border border-white/12 px-2.5 py-1 text-xs" style={{ color: cyan }}>
                      {s}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mt-4 text-2xl font-bold">]</p>
        </Reveal>
      </section>

      <section id="contact" className="relative mx-auto max-w-4xl px-6 py-12">
        <Reveal>
          <p className="text-sm text-[#a9a4bb]">
            <span style={{ color: magenta }}>{'>'}</span> reach me at{' '}
            <a href="mailto:kai@example.dev" className="underline" style={{ color: cyan }}>
              kai@example.dev
            </a>
          </p>
        </Reveal>
        <p className="mt-14 text-xs text-[#5c5770]">A FolioLabz style example, not a finished site. Kai is made up; yours is built around you.</p>
      </section>

      <DemoBar styleId="neon" styleName="Neon Grid" />
    </div>
  )
}
