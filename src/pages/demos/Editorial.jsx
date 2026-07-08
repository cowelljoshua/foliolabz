import DemoBar from '../../components/DemoBar.jsx'
import Reveal from '../../components/reactbits/Reveal.jsx'

const red = '#e63946'
const paper = '#f5f0e8'
const ink = '#141414'

const campaigns = [
  { n: '01', name: 'Campus Coffee Rebrand', result: 'Sales up 40% in one semester', desc: 'Full identity, socials, and a launch week that had lines out the door.' },
  { n: '02', name: 'Nonprofit Giving Day', result: '$92k raised in 24 hours', desc: 'Email sequences, countdown content, and a story-first landing page.' },
  { n: '03', name: 'TikTok for a Law Firm', result: '2.1M views, 40 leads', desc: 'Yes, a law firm. Voice matters more than the platform.' },
]

export default function Editorial() {
  return (
    <div className="min-h-screen pb-28" style={{ background: paper, color: ink, fontFamily: '"Fraunces", Georgia, serif' }}>
      {/* Hero */}
      <header className="border-b-4 px-6 pb-12 pt-20" style={{ borderColor: ink }}>
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.3em]" style={{ fontFamily: 'Inter, sans-serif', color: red }}>
              Marketing · Strategy · Story
            </p>
            <h1 className="mt-4 text-[17vw] font-semibold leading-[0.9] tracking-tight sm:text-[7.5rem]">
              Devon
              <br />
              Price<span style={{ color: red }}>.</span>
            </h1>
            <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
              <p className="max-w-md text-xl italic leading-relaxed" style={{ color: '#4a4a4a' }}>
                I make brands impossible to scroll past.
              </p>
              <a
                href="#work"
                className="px-7 py-3 text-sm font-bold uppercase tracking-widest text-white transition-transform hover:-translate-y-0.5"
                style={{ background: ink, fontFamily: 'Inter, sans-serif' }}
              >
                The work ↓
              </a>
            </div>
          </Reveal>
        </div>
      </header>

      {/* Campaigns */}
      <section id="work" className="mx-auto max-w-5xl px-6 py-14">
        {campaigns.map((c, i) => (
          <Reveal key={c.n} delay={i * 0.05}>
            <article className="group grid gap-4 border-b py-10 sm:grid-cols-[auto_1fr_auto] sm:items-baseline sm:gap-10" style={{ borderColor: '#d8d2c6' }}>
              <span className="text-5xl font-semibold" style={{ color: red }}>{c.n}</span>
              <div>
                <h2 className="text-3xl font-semibold transition-transform duration-300 group-hover:translate-x-2">{c.name}</h2>
                <p className="mt-2 max-w-md" style={{ color: '#4a4a4a', fontFamily: 'Inter, sans-serif', fontSize: '0.95rem' }}>
                  {c.desc}
                </p>
              </div>
              <p className="text-sm font-bold uppercase tracking-wide sm:text-right" style={{ fontFamily: 'Inter, sans-serif' }}>
                {c.result}
              </p>
            </article>
          </Reveal>
        ))}
      </section>

      {/* Quote */}
      <section className="px-6 py-10">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-3xl italic leading-snug sm:text-4xl">
            “Attention is earned in the first line. Everything else is follow-through.”
          </p>
        </Reveal>
      </section>

      {/* Contact */}
      <section className="px-6 py-14 text-center">
        <Reveal>
          <a
            href="mailto:devon.price@example.com"
            className="inline-block text-2xl font-semibold underline decoration-4 underline-offset-8 transition-colors"
            style={{ textDecorationColor: red }}
          >
            devon.price@example.com
          </a>
        </Reveal>
        <p className="mt-14 text-xs" style={{ color: '#9a948a', fontFamily: 'Inter, sans-serif' }}>
          A Foliolab style demo. Devon is fictional, your site will not be.
        </p>
      </section>

      <DemoBar styleId="editorial" styleName="Editorial" />
    </div>
  )
}
