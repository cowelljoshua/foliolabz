import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import Aurora from '../components/reactbits/Aurora.jsx'
import SplitText from '../components/reactbits/SplitText.jsx'
import BlurText from '../components/reactbits/BlurText.jsx'
import ShinyText from '../components/reactbits/ShinyText.jsx'
import SpotlightCard from '../components/reactbits/SpotlightCard.jsx'
import StarBorder from '../components/reactbits/StarBorder.jsx'
import Reveal from '../components/reactbits/Reveal.jsx'
import { demoStyles, resumeService } from '../config/site.js'

const steps = [
  {
    n: '01',
    title: 'You fill out one form',
    body: 'Your info, your style pick, your files. Ten minutes, tops.',
  },
  {
    n: '02',
    title: 'I design, build, and launch',
    body: 'Custom design, your own web address, live on the internet. All handled.',
  },
  {
    n: '03',
    title: 'You send edits, I make them',
    body: 'New job? New project? One email and your site stays current.',
  },
]

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden">
        <Aurora />
        <div className="relative z-10 mx-auto max-w-4xl px-6 pt-24 text-center">
          <Reveal>
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm text-mist">
              <span className="h-2 w-2 animate-pulse-soft rounded-full bg-mint" />
              Taking new clients
            </span>
          </Reveal>
          <h1 className="font-display mt-6 text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl">
            <SplitText text="A portfolio that" as="span" className="block" />
            <motion.span
              className="text-gradient block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease: [0.21, 0.61, 0.35, 1] }}
            >
              gets you hired.
            </motion.span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-mist">
            <BlurText
              text="You never touch code. Pick a style, fill out one form, and your website gets built, launched, and kept fresh for you."
              delay={0.8}
            />
          </p>
          <Reveal delay={1.1} className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link to="/styles" className="btn-primary">Pick your style</Link>
            <Link to="/pricing" className="btn-ghost">See pricing</Link>
          </Reveal>
          <Reveal delay={1.3} className="mt-10">
            <ShinyText className="text-sm">Websites from $300 · Resume polish from $40</ShinyText>
          </Reveal>
        </div>
      </section>

      {/* WORRY-FREE PROMISE */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <Reveal>
          <h2 className="font-display text-center text-3xl font-bold sm:text-4xl">
            The worry-free build
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.12}>
              <SpotlightCard className="h-full p-7">
                <span className="font-display text-sm font-semibold text-gradient">{s.n}</span>
                <h3 className="font-display mt-3 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">{s.body}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FOLIOLABZ STORY */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <Reveal>
          <h2 className="font-display text-center text-3xl font-bold sm:text-4xl">
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
            <div className="mx-auto mt-8 max-w-2xl border-t hairline pt-6 text-center">
              <p className="font-display font-semibold">Josh Cowell</p>
              <p className="mt-0.5 text-sm text-mist">Founder, FolioLabz</p>
            </div>
          </SpotlightCard>
        </Reveal>
      </section>

      {/* STYLE TEASER */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">Ten styles. Yours to explore.</h2>
            <p className="mt-3 text-mist">Every one is a real site you can click through. Scroll to see them all, then pick your favorite.</p>
          </div>
          <Link to="/styles" className="btn-ghost shrink-0">Explore all styles</Link>
        </Reveal>
        <div className="scroll-x mt-10 flex gap-4 overflow-x-auto overflow-y-hidden pb-4 pt-1">
          {demoStyles.map((d, i) => (
            <Reveal key={d.id} delay={Math.min(i, 5) * 0.06} className="shrink-0">
              <Link
                to={`/styles/${d.id}`}
                className="group block w-56 overflow-hidden rounded-2xl border hairline bg-ink-800/70 transition-transform duration-300 hover:-translate-y-1"
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
      <section className="mx-auto max-w-3xl px-6 pb-8">
        <Reveal>
          <StarBorder className="rounded-3xl">
            <div className="rounded-3xl p-10 text-center sm:p-14">
              <h2 className="font-display text-3xl font-bold sm:text-4xl">
                Your work deserves a <span className="text-gradient">better first impression.</span>
              </h2>
              <p className="mx-auto mt-4 max-w-md text-mist">
                Ten minutes of your time. One form. A website that works as hard as you do.
              </p>
              <Link to="/start" className="btn-primary mt-8">Start my build</Link>
            </div>
          </StarBorder>
        </Reveal>
      </section>
    </main>
  )
}
