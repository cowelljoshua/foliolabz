import DemoBar from '../../components/DemoBar.jsx'
import Reveal from '../../components/reactbits/Reveal.jsx'

const ivory = '#f6f1e7'
const charcoal = '#1a1a1a'
const gold = '#b08d57'

const projects = [
  { name: 'The Aldridge Penthouse', place: 'Manhattan', grad: 'linear-gradient(135deg, #cbb892, #8a6f43)' },
  { name: 'Coastal Retreat', place: 'Amalfi', grad: 'linear-gradient(135deg, #d9cbb2, #a38f6a)' },
  { name: 'Maison Noir', place: 'Paris', grad: 'linear-gradient(135deg, #4a453d, #1a1a1a)' },
  { name: 'Willow Estate', place: 'Napa Valley', grad: 'linear-gradient(135deg, #c3b79c, #6f5f45)' },
]

export default function Luxe() {
  return (
    <div className="min-h-screen pb-28" style={{ background: ivory, color: charcoal, fontFamily: 'Inter, sans-serif' }}>
      <header className="mx-auto max-w-4xl px-6 pt-28 text-center">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.4em]" style={{ color: gold }}>
            Interior Design Studio
          </p>
          <h1 className="mt-6 text-6xl tracking-tight sm:text-8xl" style={{ fontFamily: '"DM Serif Display", Georgia, serif' }}>
            Camille Rousseau
          </h1>
          <div className="mx-auto mt-7 flex items-center justify-center gap-4">
            <span className="h-px w-12" style={{ background: gold }} />
            <span className="text-sm uppercase tracking-[0.3em]" style={{ color: gold }}>Est. 2016</span>
            <span className="h-px w-12" style={{ background: gold }} />
          </div>
          <p className="mx-auto mt-7 max-w-lg leading-relaxed" style={{ color: '#5f5a50' }}>
            Interiors that feel inevitable. I design calm, collected spaces where every object has earned its place.
          </p>
        </Reveal>
      </header>

      <section id="work" className="mx-auto max-w-5xl px-6 py-20">
        <Reveal>
          <h2 className="text-center text-4xl" style={{ fontFamily: '"DM Serif Display", Georgia, serif' }}>
            Selected Projects
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08}>
              <figure className="group cursor-pointer">
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <div className="h-full w-full transition-transform duration-700 group-hover:scale-105" style={{ background: p.grad }} />
                </div>
                <figcaption className="mt-4 flex items-baseline justify-between border-t pt-3" style={{ borderColor: '#ddd4c2' }}>
                  <span className="text-lg" style={{ fontFamily: '"DM Serif Display", Georgia, serif' }}>{p.name}</span>
                  <span className="text-xs uppercase tracking-widest" style={{ color: gold }}>{p.place}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="contact" className="px-6 py-12 text-center">
        <Reveal>
          <p className="text-2xl" style={{ fontFamily: '"DM Serif Display", Georgia, serif' }}>
            Begin your project
          </p>
          <a
            href="mailto:studio@example.com"
            className="mt-5 inline-block px-8 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-opacity hover:opacity-90"
            style={{ background: charcoal }}
          >
            studio@example.com
          </a>
        </Reveal>
        <p className="mt-14 text-xs" style={{ color: '#a49c8b' }}>
          A Foliolab style demo. Camille is fictional, your site will not be.
        </p>
      </section>

      <DemoBar styleId="luxe" styleName="Ivory Luxe" />
    </div>
  )
}
