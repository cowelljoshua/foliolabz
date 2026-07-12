import DemoBar from '../../components/DemoBar.jsx'
import Aurora from '../../components/reactbits/Aurora.jsx'
import Reveal from '../../components/reactbits/Reveal.jsx'
import { DemoFeature, DemoStatStrip, DemoTopNav } from '../../components/DemoExtras.jsx'

const projects = [
  {
    title: 'Hybrid Rocket Test Stand',
    tag: 'Capstone',
    body: 'Designed and instrumented a 500 lbf thrust stand. Ran 12 hot fires with zero anomalies.',
    grad: 'linear-gradient(130deg, #7c5cff, #22d3ee)',
  },
  {
    title: 'Heat Exchanger CFD Study',
    tag: 'Research',
    body: 'Cut pressure drop 18% through shell-side baffle optimization in ANSYS Fluent.',
    grad: 'linear-gradient(130deg, #22d3ee, #4ade80)',
  },
  {
    title: '6-Axis Robotic Arm',
    tag: 'Personal',
    body: 'From CAD to inverse kinematics. 3D printed, servo driven, fully open loop no more.',
    grad: 'linear-gradient(130deg, #5b8cff, #a595ff)',
  },
]

const skills = ['SolidWorks', 'ANSYS', 'MATLAB', 'Python', 'GD&T', 'DFM', 'Instrumentation', 'LabVIEW']

export default function Midnight() {
  return (
    <div className="min-h-screen bg-[#08080f] pb-28 font-body text-frost">
      <DemoTopNav brand="Mara Chen" tone="dark" accent="#22d3ee" links={[{ href: '#work', label: 'Work' }, { href: '#about', label: 'About' }, { href: '#contact', label: 'Contact' }]} />
      {/* Hero */}
      <header id="top" className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-6 text-center">
        <Aurora />
        <div className="relative z-10">
          <Reveal>
            <p className="font-display text-sm uppercase tracking-[0.3em] text-cyan">Mechanical Engineer</p>
            <h1 className="font-display mt-4 text-6xl font-bold tracking-tight sm:text-8xl">
              Mara <span className="text-gradient">Chen</span>
            </h1>
            <p className="mx-auto mt-5 max-w-md text-mist">
              I build hardware that survives the test stand. Propulsion, thermal systems, and the data to prove it.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <a href="#work" className="btn-primary">See my work</a>
              <a href="#contact" className="btn-ghost">Resume</a>
            </div>
          </Reveal>
        </div>
      </header>

      <DemoStatStrip color="#22d3ee" border="rgba(255,255,255,0.12)" stats={[
        { value: '12', label: 'successful hot-fire tests' },
        { value: '18%', label: 'pressure-drop reduction' },
        { value: '3', label: 'systems taken from CAD to test' },
      ]} />

      <DemoFeature
        image="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1400&q=85"
        alt="Engineer working in a modern test laboratory"
        eyebrow="How I work"
        title="From first sketch to clean test data."
        body="I like the whole engineering loop: define the failure modes, build the hardware, instrument it properly, and let the data make the next decision obvious."
        bullets={['Design reviews that surface risk early', 'Test plans written before hardware arrives', 'Documentation the next engineer can actually use']}
        accent="#22d3ee"
        panel="rgba(255,255,255,0.045)"
      />

      {/* Projects */}
      <section id="work" className="mx-auto max-w-5xl px-6 py-16">
        <Reveal>
          <h2 className="font-display text-3xl font-bold">Selected work</h2>
        </Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <article className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-transform duration-300 hover:-translate-y-1">
                <div className="h-32 opacity-80 transition-opacity group-hover:opacity-100" style={{ background: p.grad }} />
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-cyan">{p.tag}</p>
                  <h3 className="font-display mt-1 text-lg font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-mist">{p.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="mx-auto max-w-5xl px-6 py-8">
        <Reveal className="flex flex-wrap gap-2">
          {skills.map((s) => (
            <span key={s} className="rounded-full border border-white/12 bg-white/[0.04] px-4 py-1.5 text-sm text-mist">
              {s}
            </span>
          ))}
        </Reveal>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-3xl px-6 py-16 text-center">
        <Reveal>
          <h2 className="font-display text-3xl font-bold">
            Build something <span className="text-gradient">that flies.</span>
          </h2>
          <p className="mt-3 text-mist">mara.chen@example.com</p>
        </Reveal>
        <p className="mt-14 text-xs text-mist/60">A FolioLabz style example, not a finished site. Mara is made up; yours is built around you.</p>
      </section>

      <DemoBar styleId="midnight" styleName="Midnight" />
    </div>
  )
}
