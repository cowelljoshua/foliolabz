import DemoBar from '../../components/DemoBar.jsx'
import Reveal from '../../components/reactbits/Reveal.jsx'

const cream = '#f4f1e9'
const sage = '#4f7a4a'
const clay = '#c98a5a'
const ink = '#33372f'

const offerings = [
  { name: 'One-on-one coaching', desc: 'Twelve weeks toward a calmer, stronger you.', price: 'from $90 / session' },
  { name: 'Group breathwork', desc: 'Small circles, big shifts. Wednesday evenings.', price: '$25 / class' },
  { name: 'Corporate wellness', desc: 'Bring calm to your team. Half and full day.', price: 'let us talk' },
]

export default function Botanical() {
  return (
    <div className="min-h-screen pb-28" style={{ background: cream, color: ink, fontFamily: '"Fraunces", Georgia, serif' }}>
      <header className="mx-auto max-w-4xl px-6 pt-24 text-center">
        <Reveal>
          <span className="text-3xl" aria-hidden="true">🌿</span>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.3em]" style={{ color: sage, fontFamily: 'Inter, sans-serif' }}>
            Wellness Coach
          </p>
          <h1 className="mt-4 text-6xl italic tracking-tight sm:text-7xl">Priya Anand</h1>
          <p className="mx-auto mt-5 max-w-md text-lg" style={{ color: '#6d7266' }}>
            Helping busy people breathe, reset, and grow. Grounded practices for real life.
          </p>
          <a
            href="#work"
            className="mt-8 inline-block rounded-full px-8 py-3 font-semibold text-white transition-transform hover:-translate-y-0.5"
            style={{ background: sage, fontFamily: 'Inter, sans-serif' }}
          >
            Work with me
          </a>
        </Reveal>
      </header>

      <section className="mx-auto max-w-4xl px-6 py-16">
        <Reveal>
          <div className="rounded-3xl p-8 text-center sm:p-12" style={{ background: '#ffffff' }}>
            <p className="text-2xl italic leading-relaxed sm:text-3xl">
              “Wellness is not a destination. It is a set of small, kind choices you make every day.”
            </p>
          </div>
        </Reveal>
      </section>

      <section id="work" className="mx-auto max-w-4xl px-6 pb-8">
        <Reveal>
          <h2 className="text-center text-4xl italic">Ways we can work together</h2>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {offerings.map((o, i) => (
            <Reveal key={o.name} delay={i * 0.1}>
              <div className="h-full rounded-3xl border p-6" style={{ borderColor: '#e2dccc', background: '#fbfaf5' }}>
                <div className="mb-3 h-10 w-10 rounded-full" style={{ background: i === 1 ? clay : sage, opacity: 0.85 }} />
                <h3 className="text-xl">{o.name}</h3>
                <p className="mt-2 text-sm" style={{ color: '#6d7266' }}>{o.desc}</p>
                <p className="mt-4 text-sm font-semibold uppercase tracking-wide" style={{ color: sage, fontFamily: 'Inter, sans-serif' }}>
                  {o.price}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-3xl px-6 py-16 text-center">
        <Reveal>
          <h2 className="text-3xl italic">Let us begin</h2>
          <p className="mt-3" style={{ color: '#6d7266' }}>priya@example.com</p>
        </Reveal>
        <p className="mt-14 text-xs" style={{ color: '#a7ab9f', fontFamily: 'Inter, sans-serif' }}>
          A Foliolab style demo. Priya is fictional, your site will not be.
        </p>
      </section>

      <DemoBar styleId="botanical" styleName="Botanical" />
    </div>
  )
}
