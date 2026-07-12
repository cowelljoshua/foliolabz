import DemoBar from '../../components/DemoBar.jsx'
import Reveal from '../../components/reactbits/Reveal.jsx'
import { DemoFeature, DemoStatStrip, DemoTopNav } from '../../components/DemoExtras.jsx'

const cream = '#f3e9dc'
const clay = '#b4552d'
const espresso = '#3a2e26'

// Abstract gradient "photographs" so the demo needs no image files.
const shots = [
  { grad: 'linear-gradient(160deg, #d98e5f, #8c3b16)', ratio: 'aspect-[3/4]', label: 'Golden hour, Asheville' },
  { grad: 'linear-gradient(160deg, #e8c9a8, #b4552d)', ratio: 'aspect-square', label: 'The Hendersons' },
  { grad: 'linear-gradient(160deg, #7d5a44, #2e1f16)', ratio: 'aspect-[3/4]', label: 'Studio, film' },
  { grad: 'linear-gradient(160deg, #c97f4e, #5a3220)', ratio: 'aspect-square', label: 'Harvest table' },
  { grad: 'linear-gradient(160deg, #e5b98f, #96421c)', ratio: 'aspect-[4/3]', label: 'First dance' },
  { grad: 'linear-gradient(160deg, #a86a3d, #402a1a)', ratio: 'aspect-[3/4]', label: 'Blue ridge fog' },
]

const services = [
  { name: 'Portraits', price: 'from $250' },
  { name: 'Weddings', price: 'from $1,800' },
  { name: 'Brand shoots', price: 'from $600' },
]

export default function WarmStudio() {
  return (
    <div className="min-h-screen pb-28" style={{ background: cream, color: espresso, fontFamily: '"Fraunces", Georgia, serif' }}>
      <DemoTopNav brand="Sofia Reyes" tone="light" accent={clay} links={[{ href: '#work', label: 'Portfolio' }, { href: '#about', label: 'About' }, { href: '#contact', label: 'Bookings' }]} />
      {/* Hero */}
      <header id="top" className="mx-auto max-w-5xl px-6 pb-10 pt-24 text-center">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.3em]" style={{ color: clay, fontFamily: 'Inter, sans-serif' }}>
            Photographer
          </p>
          <h1 className="mt-4 text-6xl font-semibold italic tracking-tight sm:text-7xl">Sofia Reyes</h1>
          <p className="mx-auto mt-4 max-w-md text-lg" style={{ color: '#75634f' }}>
            Warm light, honest moments. Portraits and weddings across the Blue Ridge.
          </p>
        </Reveal>
      </header>

      <DemoStatStrip color={clay} border="#dccbb4" stats={[
        { value: '140+', label: 'stories photographed' },
        { value: '9 yrs', label: 'behind the camera' },
        { value: '48 hr', label: 'sneak-peek delivery' },
      ]} />

      {/* Gallery */}
      <section id="work" className="mx-auto max-w-5xl columns-2 gap-4 px-6 pt-20 sm:columns-3">
        {shots.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.06} className="mb-4 break-inside-avoid">
            <figure className="group cursor-pointer overflow-hidden rounded-xl">
              <div
                className={`${s.ratio} w-full transition-transform duration-500 group-hover:scale-105`}
                style={{ background: s.grad }}
              />
              <figcaption className="px-1 pt-2 text-sm italic" style={{ color: '#75634f' }}>
                {s.label}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </section>

      <DemoFeature
        image="https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?auto=format&fit=crop&w=1400&q=85"
        alt="Photographer holding a camera in warm natural light"
        eyebrow="Behind the lens"
        title="Your day should feel like your day."
        body="I give just enough direction to help you feel natural, then leave room for the unscripted moments that become the photographs you keep forever."
        bullets={['A relaxed planning call before every session', 'True-to-life color with warm, film-inspired texture', 'Private galleries designed for sharing and printing']}
        accent={clay}
        panel="#ead9c5"
        reverse
      />

      {/* Services */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <Reveal>
          <h2 className="text-center text-4xl font-semibold italic">Sessions</h2>
        </Reveal>
        <div className="mt-8 space-y-1">
          {services.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.08}>
              <div
                className="flex items-baseline justify-between border-b py-5"
                style={{ borderColor: '#dccbb4' }}
              >
                <span className="text-2xl">{s.name}</span>
                <span className="text-sm font-semibold uppercase tracking-wide" style={{ color: clay, fontFamily: 'Inter, sans-serif' }}>
                  {s.price}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="px-6 pb-16 text-center">
        <Reveal>
          <a
            href="mailto:sofia@example.com"
            className="inline-block rounded-full px-8 py-4 text-lg font-semibold text-white transition-transform hover:-translate-y-0.5"
            style={{ background: clay, fontFamily: 'Inter, sans-serif' }}
          >
            Book a session
          </a>
        </Reveal>
        <p className="mt-14 text-xs" style={{ color: '#a89579', fontFamily: 'Inter, sans-serif' }}>
          A FolioLabz style example, not a finished site. Sofia is made up; yours is built around you.
        </p>
      </section>

      <DemoBar styleId="warmstudio" styleName="Warm Studio" />
    </div>
  )
}
