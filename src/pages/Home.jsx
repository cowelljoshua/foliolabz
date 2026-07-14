import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import GridPaper from '../components/reactbits/GridPaper.jsx'
import ShinyText from '../components/reactbits/ShinyText.jsx'
import SpotlightCard from '../components/reactbits/SpotlightCard.jsx'
import StarBorder from '../components/reactbits/StarBorder.jsx'
import Reveal from '../components/reactbits/Reveal.jsx'
import { asset } from '../lib/asset.js'
import { site, demoStyles, resumeService } from '../config/site.js'

const steps = [
  {
    n: '01',
    title: 'You fill out one form',
  },
  {
    n: '02',
    title: 'I design, build, and launch',
  },
  {
    n: '03',
    title: 'You send edits, I make them',
  },
]

const rise = {
  initial: { opacity: 0, y: 26 },
  animate: { opacity: 1, y: 0 },
}

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden">
        <GridPaper />
        <div className="relative z-10 mx-auto max-w-4xl px-6 pt-24 text-center">
          <h1 className="font-head mt-6 text-5xl leading-[1.08] tracking-tight sm:text-7xl">
            <motion.span {...rise} transition={{ duration: 0.6, ease: [0.21, 0.61, 0.35, 1] }} className="block">
              A portfolio that
            </motion.span>
            <motion.span
              {...rise}
              transition={{ duration: 0.6, delay: 0.18, ease: [0.21, 0.61, 0.35, 1] }}
              className="block"
            >
              <span className="marker">gets you hired.</span>
            </motion.span>
          </h1>
          <Reveal delay={0.5} className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link to="/styles" className="btn-primary">Pick your style</Link>
            <Link to="/pricing" className="btn-ghost">See pricing</Link>
          </Reveal>
          <Reveal delay={0.7} className="mt-10">
            <ShinyText>Websites from $300 · Resume polish from $40</ShinyText>
          </Reveal>
        </div>
      </section>

      {/* WORRY-FREE PROMISE */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <Reveal>
          <h2 className="font-head text-center text-3xl sm:text-4xl">
            The worry-free build
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.12}>
              <SpotlightCard className="h-full p-7">
                <span className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-gradient">Fig. {s.n}</span>
                <h3 className="font-display mt-3 text-xl font-semibold">{s.title}</h3>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FOLIOLABZ STORY */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <Reveal>
          <h2 className="font-head text-center text-3xl sm:text-4xl">
            The FolioLabz story
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <SpotlightCard className="mt-12 p-8 sm:p-12">
            <div className="mx-auto max-w-2xl space-y-5 text-base leading-relaxed text-mist sm:text-lg">
              <p>
                Time and time again, interviewers would ask to see my portfolio.
              </p>
              <p>
                And every time, I was sending over some thrown-together mix of folders, screenshots, and project links that did not really show my work well.
              </p>
              <p>
                About a year ago, I finally built my own portfolio website. After that, I started helping other people build theirs too, which eventually led me to create{' '}
                <span className="text-gradient font-semibold">FolioLabz</span>.
              </p>
              <p className="text-frost">
                It is hard to show your personality, creativity, and what you are actually capable of before you ever get an interview. A portfolio gives employers a better sense of who you are, while also giving you one easy link to share and a real leg up when applying.
              </p>
            </div>
            <div className="mx-auto mt-8 flex max-w-2xl items-center justify-center gap-4 border-t hairline pt-6">
              {/*
                TODO(JOSH): add your headshot.
                1. Drop a square photo at  public/josh-headshot.jpg  (a clear, friendly
                   picture of your face; ~600x600 or larger).
                2. In src/config/site.js set  founder.showPhoto: true
                That is it. The circle below stays hidden until you flip the flag.
              */}
              {site.founder.showPhoto && (
                <img
                  src={asset(site.founder.photo)}
                  alt="Josh Cowell"
                  className="h-14 w-14 rounded-full border hairline object-cover"
                />
              )}
              <div className="text-center">
                <p className="font-display font-semibold">{site.founder.name}</p>
                <p className="mt-0.5 text-sm text-mist">{site.founder.role}</p>
              </div>
            </div>
          </SpotlightCard>
        </Reveal>
      </section>

      {/* STYLE TEASER */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-head text-3xl sm:text-4xl">Pick which style fits you best</h2>
          </div>
          <Link to="/styles" className="btn-ghost shrink-0">Explore all styles</Link>
        </Reveal>
        <div className="scroll-x mt-10 flex gap-4 overflow-x-auto overflow-y-hidden pb-4 pt-1">
          {demoStyles.map((d, i) => (
            <Reveal key={d.id} delay={Math.min(i, 5) * 0.06} className="shrink-0">
              <Link
                to={`/styles/${d.id}`}
                className="group block w-56 overflow-hidden rounded-2xl border hairline bg-ink-800 shadow-[0_12px_26px_-20px_rgba(0,0,0,0.75)] transition-transform duration-300 hover:-translate-y-1"
              >
                <div
                  className="h-28 w-full transition-transform duration-500 group-hover:scale-105"
                  style={{
                    background: `linear-gradient(120deg, ${d.swatch[0]} 30%, ${d.swatch[1]} 75%, ${d.swatch[2]})`,
                  }}
                />
                <div className="p-4">
                  <p className="font-display font-semibold">{d.name}</p>
                  <p className="mt-0.5 text-xs text-mist">{d.vibe}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* RESUME TEASER */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <Reveal>
          <div className="glass flex flex-col items-center gap-4 rounded-2xl p-8 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <h3 className="font-display text-xl font-semibold">Not ready for a website?</h3>
              <p className="mt-1 text-sm text-mist">
                ${resumeService.tiers[0].price} gets your resume professionally sharpened. By a human.
              </p>
            </div>
            <Link to="/pricing#resume" className="btn-ghost shrink-0">Polish my resume</Link>
          </div>
        </Reveal>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-3xl px-6 pb-12">
        <Reveal>
          <StarBorder className="rounded-2xl">
            <div className="rounded-2xl p-10 text-center sm:p-14">
              <h2 className="font-head text-3xl sm:text-4xl">
                Your work deserves a <span className="text-gradient italic">better first impression.</span>
              </h2>
              <p className="mx-auto mt-4 max-w-md text-mist">
                Ten minutes of your time. One form.
              </p>
              <Link to="/start" className="btn-primary mt-8">Start my build</Link>
            </div>
          </StarBorder>
        </Reveal>
      </section>
    </main>
  )
}
