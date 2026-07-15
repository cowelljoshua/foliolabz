import { Link } from 'react-router-dom'
import Reveal from '../components/reactbits/Reveal.jsx'
import CareerMiniSite from '../components/CareerMiniSite.jsx'
import DeviceFrame from '../components/DeviceFrame.jsx'
import { portfolioPalettes, realSites } from '../config/site.js'

export default function Styles() {
  const liveSites = realSites.filter((site) => site.live && site.url)
  const comingSoon = realSites.filter((site) => !site.live)

  return (
    <main className="mx-auto max-w-6xl px-6 pt-32">
      <section id="finder">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm text-mist">
            <span className="h-2 w-2 rounded-full bg-violet" />
            10 universal color palettes
          </span>
          <h1 className="font-head mt-6 text-4xl leading-tight sm:text-6xl">
            Choose a palette that feels like you.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-mist sm:text-lg">
            No job categories or prebuilt layouts. Pick the colors you like, and I will shape the website around your actual work later.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2 text-xs text-mist">
            <span className="rounded-full border hairline px-3 py-1.5">10 color choices</span>
            <span className="rounded-full border hairline px-3 py-1.5">Layout designed later</span>
          </div>
        </Reveal>

        <div className="mt-14">
          <Reveal>
            <p className="section-kicker">Pick a starting point</p>
            <h2 className="font-head mt-2 text-3xl sm:text-4xl">Ten palettes. Nothing else decided yet.</h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-mist">
              Every option can work for any portfolio. Choose by taste; the structure, projects, and page flow are handled separately.
            </p>
          </Reveal>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {portfolioPalettes.map((palette, index) => (
              <Reveal key={palette.id} delay={Math.min(index, 4) * 0.035}>
                <Link
                  to={'/start?style=' + palette.id}
                  aria-label={'Use ' + palette.name + ' palette'}
                  className="group block h-full overflow-hidden rounded-2xl border hairline bg-ink-800 transition hover:-translate-y-1 hover:border-violet/35 hover:shadow-[0_16px_35px_-28px_rgba(24,34,48,0.55)]"
                >
                  <div className="h-24 overflow-hidden border-b hairline sm:h-28">
                    <CareerMiniSite direction={palette} />
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-sm font-semibold sm:text-base">{palette.name}</h3>
                    <p className="mt-1 text-[11px] leading-snug text-mist">{palette.type}</p>
                    <span className="mt-3 inline-flex text-xs font-semibold text-violet transition group-hover:translate-x-0.5">Choose</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-28 border-t hairline pt-20">
        <Reveal className="max-w-2xl">
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm text-mist">
            <span className="h-2 w-2 animate-pulse-soft rounded-full bg-mint" />
            Real launches, live right now
          </span>
          <h2 className="font-head mt-5 text-4xl sm:text-5xl">This is not a mockup.</h2>
          <p className="mt-4 text-mist">Explore real client sites to see how the final result changes around each person and their work.</p>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {liveSites.map((site, index) => (
            <Reveal key={site.id} delay={index * 0.1}>
              <DeviceFrame name={site.name} url={site.url} thumb={site.thumb} field={site.field} />
            </Reveal>
          ))}
        </div>

        {comingSoon.length > 0 && (
          <Reveal className="mt-10 text-center">
            <p className="text-sm text-mist">{comingSoon.map((site) => site.field).join(', ')} launch{comingSoon.length === 1 ? '' : 'es'} on the way.</p>
          </Reveal>
        )}
      </section>

      <Reveal className="my-20 text-center">
        <Link to="/start" className="btn-primary">Start my build</Link>
      </Reveal>
    </main>
  )
}
