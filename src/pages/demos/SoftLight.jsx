import DemoBar from '../../components/DemoBar.jsx'
import Reveal from '../../components/reactbits/Reveal.jsx'

const sage = '#7aa5a0'
const peach = '#e8b4a0'
const ink = '#3d4644'

const experience = [
  { role: 'Medical-Surgical Nurse', place: 'Riverside Regional', years: '2024 to now', note: 'Charge nurse twice weekly on a 32-bed unit.' },
  { role: 'Nurse Extern', place: "St. Anne's Children's", years: '2023', note: 'Pediatric post-op care and family education.' },
  { role: 'BSN, Nursing', place: 'Blue Ridge University', years: '2020 to 2024', note: 'Graduated magna cum laude.' },
]

const certs = ['RN License', 'BLS', 'ACLS', 'Med-Surg Certified (CMSRN)', 'Wound Care']

export default function SoftLight() {
  return (
    <div className="min-h-screen bg-[#f7f6f2] pb-28 font-body" style={{ color: ink }}>
      {/* Hero */}
      <header className="mx-auto flex min-h-[75vh] max-w-4xl flex-col items-center justify-center px-6 text-center">
        <Reveal>
          <div
            className="mx-auto flex h-28 w-28 items-center justify-center rounded-full text-3xl font-semibold text-white shadow-lg"
            style={{ background: `linear-gradient(135deg, ${sage}, ${peach})` }}
          >
            EB
          </div>
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.25em]" style={{ color: sage }}>
            Registered Nurse
          </p>
          <h1 className="mt-3 text-5xl font-bold tracking-tight sm:text-6xl">Elena Brooks</h1>
          <p className="mx-auto mt-5 max-w-md text-lg" style={{ color: '#6b7573' }}>
            Calm under pressure. Kind by default. Caring for patients and the people who love them.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <a
              href="#experience"
              className="rounded-full px-6 py-3 font-semibold text-white shadow-md transition-transform hover:-translate-y-0.5"
              style={{ background: sage }}
            >
              My experience
            </a>
            <a
              href="#contact"
              className="rounded-full border-2 px-6 py-3 font-semibold transition-colors"
              style={{ borderColor: peach, color: ink }}
            >
              Say hello
            </a>
          </div>
        </Reveal>
      </header>

      {/* Experience */}
      <section id="experience" className="mx-auto max-w-3xl px-6 py-14">
        <Reveal>
          <h2 className="text-center text-3xl font-bold">Where I have been</h2>
        </Reveal>
        <div className="mt-10 space-y-5">
          {experience.map((e, i) => (
            <Reveal key={e.role} delay={i * 0.1}>
              <div className="rounded-3xl bg-white p-7 shadow-[0_10px_40px_-18px_rgba(122,165,160,0.5)]">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-xl font-semibold">{e.role}</h3>
                  <span className="text-sm font-medium" style={{ color: sage }}>{e.years}</span>
                </div>
                <p className="mt-1 font-medium" style={{ color: peach }}>{e.place}</p>
                <p className="mt-2 text-sm" style={{ color: '#6b7573' }}>{e.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section className="mx-auto max-w-3xl px-6 py-6 text-center">
        <Reveal className="flex flex-wrap justify-center gap-2">
          {certs.map((c) => (
            <span
              key={c}
              className="rounded-full bg-white px-5 py-2 text-sm font-medium shadow-sm"
              style={{ color: sage }}
            >
              {c}
            </span>
          ))}
        </Reveal>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-3xl px-6 py-16 text-center">
        <Reveal>
          <h2 className="text-3xl font-bold">I would love to hear from you.</h2>
          <p className="mt-3" style={{ color: '#6b7573' }}>elena.brooks@example.com</p>
        </Reveal>
        <p className="mt-14 text-xs" style={{ color: '#a8b0ae' }}>
          A FolioLabz style example, not a finished site. Elena is made up; yours is built around you.
        </p>
      </section>

      <DemoBar styleId="softlight" styleName="Soft Light" />
    </div>
  )
}
