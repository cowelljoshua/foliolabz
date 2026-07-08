import { Link } from 'react-router-dom'
import TiltedCard from '../components/reactbits/TiltedCard.jsx'
import Reveal from '../components/reactbits/Reveal.jsx'
import MiniSite from '../components/MiniSite.jsx'
import DeviceFrame from '../components/DeviceFrame.jsx'
import { demoStyles, realSites } from '../config/site.js'

export default function Styles() {
  const liveSites = realSites.filter((s) => s.live && s.url)
  const comingSoon = realSites.filter((s) => !s.live)

  return (
    <main className="mx-auto max-w-6xl px-6 pt-32">
      <Reveal className="max-w-2xl">
        <h1 className="font-display text-4xl font-bold sm:text-5xl">
          Pick a style. <span className="text-gradient">I take it from there.</span>
        </h1>
        <p className="mt-4 text-mist">
          Ten directions, each one a real site you can click through. Your site will not be a copy, it will be yours. The style just tells me what you love.
        </p>
      </Reveal>

      {/* THE 5 DEMO STYLES */}
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {demoStyles.map((d, i) => (
          <Reveal key={d.id} delay={i * 0.08}>
            <TiltedCard>
              <Link
                to={`/styles/${d.id}`}
                className="group block overflow-hidden rounded-2xl border hairline bg-ink-800/70"
              >
                <div className="h-44 overflow-hidden border-b hairline">
                  <div className="h-full w-full transition-transform duration-500 group-hover:scale-[1.04]">
                    <MiniSite swatch={d.swatch} />
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <h2 className="font-display text-lg font-semibold">{d.name}</h2>
                    <span className="flex gap-1">
                      {d.swatch.map((c) => (
                        <span key={c} className="h-3 w-3 rounded-full border border-white/20" style={{ background: c }} />
                      ))}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs font-medium uppercase tracking-wide text-mist">{d.vibe}</p>
                  <p className="mt-2 text-sm text-mist">{d.blurb}</p>
                  <p className="mt-4 text-sm font-semibold text-gradient">Explore this style →</p>
                </div>
              </Link>
            </TiltedCard>
          </Reveal>
        ))}

        {/* Card that points to the intake form for undecided visitors */}
        <Reveal delay={0.4}>
          <Link
            to="/start"
            className="flex h-full min-h-[16rem] flex-col items-center justify-center rounded-2xl border border-dashed border-white/20 p-8 text-center transition-colors hover:border-violet"
          >
            <p className="font-display text-lg font-semibold">Torn between a few?</p>
            <p className="mt-2 text-sm text-mist">Say so in the form and we will combine them.</p>
            <span className="btn-ghost mt-5 text-sm">Start my build</span>
          </Link>
        </Reveal>
      </div>

      {/* REAL CLIENT WORK */}
      <section className="mt-24">
        <Reveal className="text-center">
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm text-mist">
            <span className="h-2 w-2 animate-pulse-soft rounded-full bg-mint" />
            Real launches, live right now
          </span>
          <h2 className="font-display mt-5 text-3xl font-bold sm:text-4xl">This is not a mockup.</h2>
          <p className="mx-auto mt-3 max-w-xl text-mist">
            Real client sites, streaming live into this page. Click one to open it full-size and explore.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {liveSites.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.1}>
              <DeviceFrame name={s.name} url={s.url} thumb={s.thumb} field={s.field} />
            </Reveal>
          ))}
        </div>

        {comingSoon.length > 0 && (
          <Reveal className="mt-10 text-center">
            <p className="text-sm text-mist">
              {comingSoon.map((s) => s.field).join(', ')} launch{comingSoon.length === 1 ? '' : 'es'} on the way. This list keeps growing.
            </p>
          </Reveal>
        )}
      </section>

      {/* CTA */}
      <Reveal className="my-20 text-center">
        <Link to="/start" className="btn-primary">Found your style? Start my build</Link>
      </Reveal>
    </main>
  )
}
