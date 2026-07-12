import DemoBar from '../../components/DemoBar.jsx'
import Reveal from '../../components/reactbits/Reveal.jsx'
import { DemoFeature, DemoStatStrip, DemoTopNav } from '../../components/DemoExtras.jsx'

const sky = '#eef6f8'
const ocean = '#2a7f9e'
const sand = '#f2b134'
const ink = '#274652'

const highlights = [
  { icon: '01', title: '8 years in the classroom', body: 'Fourth and fifth grade, with a knack for the kids everyone else gave up on.' },
  { icon: '02', title: 'Teacher of the Year, 2024', body: 'District-wide, nominated by parents and colleagues.' },
  { icon: '03', title: 'Founder, Tide Pool Club', body: 'A hands-on science program now running in six schools.' },
]
export default function Coastal() {
  return (
    <div className="min-h-screen pb-28" style={{ background: sky, color: ink, fontFamily: 'Inter, sans-serif' }}>
      <DemoTopNav brand="Hannah Reed" tone="light" accent={ocean} links={[{ href: '#about', label: 'About' }, { href: '#work', label: 'Classroom' }, { href: '#contact', label: 'Contact' }]} />
      {/* Wave hero */}
      <header id="top" className="relative overflow-hidden px-6 pt-24 pb-10 text-center">
        <Reveal>
          <div
            className="mx-auto flex h-24 w-24 items-center justify-center rounded-full text-4xl shadow-lg"
            style={{ background: 'white' }}
          >
            HR
          </div>
          <p className="mt-6 text-sm font-bold uppercase tracking-[0.25em]" style={{ color: ocean }}>
            Elementary Teacher
          </p>
          <h1 className="mt-3 text-5xl font-extrabold tracking-tight sm:text-6xl">Hannah Reed</h1>
          <p className="mx-auto mt-4 max-w-md text-lg" style={{ color: '#4f6b76' }}>
            I make learning feel like low tide: full of things worth discovering.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <a
              href="#about"
              className="rounded-full px-6 py-3 font-bold text-white transition-transform hover:-translate-y-0.5"
              style={{ background: ocean }}
            >
              About me
            </a>
            <a
              href="#contact"
              className="rounded-full px-6 py-3 font-bold transition-transform hover:-translate-y-0.5"
              style={{ background: sand, color: ink }}
            >
              Get in touch
            </a>
          </div>
        </Reveal>
        <svg className="absolute inset-x-0 bottom-0 h-16 w-full" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 40 C 360 90 1080 -10 1440 40 L1440 80 L0 80 Z" fill="white" opacity="0.7" />
        </svg>
      </header>

      <div className="bg-white pt-16">
        <DemoStatStrip color={ocean} border="rgba(42,127,158,0.2)" stats={[
          { value: '8 yrs', label: 'in the classroom' },
          { value: '6', label: 'schools using Tide Pool Club' },
          { value: '2024', label: 'district Teacher of the Year' },
        ]} />
      </div>

      <DemoFeature
        image="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1400&q=85"
        alt="Bright classroom prepared for collaborative learning"
        eyebrow="Inside my classroom"
        title="Curiosity is the curriculum underneath the curriculum."
        body="I build a room where students feel safe asking the second question, trying the strange idea, and showing their work before it feels perfect."
        bullets={['Project-based units tied to real local questions', 'Family communication that is warm and consistent', 'Classroom systems designed for confidence and belonging']}
        accent={ocean}
        panel="#ffffff"
        reverse
      />

      <section id="work" className="bg-white px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <h2 className="text-center text-3xl font-extrabold">A few things about me</h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {highlights.map((h, i) => (
              <Reveal key={h.title} delay={i * 0.1}>
                <div className="h-full rounded-3xl p-6 text-center" style={{ background: sky }}>
                  <span className="text-3xl">{h.icon}</span>
                  <h3 className="mt-3 text-lg font-bold">{h.title}</h3>
                  <p className="mt-2 text-sm" style={{ color: '#4f6b76' }}>{h.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="px-6 py-16 text-center">
        <Reveal>
          <h2 className="text-3xl font-extrabold">Say hello</h2>
          <p className="mt-3" style={{ color: '#4f6b76' }}>hannah.reed@example.com</p>
        </Reveal>
        <p className="mt-14 text-xs" style={{ color: '#93a8b0' }}>
          A FolioLabz style example, not a finished site. Hannah is made up; yours is built around you.
        </p>
      </section>

      <DemoBar styleId="coastal" styleName="Coastal" />
    </div>
  )
}
