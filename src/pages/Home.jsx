import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import Reveal from '../components/reactbits/Reveal.jsx'
import { asset } from '../lib/asset.js'
import StripeNote from '../components/StripeNote.jsx'
import { site, resumeService, realSites, tier, deposit } from '../config/site.js'

const rise = { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 } }

function Arrow({ className = '' }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M3.75 9h10.5M10 4.75 14.25 9 10 13.25" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Check() {
  return (
    <svg className="mt-0.5 shrink-0" width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="8" fill="currentColor" opacity=".12" />
      <path d="m5.5 9 2.15 2.15L12.75 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function WorkCard({ project }) {
  return (
    <a href={project.url} target="_blank" rel="noreferrer" className="work-card group">
      <div className="work-card-image h-[22rem]">
        <img src={asset(project.thumb)} alt={project.name + ' portfolio website'} className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-[1.025]" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1928]/75 via-transparent to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 text-white sm:p-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/65">{project.field}</p>
          <h3 className="font-head mt-1 text-2xl sm:text-3xl">{project.name}</h3>
        </div>
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/35 bg-white/10 backdrop-blur-md transition group-hover:-translate-y-0.5 group-hover:bg-white group-hover:text-ink-950"><Arrow /></span>
      </div>
    </a>
  )
}

export default function Home() {
  const liveSites = realSites.filter((project) => project.live && project.url)

  return (
    <main className="overflow-hidden">
      <section className="hero-shell relative">
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />
        <div className="relative mx-auto grid min-h-[47rem] max-w-7xl items-center gap-14 px-6 pb-20 pt-32 lg:grid-cols-[1.02fr_.98fr] lg:px-10 lg:pb-24 lg:pt-36">
          <div className="relative z-10 max-w-2xl">
            <h1 className="font-display text-[clamp(3.25rem,7vw,6.6rem)] font-semibold leading-[0.93] tracking-[-0.045em]">
              <motion.span {...rise} transition={{ duration: 0.6, delay: 0.08 }} className="block">Portfolios</motion.span>
              <motion.span {...rise} transition={{ duration: 0.6, delay: 0.18 }} className="block text-violet">made easy.</motion.span>
            </h1>
            <motion.p {...rise} transition={{ duration: 0.6, delay: 0.28 }} className="mt-7 max-w-xl text-lg leading-relaxed text-mist sm:text-xl">
              One easy form gets you one polished link to send to recruiters and add to every application.
            </motion.p>
            <motion.div {...rise} transition={{ duration: 0.6, delay: 0.38 }} className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link to="/start" className="btn-primary justify-center sm:justify-start">Start with {'$'}{deposit.amount} <Arrow /></Link>
              <Link to="/styles" className="btn-ghost justify-center sm:justify-start">See real client work</Link>
            </motion.div>
            <motion.div {...rise} transition={{ duration: 0.6, delay: 0.48 }} className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-mist">
              <span className="flex items-center gap-2"><Check /> <span className="text-mist/60 line-through">{tier.originalPriceLabel}</span> <strong className="text-frost">{tier.priceLabel}</strong> all in</span>
              <span className="flex items-center gap-2"><Check /> 3 edit rounds</span>
            </motion.div>
            <motion.div {...rise} transition={{ duration: 0.6, delay: 0.56 }} className="mt-5">
              <StripeNote />
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, x: 36, rotate: 1 }} animate={{ opacity: 1, x: 0, rotate: 0 }} transition={{ duration: 0.85, delay: 0.22 }} className="relative mx-auto w-full max-w-[38rem] lg:max-w-none">
            <div className="hero-browser">
              <div className="hero-browser-bar"><span className="flex gap-1.5"><i /><i /><i /></span><span className="hero-url">joshuacowell.com</span><span className="w-10" /></div>
              <div className="aspect-[16/10] overflow-hidden bg-ink-900">
                <img src={asset(liveSites[0]?.thumb)} alt={(liveSites[0]?.name || 'Client') + ' portfolio website preview'} className="h-full w-full object-cover object-top" />
              </div>
            </div>
            <div className="proof-note proof-note-top"><span className="proof-note-icon">✓</span><span><strong>Real client site</strong><small>Live and recruiter-ready</small></span></div>
            <div className="proof-note proof-note-bottom"><span className="proof-number">{liveSites.length}</span><span><strong>live launches</strong><small>and counting</small></span></div>
          </motion.div>
        </div>
      </section>

      <section id="work" className="home-section">
        <Reveal className="section-heading-row">
          <div className="max-w-2xl">
            <h2 className="section-title">Live right now.</h2>
          </div>
          <Link to="/styles" className="text-link shrink-0">See all work <Arrow /></Link>
        </Reveal>
        <div className="mt-9 grid gap-5 sm:grid-cols-2">
          {liveSites.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.08}><WorkCard project={project} /></Reveal>
          ))}
        </div>
      </section>

      <section className="home-section pt-8">
        <div className="founder-panel">
          <Reveal className="founder-photo-wrap">
            {site.founder.storyPhoto && <img src={asset(site.founder.storyPhoto)} alt="Josh Cowell standing with student-built rockets at Liberty University" className="h-full min-h-[28rem] w-full object-cover object-center" loading="lazy" />}
          </Reveal>
          <Reveal delay={0.12} className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
            <h2 className="font-head text-4xl leading-tight sm:text-5xl">I built the service I wished I had.</h2>
            <div className="mt-6 space-y-4 leading-relaxed text-mist">
              <p>I got tired of sending interviewers a messy mix of folders, screenshots, and project links. So I built myself one clear place that actually showed what I could do.</p>
              <p>That turned into helping other people do the same. FolioLabz is intentionally personal: you work with me from the first form through launch.</p>
            </div>
            <div className="mt-8 flex items-center gap-4 border-t hairline pt-6">
              {site.founder.showPhoto && <img src={asset(site.founder.photo)} alt="" className="h-12 w-12 rounded-full object-cover" />}
              <div><p className="font-display font-semibold">{site.founder.name}</p><p className="text-sm text-mist">{site.founder.role}</p></div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="home-section pt-4">
        <Reveal>
          <div className="resume-strip">
            <div>
              <p className="section-kicker text-white/55">Not ready for a website?</p>
              <h2 className="font-head mt-3 text-3xl text-white sm:text-4xl">Start with a stronger resume.</h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">Human-edited wording and a recruiter-ready layout.</p>
            </div>
            <div className="flex shrink-0 flex-col items-start gap-3 sm:items-end"><p className="font-head text-4xl text-white"><span className="text-2xl text-white/45 line-through">{resumeService.tiers[0].originalPriceLabel}</span> {resumeService.tiers[0].priceLabel}</p><Link to="/pricing#resume" className="btn-light">Polish my resume <Arrow /></Link></div>
          </div>
        </Reveal>
      </section>
</main>
  )
}
