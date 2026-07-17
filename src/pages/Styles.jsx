import { useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/reactbits/Reveal.jsx'
import CareerMiniSite from '../components/CareerMiniSite.jsx'
import DeviceFrame from '../components/DeviceFrame.jsx'
import { portfolioPalettes, realSites } from '../config/site.js'

export default function Styles() {
  const [showAllPalettes, setShowAllPalettes] = useState(false)
  const liveSites = realSites.filter((site) => site.live && site.url)
  const comingSoon = realSites.filter((site) => !site.live)
  const visiblePalettes = showAllPalettes ? portfolioPalettes : portfolioPalettes.slice(0, 5)

  return (
    <main className="mx-auto max-w-6xl px-6 pt-32">
      <section id="finder">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h1 className="font-head text-4xl leading-tight sm:text-6xl">Color palettes.</h1>
          <p className="mx-auto mt-5 max-w-2xl text-mist sm:text-lg">
            Every option can work for any portfolio. Choose by taste; the structure, projects, and page flow are handled separately.
          </p>
        </Reveal>

        <div className="mt-14">
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {visiblePalettes.map((palette, index) => (
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
          {portfolioPalettes.length > 5 && (
            <div className="mt-7 text-center">
              <button
                type="button"
                onClick={() => setShowAllPalettes((value) => !value)}
                className="btn-ghost"
                aria-expanded={showAllPalettes}
              >
                {showAllPalettes ? 'Show fewer palettes' : `Show ${portfolioPalettes.length - 5} more palettes`}
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="mt-28 border-t hairline pt-20">
        <Reveal className="max-w-2xl">
          <h2 className="font-head text-4xl sm:text-5xl">My work</h2>

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
