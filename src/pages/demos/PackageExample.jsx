import { useState } from 'react'
import { Link } from 'react-router-dom'
import Aurora from '../../components/reactbits/Aurora.jsx'
import Reveal from '../../components/reactbits/Reveal.jsx'

const projects = [
  {
    title: 'Hybrid Rocket Test Stand',
    tag: 'Capstone',
    body: 'Designed and instrumented a 500 lbf thrust stand, then completed 12 successful hot-fire tests.',
    result: '12 clean tests',
    role: 'Mechanical lead',
    year: '2025',
    tools: ['SolidWorks', 'LabVIEW', 'DAQ'],
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=85',
  },
  {
    title: 'Heat Exchanger Study',
    tag: 'Research',
    body: 'Reduced simulated pressure drop by 18% through shell-side baffle optimization.',
    result: '18% lower pressure drop',
    role: 'Thermal analyst',
    year: '2024',
    tools: ['ANSYS', 'MATLAB', 'CFD'],
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1200&q=85',
  },
  {
    title: 'Six-Axis Robotic Arm',
    tag: 'Personal',
    body: 'Took a compact robotic arm from CAD through fabrication, controls, and bench testing.',
    result: '0.4 mm repeatability',
    role: 'Designer & builder',
    year: '2024',
    tools: ['Onshape', 'Python', 'Arduino'],
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=85',
  },
]

const gallery = [
  ['https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1000&q=85', 'Engineer reviewing a prototype'],
  ['https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&w=1000&q=85', 'Mechanical components on a workbench'],
  ['https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=1000&q=85', 'Industrial machinery'],
  ['https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=85', 'Engineer working at a laptop'],
  ['https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&w=1000&q=85', 'Precision manufacturing equipment'],
]

const proPages = [
  ['home', 'Home'],
  ['work', 'Work'],
  ['case-study', 'Case study'],
  ['gallery', 'Gallery'],
  ['about', 'About'],
  ['resume', 'Resume'],
  ['contact', 'Contact'],
]

function ExampleBar({ packageId }) {
  const isPro = packageId === 'pro'
  const other = isPro ? 'launch' : 'pro'
  const scope = isPro
    ? 'Seven separate pages: Home, Work, Case Study, Gallery, About, Resume, and Contact'
    : 'One focused page with four sections: Home, Work, About, and Contact'

  return (
    <div className="fixed inset-x-0 bottom-3 z-50 flex justify-center px-3 sm:bottom-4 sm:px-4">
      <div className="flex max-w-3xl flex-wrap items-center justify-center gap-2 rounded-2xl border border-white/15 bg-[#10111b]/90 px-3 py-2 text-white shadow-2xl backdrop-blur-xl sm:rounded-full sm:px-4">
        <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em]">
          {isPro ? 'Pro example' : 'Launch example'}
        </span>
        <span className="hidden text-xs text-white/60 lg:inline">{scope}</span>
        <Link to={'/examples/' + other} className="rounded-full border border-white/20 px-3 py-1.5 text-xs font-semibold transition hover:bg-white/10">
          Compare {isPro ? 'Launch' : 'Pro'}
        </Link>
        <Link to={'/start?package=' + packageId} className="rounded-full bg-[#7c5cff] px-4 py-1.5 text-xs font-bold transition hover:bg-[#8c70ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
          Choose {isPro ? 'Pro' : 'Launch'}
        </Link>
        <Link to="/pricing" className="px-2 py-1.5 text-xs text-white/60 transition hover:text-white">Back to pricing</Link>
      </div>
    </div>
  )
}

function TopNav({ packageId, proPage }) {
  const isPro = packageId === 'pro'

  if (isPro) {
    return (
      <nav className="sticky top-0 z-40 border-b border-white/10 bg-[#08080f]/90 px-4 text-white backdrop-blur-xl sm:px-6">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-5">
          <Link to="/examples/pro" className="shrink-0 text-sm font-bold uppercase tracking-[0.2em]">Mara Chen</Link>
          <div className="hidden items-center gap-4 text-xs font-semibold uppercase tracking-[0.1em] xl:flex">
            {proPages.map(([id, label]) => (
              <Link key={id} to={id === 'home' ? '/examples/pro' : '/examples/pro/' + id} className={proPage === id ? 'text-[#22d3ee]' : 'text-white/55 transition hover:text-white'}>
                {label}
              </Link>
            ))}
          </div>
          <Link to="/examples/pro/contact" className="shrink-0 rounded-full border border-[#22d3ee] px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#22d3ee] transition hover:bg-[#22d3ee] hover:text-[#08080f]">Let&apos;s talk</Link>
        </div>
        <div className="mx-auto flex max-w-7xl gap-5 overflow-x-auto pb-3 text-[11px] font-semibold uppercase tracking-[0.1em] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden xl:hidden" aria-label="Example pages">
          {proPages.map(([id, label]) => (
            <Link key={id} to={id === 'home' ? '/examples/pro' : '/examples/pro/' + id} aria-current={proPage === id ? 'page' : undefined} className={'shrink-0 border-b pb-1 transition ' + (proPage === id ? 'border-[#22d3ee] text-[#22d3ee]' : 'border-transparent text-white/55 hover:text-white')}>
              {label}
            </Link>
          ))}
        </div>
      </nav>
    )
  }

  return (
    <nav className="sticky top-0 z-40 border-b border-white/10 bg-[#08080f]/80 px-6 text-white backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-5">
        <a href="#top" className="text-sm font-bold uppercase tracking-[0.2em]">Mara Chen</a>
        <div className="hidden items-center gap-6 text-xs font-semibold uppercase tracking-[0.12em] lg:flex">
          <a href="#work" className="text-white/55 transition hover:text-white">Work</a>
          <a href="#about" className="text-white/55 transition hover:text-white">About</a>
          <a href="#contact" className="text-white/55 transition hover:text-white">Contact</a>
        </div>
        <a href="#contact" className="rounded-full border border-[#22d3ee] px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#22d3ee]">Let&apos;s talk</a>
      </div>
    </nav>
  )
}

function Hero({ isPro }) {
  const stats = isPro
    ? [['3+', 'years building'], ['12', 'hot-fire tests'], ['3', 'systems shipped']]
    : [['3+', 'years building'], ['12', 'clean tests'], ['5', 'core tools']]

  return (
    <header id="top" className="relative flex min-h-[82vh] items-center justify-center overflow-hidden px-6 py-20 text-center">
      {isPro && <Aurora />}
      {!isPro && <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(124,92,255,0.2),transparent_42%)]" />}
      <Reveal className="relative z-10 w-full max-w-5xl">
        <div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1.5 text-xs font-semibold text-emerald-200">
          <span className="h-2 w-2 rounded-full bg-emerald-300" aria-hidden="true" /> Open to aerospace roles · May 2026
        </div>
        <p className="font-display text-sm uppercase tracking-[0.3em] text-[#22d3ee]">Mechanical Engineer</p>
        <h1 className="font-display mt-4 text-6xl font-bold tracking-tight sm:text-8xl">
          Mara <span className="bg-gradient-to-r from-[#a595ff] to-[#22d3ee] bg-clip-text text-transparent">Chen</span>
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-[#b7bccd]">
          I build hardware that survives the test stand. Propulsion, thermal systems, and the data to prove it.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {isPro ? (
            <>
              <Link to="/examples/pro/work" className="rounded-full bg-gradient-to-r from-[#7c5cff] to-[#22d3ee] px-6 py-3 font-display font-semibold text-white shadow-lg">See my work</Link>
              <Link to="/examples/pro/resume" className="rounded-full border border-white/15 px-6 py-3 font-display font-semibold text-white">View resume</Link>
            </>
          ) : (
            <>
              <a href="#work" className="rounded-full bg-gradient-to-r from-[#7c5cff] to-[#22d3ee] px-6 py-3 font-display font-semibold text-white shadow-lg">See my work</a>
              <a href="#about" className="rounded-full border border-white/15 px-6 py-3 font-display font-semibold text-white transition hover:border-white/35">View experience</a>
            </>
          )}
        </div>
        <dl className="mx-auto mt-12 grid max-w-2xl grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/10 bg-black/20 px-3 py-5 backdrop-blur-sm">
          {stats.map(([value, label]) => (
            <div key={label} className="px-2">
              <dt className="text-[10px] uppercase tracking-[0.12em] text-white/45 sm:text-xs">{label}</dt>
              <dd className="mt-1 font-display text-xl font-bold text-white sm:text-2xl">{value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </header>
  )
}

function Work({ isPro }) {
  const visibleProjects = isPro ? projects : projects.slice(0, 2)
  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#22d3ee]">Selected work</p>
            <h1 className="font-display mt-3 text-4xl font-bold sm:text-5xl">Projects built to perform.</h1>
          </div>
          <p className="max-w-xl text-[#b7bccd]">
            {isPro ? 'Explore responsibilities, tools, outcomes, and a full case study—not just a gallery of final images.' : 'Two focused project stories give hiring teams the role, work, and result at a glance.'}
          </p>
        </div>
      </Reveal>
      <div className={'mt-10 grid gap-6 ' + (isPro ? 'lg:grid-cols-3' : 'md:grid-cols-2')}>
        {visibleProjects.map((project, index) => (
          <Reveal key={project.title} delay={index * 0.08}>
            <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] transition duration-300 hover:-translate-y-1 hover:border-white/20">
              <div className="relative overflow-hidden">
                <img src={project.image} alt="" loading="lazy" className={'w-full object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-100 ' + (isPro ? 'h-52' : 'h-44')} />
                <span className="absolute left-4 top-4 rounded-full bg-[#08080f]/80 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur">{project.year} · {project.tag}</span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#22d3ee]">{project.role}</p>
                <h2 className="font-display mt-2 text-xl font-semibold">{project.title}</h2>
                <p className="mt-3 text-sm leading-6 text-[#b7bccd]">{project.body}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tools.map((tool) => <span key={tool} className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-white/55">{tool}</span>)}
                </div>
                <div className="mt-auto flex items-end justify-between gap-4 border-t border-white/10 pt-5">
                  <div><p className="text-[10px] uppercase tracking-[0.14em] text-white/40">Outcome</p><p className="mt-1 text-sm font-semibold text-white">{project.result}</p></div>
                  {isPro && <Link to="/examples/pro/case-study" aria-label={'Read the ' + project.title + ' case study'} className="shrink-0 text-sm font-semibold text-[#a595ff] transition hover:text-white">Case study &rarr;</Link>}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function About({ isPro }) {
  const details = isPro
    ? [['Education', 'B.S. Mechanical Engineering · 2026'], ['Focus', 'Propulsion, thermal systems, test'], ['Currently', 'Propulsion Lead · Rocketry Lab']]
    : [['Education', 'B.S. Mechanical Engineering · 2026'], ['Focus', 'Propulsion & test engineering']]

  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-24">
      <div className="grid overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] lg:grid-cols-[.9fr_1.1fr]">
        <div className="relative min-h-[360px]">
          <img src="https://images.unsplash.com/photo-1581092919535-7146ff1a590b?auto=format&fit=crop&w=1400&q=85" alt="Mara working beside engineering equipment" loading="lazy" className="h-full w-full object-cover" />
          <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/15 bg-[#08080f]/80 p-4 backdrop-blur">
            <p className="text-sm font-semibold">“Make the next decision obvious.”</p>
            <p className="mt-1 text-xs text-white/50">Mara&apos;s approach to test engineering</p>
          </div>
        </div>
        <Reveal className="flex flex-col justify-center p-8 sm:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#22d3ee]">About me</p>
          <h1 className="font-display mt-4 text-4xl font-semibold">From first sketch to clean test data.</h1>
          <p className="mt-5 leading-7 text-[#b7bccd]">I care about the complete engineering loop: define the risk, build the hardware, instrument it properly, and use the data to make the next decision obvious.</p>
          <dl className={'mt-8 grid gap-3 ' + (isPro ? 'sm:grid-cols-3' : 'sm:grid-cols-2')}>
            {details.map(([label, value]) => <div key={label} className="rounded-2xl border border-white/10 bg-black/15 p-4"><dt className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#22d3ee]">{label}</dt><dd className="mt-2 text-sm leading-5 text-white/75">{value}</dd></div>)}
          </dl>
          <div className="mt-7 flex flex-wrap gap-2">
            {['SolidWorks', 'ANSYS', 'MATLAB', 'Python', 'LabVIEW', ...(isPro ? ['GD&T', 'DFM', 'Test planning'] : [])].map((skill) => <span key={skill} className="rounded-full border border-white/10 px-3 py-1.5 text-sm text-white/65">{skill}</span>)}
          </div>
          {isPro && <Link to="/examples/pro/resume" className="mt-8 inline-flex w-fit text-sm font-semibold text-[#a595ff] transition hover:text-white">See full experience &rarr;</Link>}
        </Reveal>
      </div>
    </section>
  )
}

function CaseStudy() {
  const stats = [['12', 'hot-fire tests'], ['0', 'test anomalies'], ['500', 'lbf thrust'], ['8 wks', 'build cycle']]
  const phases = [
    ['01', 'Define', 'Translated safety constraints and team goals into measurable load, access, and instrumentation requirements.'],
    ['02', 'Design', 'Modeled the structure, reviewed failure modes, and designed modular interfaces for fast fixture changes.'],
    ['03', 'Validate', 'Calibrated each sensor channel, ran dry rehearsals, and increased test energy in controlled steps.'],
  ]

  return (
    <section className="mx-auto max-w-6xl px-6 pb-40 pt-20">
      <Reveal>
        <Link to="/examples/pro/work" className="text-xs font-bold uppercase tracking-[0.18em] text-white/45 transition hover:text-white">&larr; All work</Link>
      </Reveal>
      <Reveal className="mt-8 rounded-[2rem] border border-[#7c5cff]/35 bg-gradient-to-br from-[#7c5cff]/15 to-[#22d3ee]/5 p-8 sm:p-12">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#22d3ee]">Featured case study · Propulsion</p>
        <div className="mt-4 grid gap-10 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
          <div>
            <h1 className="font-display text-4xl font-bold sm:text-6xl">A safer test stand, built from the ground up.</h1>
            <p className="mt-5 max-w-2xl leading-7 text-[#b7bccd]">I led the mechanical design and instrumentation plan for a student hybrid-rocket test stand—turning a rough test need into reliable hardware and decision-ready data.</p>
            <div className="mt-7 flex flex-wrap gap-2 text-xs text-white/60">
              {['Role: Mechanical lead', 'Timeline: 8 weeks', 'Team: 5 engineers'].map((item) => <span key={item} className="rounded-full border border-white/10 px-3 py-1.5">{item}</span>)}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {stats.map(([value, label]) => (
              <div key={label} className="rounded-2xl border border-white/5 bg-black/20 p-4">
                <p className="text-2xl font-bold text-[#22d3ee]">{value}</p>
                <p className="mt-1 text-xs text-white/55">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal className="mt-8 overflow-hidden rounded-[2rem] border border-white/10">
        <img src={projects[0].image} alt="Rocket test equipment prepared inside an engineering lab" className="h-[260px] w-full object-cover sm:h-[440px]" />
      </Reveal>

      <div className="mx-auto mt-16 max-w-4xl">
        <Reveal className="grid gap-6 border-b border-white/10 pb-12 md:grid-cols-[.4fr_1fr]">
          <h2 className="font-display text-2xl font-semibold text-white">The challenge</h2>
          <div className="space-y-4 leading-7 text-[#b7bccd]">
            <p>The team needed repeatable thrust data without rebuilding the fixture between motor iterations. The stand also had to keep operators clear of the test article and make pre-fire checks easy to verify.</p>
            <p><strong className="text-white">My constraint:</strong> design within an existing cell, a student budget, and an eight-week build window.</p>
          </div>
        </Reveal>
        <div className="py-14">
          <Reveal><p className="text-xs font-bold uppercase tracking-[0.24em] text-[#22d3ee]">Design process</p><h2 className="font-display mt-3 text-3xl font-semibold">Reduce uncertainty in stages.</h2></Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {phases.map(([number, title, body], index) => <Reveal key={title} delay={index * 0.06} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"><p className="text-xs font-bold text-[#22d3ee]">{number}</p><h3 className="font-display mt-5 text-xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-[#b7bccd]">{body}</p></Reveal>)}
          </div>
        </div>
        <Reveal className="grid gap-6 border-y border-white/10 py-12 md:grid-cols-[.4fr_1fr]">
          <h2 className="font-display text-2xl font-semibold text-white">Key decision</h2>
          <div className="leading-7 text-[#b7bccd]">
            <p>I chose a modular load path over a lighter welded assembly. The small mass penalty bought faster motor swaps, easier inspection, and a reusable platform for the next team.</p>
            <p className="mt-5 border-l-2 border-[#22d3ee] pl-5 text-white">The best design was not the lightest stand—it was the stand the team could operate consistently.</p>
          </div>
        </Reveal>
        <Reveal className="mt-14 rounded-3xl border border-emerald-300/20 bg-emerald-300/[0.07] p-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-200">Outcome</p>
          <h2 className="font-display mt-3 text-3xl font-semibold">Twelve clean tests and a reusable data trail.</h2>
          <p className="mt-4 max-w-3xl leading-7 text-[#b7bccd]">The completed stand supported the full campaign without a test anomaly. More importantly, its documented calibration and checklists gave the next propulsion team a trusted baseline instead of another ground-up rebuild.</p>
        </Reveal>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4">
          <Link to="/examples/pro/gallery" className="font-semibold text-[#a595ff] transition hover:text-white">See the build gallery &rarr;</Link>
          <Link to="/examples/pro/contact" className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold transition hover:border-white/35">Discuss this project</Link>
        </div>
      </div>
    </section>
  )
}

function Gallery() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <Reveal>
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#22d3ee]">Process gallery</p>
        <h1 className="font-display mt-3 text-4xl font-bold">The work behind the result.</h1>
        <p className="mt-4 max-w-2xl text-[#b7bccd]">A dedicated gallery makes it possible to show the process, not only the finished project.</p>
      </Reveal>
      <div className="mt-9 grid auto-rows-[180px] grid-cols-2 gap-4 md:grid-cols-4">
        {gallery.map(([src, alt], index) => (
          <Reveal key={src} delay={index * 0.05} className={index === 0 ? 'col-span-2 row-span-2' : index === 3 ? 'col-span-2' : ''}>
            <img src={src} alt={alt} loading="lazy" className="h-full w-full rounded-2xl object-cover opacity-85 transition duration-500 hover:opacity-100" />
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Resume() {
  const experience = [
    ['2025 to Present', 'Propulsion Lead', 'University Rocketry Lab', 'Lead a five-person subteam through test planning, fixture design, and a 12-fire validation campaign.'],
    ['2024', 'Research Assistant', 'Thermal Systems Group', 'Built and validated heat-exchanger models; reduced simulated shell-side pressure drop by 18%.'],
    ['2023', 'Mechanical Engineering Intern', 'Northstar Robotics', 'Designed manufacturing fixtures and released production drawings using GD&T and tolerance stacks.'],
  ]

  return (
    <section className="mx-auto max-w-6xl px-6 pb-40 pt-20">
      <Reveal className="flex flex-wrap items-end justify-between gap-6">
        <div><p className="text-xs font-bold uppercase tracking-[0.24em] text-[#22d3ee]">Resume</p><h1 className="font-display mt-3 text-4xl font-bold sm:text-5xl">Experience built around real systems.</h1></div>
        <a href="mailto:mara.chen@example.com?subject=Resume%20request" className="rounded-full bg-[#22d3ee] px-5 py-3 text-sm font-bold text-[#08080f] transition hover:bg-white">Request PDF resume</a>
      </Reveal>
      <div className="mt-10 grid gap-6 lg:grid-cols-[1.35fr_.65fr]">
        <Reveal className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 sm:p-9">
          <h2 className="font-display text-2xl font-semibold">Experience</h2>
          <div className="mt-8 space-y-9">
            {experience.map(([dates, role, company, detail]) => (
              <div key={role} className="grid gap-3 border-l border-[#22d3ee]/40 pl-5 sm:grid-cols-[140px_1fr]">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#22d3ee]">{dates}</p>
                <div><h3 className="font-display text-lg font-semibold">{role}</h3><p className="mt-1 text-sm text-white/55">{company}</p><p className="mt-3 text-sm leading-6 text-[#b7bccd]">{detail}</p></div>
              </div>
            ))}
          </div>
        </Reveal>
        <div className="space-y-6">
          <Reveal className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
            <h2 className="font-display text-xl font-semibold">Education</h2>
            <p className="mt-5 font-semibold">B.S. Mechanical Engineering</p><p className="mt-1 text-sm text-[#b7bccd]">Cascadia Institute of Technology · 2026</p><p className="mt-3 text-xs text-white/45">GPA 3.8 · Aerospace concentration</p>
          </Reveal>
          <Reveal className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
            <h2 className="font-display text-xl font-semibold">Core skills</h2>
            <div className="mt-5 flex flex-wrap gap-2">{['SolidWorks', 'ANSYS', 'MATLAB', 'Python', 'GD&T', 'DFM', 'LabVIEW', 'Test planning'].map((skill) => <span key={skill} className="rounded-full border border-white/10 px-3 py-1.5 text-sm text-white/65">{skill}</span>)}</div>
          </Reveal>
          <Reveal className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
            <h2 className="font-display text-xl font-semibold">Recognition</h2>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-[#b7bccd]"><li>NASA L&apos;SPACE Mission Concept Academy</li><li>ASME Student Design Award · Finalist</li><li>OSHA 10-Hour General Industry</li></ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Contact({ isPro }) {
  const [sent, setSent] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    setSent(true)
  }

  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 pb-40 pt-24">
      <Reveal className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.07] to-[#7c5cff]/10 p-8 text-center sm:p-12">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#22d3ee]">Get in touch</p>
        <h1 className="font-display mt-4 text-4xl font-bold sm:text-5xl">Let&apos;s build something that flies.</h1>
        <p className="mx-auto mt-4 max-w-xl text-[#b7bccd]">Have a role, research problem, or ambitious hardware project in mind? I&apos;d love to hear about it.</p>
        {isPro ? (
          sent ? (
            <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-6" role="status">
              <p className="font-display text-xl font-semibold text-emerald-200">Message ready to send.</p>
              <p className="mt-2 text-sm text-white/60">On a real client site, this connects to the owner&apos;s inbox. This example keeps your message private.</p>
              <button type="button" onClick={() => setSent(false)} className="mt-4 text-sm font-semibold text-white underline underline-offset-4">Try the form again</button>
            </div>
          ) : (
            <form className="mx-auto mt-8 grid max-w-2xl gap-4 text-left sm:grid-cols-2" onSubmit={handleSubmit}>
              <label className="text-xs font-semibold text-white/60">Name<input required autoComplete="name" placeholder="Your name" className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-white/25 focus:border-[#22d3ee]" /></label>
              <label className="text-xs font-semibold text-white/60">Email<input required type="email" autoComplete="email" placeholder="you@company.com" className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-white/25 focus:border-[#22d3ee]" /></label>
              <label className="text-xs font-semibold text-white/60 sm:col-span-2">Message<textarea required rows="4" placeholder="Tell me a little about the opportunity..." className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-white/25 focus:border-[#22d3ee]" /></label>
              <button className="rounded-full bg-[#22d3ee] px-6 py-3 font-bold text-[#08080f] transition hover:bg-white sm:col-span-2">Send message</button>
            </form>
          )
        ) : (
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="mailto:mara.chen@example.com" className="rounded-full bg-[#22d3ee] px-6 py-3 font-bold text-[#08080f] transition hover:bg-white">Email Mara</a>
            <a href="#work" className="rounded-full border border-white/15 px-6 py-3 font-semibold transition hover:border-white/35">Review selected work</a>
          </div>
        )}
        <div className="mt-9 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-white/45">
          <span>Seattle, WA</span><span>Replies within 2 business days</span><span>Open to relocation</span>
        </div>
        <p className="mt-8 text-xs text-[#b7bccd]/55">Package example with fictional content. Your site is designed around your own work and goals.</p>
      </Reveal>
    </section>
  )
}

function ProHome() {
  const specialties = [
    ['01', 'Mechanical design', 'CAD, GD&T, tolerance analysis, and design for manufacturing.'],
    ['02', 'Test engineering', 'Instrumentation, procedures, data acquisition, and safe iteration.'],
    ['03', 'Technical analysis', 'Thermal models and clear decisions grounded in measured results.'],
  ]

  return (
    <>
      <Hero isPro />
      <section className="border-y border-white/10 bg-white/[0.025]">
        <div className="mx-auto grid max-w-6xl gap-px px-6 py-7 text-center sm:grid-cols-3">
          {['Propulsion systems', 'Design for test', 'Hardware + data'].map((item) => <p key={item} className="py-2 text-xs font-bold uppercase tracking-[0.2em] text-white/55">{item}</p>)}
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal className="grid overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] lg:grid-cols-2">
          <img src={projects[0].image} alt="Rocket test equipment in an engineering lab" className="h-full min-h-[360px] w-full object-cover" />
          <div className="flex flex-col justify-center p-8 sm:p-12">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#22d3ee]">Featured case study · 8 min read</p>
            <h2 className="font-display mt-4 text-4xl font-semibold">A safer test stand, built from the ground up.</h2>
            <p className="mt-5 leading-7 text-[#b7bccd]">See the requirements, tradeoffs, build process, instrumentation plan, and results behind twelve successful hot-fire tests.</p>
            <div className="mt-6 flex gap-6">
              <div><p className="text-2xl font-bold text-white">500 lbf</p><p className="text-xs text-white/45">design load</p></div>
              <div><p className="text-2xl font-bold text-white">0</p><p className="text-xs text-white/45">test anomalies</p></div>
            </div>
            <Link to="/examples/pro/case-study" className="mt-8 inline-flex w-fit rounded-full bg-white px-5 py-3 text-sm font-bold text-[#08080f] transition hover:bg-[#22d3ee]">Explore the case study</Link>
          </div>
        </Reveal>
      </section>
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#22d3ee]">What I bring</p>
          <h2 className="font-display mt-3 text-4xl font-bold">Engineering across the full loop.</h2>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {specialties.map(([number, title, body], index) => (
            <Reveal key={title} delay={index * 0.06} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <p className="text-sm font-bold text-[#22d3ee]">{number}</p><h3 className="font-display mt-8 text-xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-[#b7bccd]">{body}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-4xl px-6 pb-40 text-center">
        <Reveal>
          <p className="text-5xl text-[#7c5cff]">&ldquo;</p>
          <blockquote className="font-display text-2xl leading-relaxed sm:text-3xl">Mara brings structure to ambiguous engineering problems and communicates her decisions with unusual clarity.</blockquote>
          <p className="mt-5 text-sm text-[#b7bccd]">Dr. Elena Ruiz · Capstone Advisor</p>
          <Link to="/examples/pro/contact" className="mt-8 inline-flex rounded-full border border-white/15 px-5 py-3 text-sm font-semibold transition hover:border-white/35">Start a conversation</Link>
        </Reveal>
      </section>
    </>
  )
}

function ProContent({ page }) {
  if (page === 'work') return <Work isPro />
  if (page === 'case-study') return <CaseStudy />
  if (page === 'gallery') return <Gallery />
  if (page === 'about') return <About isPro />
  if (page === 'resume') return <Resume />
  if (page === 'contact') return <Contact isPro />
  return <ProHome />
}

export default function PackageExample({ packageId, proPage = 'home' }) {
  const isPro = packageId === 'pro'

  if (isPro) {
    return (
      <div className="min-h-screen bg-[#08080f] font-body text-[#eef0f8]">
        <TopNav packageId="pro" proPage={proPage} />
        <ProContent page={proPage} />
        <ExampleBar packageId="pro" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#08080f] font-body text-[#eef0f8]">
      <TopNav packageId="launch" />
      <Hero isPro={false} />
      <Work isPro={false} />
      <About isPro={false} />
      <Contact isPro={false} />
      <ExampleBar packageId="launch" />
    </div>
  )
}