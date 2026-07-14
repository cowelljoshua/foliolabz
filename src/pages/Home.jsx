import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import Reveal from '../components/reactbits/Reveal.jsx'
import MiniSite from '../components/MiniSite.jsx'
import { asset } from '../lib/asset.js'
import { site, demoStyles, resumeService, realSites, tiers, deposit, promises } from '../config/site.js'

const process = [
  ['01', 'Send me what you have', 'One guided form collects your story, projects, resume, photos, and the styles you like.'],
  ['02', 'I build the whole thing', 'I shape the message, design every page, build it for every screen, and send you a private preview.'],
  ['03', 'Review it, then go live', 'You get three rounds of changes. Once it feels right, I handle the launch and keep hosting simple.'],
]

const outcomes = [
  ['01', 'A story recruiters can follow', 'Your best work gets context, structure, and a clear point of view instead of living in scattered links.'],
  ['02', 'A design that feels like you', 'Get a site shaped around your field, work, and personality—not a one-size-fits-all template.'],
  ['03', 'One link that works everywhere', 'Applications, LinkedIn, email signatures, and networking conversations all point to one polished place.'],
  ['04', 'No website chores', 'You never touch code, hosting dashboards, or a website builder. I take care of the technical side.'],
]

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

function WorkCard({ project, index }) {
  const cardClass = ['work-card group', index === 0 ? 'lg:col-span-2' : ''].filter(Boolean).join(' ')
  const imageClass = index === 0 ? 'h-[24rem] sm:h-[32rem]' : 'h-[22rem]'

  return (
    <a href={project.url} target="_blank" rel="noreferrer" className={cardClass}>
      <div className={'work-card-image ' + imageClass}>
        <img src={asset(project.thumb)} alt={project.name + ' portfolio website'} className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-[1.025]" loading={index === 0 ? 'eager' : 'lazy'} />
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
  const featuredStyles = demoStyles.slice(0, 6)

  return (
    <main className="overflow-hidden">
      <section className="hero-shell relative">
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />
        <div className="relative mx-auto grid min-h-[47rem] max-w-7xl items-center gap-14 px-6 pb-20 pt-32 lg:grid-cols-[1.02fr_.98fr] lg:px-10 lg:pb-24 lg:pt-36">
          <div className="relative z-10 max-w-2xl">
            <motion.div {...rise} transition={{ duration: 0.55 }}><span className="eyebrow"><span className="eyebrow-dot" /> Portfolio websites, handled end-to-end</span></motion.div>
            <h1 className="font-head mt-7 text-[clamp(3.25rem,7vw,6.6rem)] leading-[0.93] tracking-[-0.045em]">
              <motion.span {...rise} transition={{ duration: 0.6, delay: 0.08 }} className="block">Get remembered</motion.span>
              <motion.span {...rise} transition={{ duration: 0.6, delay: 0.18 }} className="block text-violet">before the interview.</motion.span>
            </h1>
            <motion.p {...rise} transition={{ duration: 0.6, delay: 0.28 }} className="mt-7 max-w-xl text-lg leading-relaxed text-mist sm:text-xl">
              I turn your projects, experience, and personality into a sharp portfolio website—then I design, build, and launch it for you.
            </motion.p>
            <motion.div {...rise} transition={{ duration: 0.6, delay: 0.38 }} className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link to="/start" className="btn-primary justify-center sm:justify-start">Start with {'$'}{deposit.amount} <Arrow /></Link>
              <Link to="/styles" className="btn-ghost justify-center sm:justify-start">See real client work</Link>
            </motion.div>
            <motion.div {...rise} transition={{ duration: 0.6, delay: 0.48 }} className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-mist">
              <span className="flex items-center gap-2"><Check /> Sites from {'$'}{tiers[0].price}</span>
              <span className="flex items-center gap-2"><Check /> Ready {site.delivery.standard}</span>
              <span className="flex items-center gap-2"><Check /> 3 edit rounds</span>
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

      <section className="border-y hairline bg-white/65">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-6 sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mist">Sites already working for</p>
          <div className="flex flex-wrap gap-x-8 gap-y-3 sm:justify-end">
            {liveSites.map((project) => (
              <div key={project.id} className="flex items-center gap-2.5 text-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-mint" />
                <span className="font-semibold text-frost">{project.name}</span>
                <span className="text-mist">{project.field}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="work" className="home-section">
        <Reveal className="section-heading-row">
          <div className="max-w-2xl">
            <p className="section-kicker">Selected work</p>
            <h2 className="section-title">Proof you can click through.</h2>
            <p className="section-copy">These are real portfolio sites for real people—not concept art or a template gallery.</p>
          </div>
          <Link to="/styles" className="text-link shrink-0">View every example <Arrow /></Link>
        </Reveal>
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {liveSites.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.08} className={index === 0 ? 'lg:col-span-2' : ''}><WorkCard project={project} index={index} /></Reveal>
          ))}
        </div>
      </section>

      <section className="home-section pt-8">
        <div className="value-panel">
          <Reveal className="max-w-xl">
            <p className="section-kicker text-white/55">More than a nice-looking page</p>
            <h2 className="font-head mt-4 text-4xl leading-tight text-white sm:text-5xl">Your work, finally presented like it matters.</h2>
            <p className="mt-5 text-base leading-relaxed text-white/65 sm:text-lg">A strong portfolio makes the case for you before you enter the room. I help turn the raw material into a clear, confident first impression.</p>
            <Link to="/start" className="btn-light mt-8">Build my portfolio <Arrow /></Link>
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-2">
            {outcomes.map((item, index) => (
              <Reveal key={item[1]} delay={index * 0.06}>
                <article className="outcome-card">
                  <span className="outcome-number">{item[0]}</span>
                  <h3 className="font-display mt-10 text-lg font-semibold text-white">{item[1]}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/58">{item[2]}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="section-kicker">Straightforward pricing</p>
          <h2 className="section-title">Pick the level. I handle the rest.</h2>
          <p className="section-copy mx-auto">A {'$'}{deposit.amount} deposit reserves your build. The remaining balance is due only when your site is live and you love it.</p>
        </Reveal>
        <div className="mx-auto mt-12 grid max-w-5xl gap-5 lg:grid-cols-2">
          {tiers.map((tier, index) => (
            <Reveal key={tier.id} delay={index * 0.1}>
              <article className={'service-card ' + (tier.popular ? 'service-card-featured' : '')}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3"><h3 className="font-display text-2xl font-semibold">{tier.name}</h3>{tier.popular && <span className="popular-pill">Best value</span>}</div>
                    <p className="mt-2 text-sm text-mist">{tier.blurb}</p>
                  </div>
                  <div className="text-right"><p className="font-head text-4xl">{tier.priceLabel}</p><p className="mt-1 text-xs text-mist">one time</p></div>
                </div>
                <div className="my-7 h-px bg-frost/10" />
                <ul className="space-y-3">
                  {tier.headline.map((feature) => <li key={feature} className="flex items-center gap-2.5 text-sm text-mist"><span className="text-mint"><Check /></span>{feature}</li>)}
                </ul>
                <Link to={'/start?package=' + tier.id} className={(tier.popular ? 'btn-primary' : 'btn-ghost') + ' mt-8 w-full justify-center'}>Choose {tier.name} <Arrow /></Link>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="mx-auto mt-5 max-w-5xl">
          <div className="guarantee-bar">
            <span className="guarantee-icon">
              <svg width="25" height="25" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3 19 6v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z" stroke="currentColor" strokeWidth="1.5" /><path d="m8.5 12 2.2 2.2 4.8-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
            <div><p className="font-display font-semibold">{promises.website.title}</p><p className="mt-1 text-sm text-mist">{promises.website.short}</p></div>
          </div>
        </Reveal>
      </section>

      <section className="home-section pt-8">
        <Reveal className="max-w-2xl"><p className="section-kicker">A low-lift process</p><h2 className="section-title">You do one form. I do the website.</h2></Reveal>
        <div className="process-grid mt-12">
          {process.map((step, index) => (
            <Reveal key={step[0]} delay={index * 0.1}>
              <article className="process-card">
                <div className="flex items-center justify-between"><span className="process-number">{step[0]}</span>{index < process.length - 1 && <Arrow className="hidden text-frost/25 sm:block" />}</div>
                <h3 className="font-display mt-8 text-xl font-semibold">{step[1]}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mist">{step[2]}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="home-section pt-8">
        <div className="founder-panel">
          <Reveal className="founder-photo-wrap">
            {site.founder.storyPhoto && <img src={asset(site.founder.storyPhoto)} alt="Josh Cowell holding a rocket overhead in front of Freedom Tower at Liberty University" className="h-full min-h-[28rem] w-full object-cover" loading="lazy" />}
            <div className="founder-caption"><span className="h-2 w-2 rounded-full bg-mint" /> Built personally by Josh</div>
          </Reveal>
          <Reveal delay={0.12} className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
            <p className="section-kicker">A real person behind the work</p>
            <h2 className="font-head mt-4 text-4xl leading-tight sm:text-5xl">I built the service I wished I had.</h2>
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

      <section className="home-section pt-8">
        <Reveal className="section-heading-row">
          <div className="max-w-2xl"><p className="section-kicker">Made to feel like you</p><h2 className="section-title">Start with a direction, not a template.</h2><p className="section-copy">Choose a look you like. Your finished portfolio is then shaped around your own work and personality.</p></div>
          <Link to="/styles" className="text-link shrink-0">Explore all 10 styles <Arrow /></Link>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredStyles.map((style, index) => (
            <Reveal key={style.id} delay={Math.min(index, 3) * 0.06}>
              <Link to={'/styles/' + style.id} className="style-card group">
                <div className="h-48 overflow-hidden border-b hairline"><div className="h-full transition duration-500 group-hover:scale-[1.035]"><MiniSite swatch={style.swatch} /></div></div>
                <div className="flex items-center justify-between gap-4 p-5">
                  <div><p className="font-display font-semibold">{style.name}</p><p className="mt-1 text-xs text-mist">{style.vibe}</p></div>
                  <Arrow className="text-frost/45 transition group-hover:translate-x-1 group-hover:text-violet" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="home-section pt-4">
        <Reveal>
          <div className="resume-strip">
            <div>
              <p className="section-kicker text-white/55">Not ready for a website?</p>
              <h2 className="font-head mt-3 text-3xl text-white sm:text-4xl">Start with a stronger resume.</h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">Get sharper wording, a cleaner recruiter-friendly layout, and personal notes on every change. Edited by a human.</p>
            </div>
            <div className="flex shrink-0 flex-col items-start gap-3 sm:items-end"><p className="font-head text-4xl text-white">{resumeService.tiers[0].priceLabel}</p><Link to="/pricing#resume" className="btn-light">Polish my resume <Arrow /></Link></div>
          </div>
        </Reveal>
      </section>

      <section className="px-6 pb-8 pt-10 lg:px-10">
        <Reveal>
          <div className="final-cta">
            <p className="section-kicker text-white/55">Ready when you are</p>
            <h2 className="font-head mx-auto mt-4 max-w-4xl text-4xl leading-tight text-white sm:text-6xl">Your work deserves more than a folder full of links.</h2>
            <p className="mx-auto mt-5 max-w-xl text-white/62">Tell me what you have. I’ll turn it into one place you’ll be proud to send.</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"><Link to="/start" className="btn-accent">Start my build <Arrow /></Link><Link to="/pricing" className="btn-dark-ghost">See pricing</Link></div>
            <p className="mt-5 text-xs text-white/45">{deposit.label} · no technical setup · private preview before launch</p>
          </div>
        </Reveal>
      </section>
    </main>
  )
}
