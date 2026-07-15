import { Link } from 'react-router-dom'
import Aurora from '../../components/reactbits/Aurora.jsx'
import Reveal from '../../components/reactbits/Reveal.jsx'

const projects = [
  {
    title: 'Hybrid Rocket Test Stand',
    tag: 'Capstone',
    body: 'Designed and instrumented a 500 lbf thrust stand, then completed 12 successful hot-fire tests.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=85',
  },
  {
    title: 'Heat Exchanger Study',
    tag: 'Research',
    body: 'Reduced simulated pressure drop by 18% through shell-side baffle optimization.',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1200&q=85',
  },
  {
    title: 'Six-Axis Robotic Arm',
    tag: 'Personal',
    body: 'Took a compact robotic arm from CAD through fabrication, controls, and bench testing.',
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
    : 'Four focused pages: Home, Work, About, and Contact'

  return (
    <div className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4">
      <div className="flex max-w-3xl flex-wrap items-center justify-center gap-2 rounded-2xl border border-white/15 bg-[#10111b]/90 px-3 py-2 text-white shadow-2xl backdrop-blur-xl sm:rounded-full sm:px-4">
        <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em]">
          {isPro ? 'Pro example' : 'Launch example'}
        </span>
        <span className="hidden text-xs text-white/60 lg:inline">{scope}</span>
        <Link to={'/examples/' + other} className="rounded-full border border-white/20 px-3 py-1.5 text-xs font-semibold transition hover:bg-white/10">
          Compare {isPro ? 'Launch' : 'Pro'}
        </Link>
        <Link to={'/start?package=' + packageId} className="rounded-full bg-[#7c5cff] px-4 py-1.5 text-xs font-bold transition hover:bg-[#8c70ff]">
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
      <nav className="sticky top-0 z-40 border-b border-white/10 bg-[#08080f]/80 px-6 text-white backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-5">
          <Link to="/examples/pro" className="text-sm font-bold uppercase tracking-[0.2em]">Mara Chen</Link>
          <div className="hidden items-center gap-4 text-xs font-semibold uppercase tracking-[0.1em] xl:flex">
            {proPages.map(([id, label]) => (
              <Link key={id} to={id === 'home' ? '/examples/pro' : '/examples/pro/' + id} className={proPage === id ? 'text-[#22d3ee]' : 'text-white/55 transition hover:text-white'}>
                {label}
              </Link>
            ))}
          </div>
          <Link to="/examples/pro/contact" className="rounded-full border border-[#22d3ee] px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#22d3ee]">Let&apos;s talk</Link>
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
  return (
    <header id="top" className="relative flex min-h-[78vh] items-center justify-center overflow-hidden px-6 text-center">
      {isPro && <Aurora />}
      {!isPro && <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(124,92,255,0.2),transparent_42%)]" />}
      <Reveal className="relative z-10">
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
              <a href="#contact" className="rounded-full border border-white/15 px-6 py-3 font-display font-semibold text-white">Download resume</a>
            </>
          )}
        </div>
      </Reveal>
    </header>
  )
}

function Work({ isPro }) {
  const visibleProjects = isPro ? projects : projects.slice(0, 2)
  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-20">
      <Reveal>
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#22d3ee]">Selected work</p>
        <h2 className="font-display mt-3 text-4xl font-bold">Projects built to perform.</h2>
        <p className="mt-3 max-w-2xl text-[#b7bccd]">
          {isPro ? 'Rich project previews lead into detailed case studies, process photos, and measurable outcomes.' : 'A clear projects page gives recruiters the essentials at a glance.'}
        </p>
      </Reveal>
      <div className={'mt-9 grid gap-5 ' + (isPro ? 'lg:grid-cols-3' : 'md:grid-cols-2')}>
        {visibleProjects.map((project, index) => (
          <Reveal key={project.title} delay={index * 0.08}>
            <article className="group h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04]">
              {isPro ? (
                <img src={project.image} alt="" className="h-52 w-full object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-100" />
              ) : (
                <div className="h-24 bg-gradient-to-br from-[#7c5cff] via-[#5365c9] to-[#22d3ee] opacity-80" />
              )}
              <div className="p-6">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#22d3ee]">{project.tag}</p>
                <h3 className="font-display mt-2 text-xl font-semibold">{project.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#b7bccd]">{project.body}</p>
                {isPro && <Link to="/examples/pro/case-study" className="mt-5 inline-flex text-sm font-semibold text-[#a595ff]">Read the case study &rarr;</Link>}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function About({ isPro }) {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-20">
      <div className="grid overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] lg:grid-cols-2">
        <div className="min-h-[340px]">
          <img src="https://images.unsplash.com/photo-1581092919535-7146ff1a590b?auto=format&fit=crop&w=1400&q=85" alt="Engineer in a workshop" className="h-full w-full object-cover" />
        </div>
        <Reveal className="flex flex-col justify-center p-8 sm:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#22d3ee]">About me</p>
          <h2 className="font-display mt-4 text-4xl font-semibold">From first sketch to clean test data.</h2>
          <p className="mt-5 leading-7 text-[#b7bccd]">I care about the complete engineering loop: define the risk, build the hardware, instrument it properly, and use the data to make the next decision obvious.</p>
          <div className="mt-7 flex flex-wrap gap-2">
            {['SolidWorks', 'ANSYS', 'MATLAB', 'Python', 'LabVIEW'].map((skill) => <span key={skill} className="rounded-full border border-white/10 px-3 py-1.5 text-sm text-white/65">{skill}</span>)}
          </div>
          {isPro && <p className="mt-7 border-l-2 border-[#7c5cff] pl-4 text-sm italic text-white/70">Pro creates room for a fuller story, expanded skills, and more personality throughout the site.</p>}
        </Reveal>
      </div>
    </section>
  )
}

function CaseStudy() {
  const stats = [['12', 'hot-fire tests'], ['0', 'test anomalies'], ['500', 'lbf thrust'], ['8 wks', 'build cycle']]

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <Reveal className="rounded-[2rem] border border-[#7c5cff]/35 bg-gradient-to-br from-[#7c5cff]/15 to-[#22d3ee]/5 p-8 sm:p-12">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#22d3ee]">Featured case study</p>
        <div className="mt-4 grid gap-10 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
          <div>
            <h1 className="font-display text-4xl font-bold sm:text-5xl">A safer test stand, built from the ground up.</h1>
            <p className="mt-5 max-w-2xl leading-7 text-[#b7bccd]">The full case study walks through the challenge, Mara&apos;s role, design decisions, testing process, and final outcome. It gives hiring teams the context a project card cannot.</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {stats.map(([value, label]) => (
              <div key={label} className="rounded-2xl bg-black/20 p-4">
                <p className="text-2xl font-bold text-[#22d3ee]">{value}</p>
                <p className="mt-1 text-xs text-white/55">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
      <div className="mx-auto mt-12 max-w-3xl space-y-8 text-[#b7bccd]">
        <Reveal><h2 className="font-display text-2xl font-semibold text-white">The challenge</h2><p className="mt-3 leading-7">Build a reliable, instrumented test stand that could safely support a fast iteration cycle for a student hybrid rocket program.</p></Reveal>
        <Reveal><h2 className="font-display text-2xl font-semibold text-white">The approach</h2><p className="mt-3 leading-7">Mara led the fixture design, selected the data acquisition equipment, and wrote a test plan before fabrication began. Each hot fire added a small amount of confidence to the next design decision.</p></Reveal>
        <Reveal><h2 className="font-display text-2xl font-semibold text-white">The outcome</h2><p className="mt-3 leading-7">The completed stand supported 12 clean tests and created a clear data trail for the team&apos;s next propulsion iteration.</p></Reveal>
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
    ['2025 to Present', 'Propulsion Lead', 'University Rocketry Lab'],
    ['2024', 'Research Assistant', 'Thermal Systems Group'],
    ['2023', 'Mechanical Engineering Intern', 'Northstar Robotics'],
  ]

  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <Reveal>
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#22d3ee]">Resume</p>
        <h1 className="font-display mt-3 text-4xl font-bold">Experience built around real systems.</h1>
      </Reveal>
      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_.7fr]">
        <Reveal className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
          <h2 className="font-display text-2xl font-semibold">Experience</h2>
          <div className="mt-7 space-y-7">
            {experience.map(([dates, role, company]) => (
              <div key={role} className="border-l border-[#22d3ee]/40 pl-5">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#22d3ee]">{dates}</p>
                <p className="mt-2 font-display text-lg font-semibold">{role}</p>
                <p className="mt-1 text-sm text-[#b7bccd]">{company}</p>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
          <h2 className="font-display text-2xl font-semibold">Core skills</h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {['SolidWorks', 'ANSYS', 'MATLAB', 'Python', 'GD&T', 'DFM', 'LabVIEW', 'Test planning'].map((skill) => <span key={skill} className="rounded-full border border-white/10 px-3 py-1.5 text-sm text-white/65">{skill}</span>)}
          </div>
          <button className="mt-9 rounded-full bg-[#22d3ee] px-5 py-3 text-sm font-bold text-[#08080f]">Download PDF resume</button>
        </Reveal>
      </div>
    </section>
  )
}

function Contact({ isPro }) {
  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 pb-40 pt-20">
      <Reveal className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 text-center sm:p-12">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#22d3ee]">Get in touch</p>
        <h1 className="font-display mt-4 text-4xl font-bold">Let&apos;s build something that flies.</h1>
        {isPro ? (
          <form className="mx-auto mt-8 grid max-w-2xl gap-4 text-left sm:grid-cols-2" onSubmit={(event) => event.preventDefault()}>
            <label className="text-xs font-semibold text-white/60">Name<input className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-[#22d3ee]" /></label>
            <label className="text-xs font-semibold text-white/60">Email<input type="email" className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-[#22d3ee]" /></label>
            <label className="text-xs font-semibold text-white/60 sm:col-span-2">Message<textarea rows="4" className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-[#22d3ee]" /></label>
            <button className="rounded-full bg-[#22d3ee] px-6 py-3 font-bold text-[#08080f] sm:col-span-2">Send message</button>
          </form>
        ) : (
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="mailto:mara.chen@example.com" className="rounded-full bg-[#22d3ee] px-6 py-3 font-bold text-[#08080f]">Email Mara</a>
            <a href="#top" className="rounded-full border border-white/15 px-6 py-3 font-semibold">Download resume</a>
          </div>
        )}
        <p className="mt-10 text-xs text-[#b7bccd]/55">Package example with fictional content. Your site is designed around your own work and goals.</p>
      </Reveal>
    </section>
  )
}

function ProHome() {
  return (
    <>
      <Hero isPro />
      <section className="mx-auto max-w-6xl px-6 py-20">
        <Reveal className="grid overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] lg:grid-cols-2">
          <img src={projects[0].image} alt="Engineer working in a testing lab" className="h-full min-h-[320px] w-full object-cover" />
          <div className="flex flex-col justify-center p-8 sm:p-12">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#22d3ee]">Featured work</p>
            <h2 className="font-display mt-4 text-4xl font-semibold">A portfolio with room for the whole story.</h2>
            <p className="mt-5 leading-7 text-[#b7bccd]">This seven-page example shows how Pro turns individual projects into a stronger, easier-to-explore body of work.</p>
            <Link to="/examples/pro/case-study" className="mt-7 inline-flex w-fit rounded-full bg-white px-5 py-3 text-sm font-bold text-[#08080f]">Explore the case study</Link>
          </div>
        </Reveal>
      </section>
      <section className="mx-auto max-w-4xl px-6 pb-40 text-center">
        <Reveal>
          <p className="text-5xl text-[#7c5cff]">&ldquo;</p>
          <blockquote className="font-display text-2xl leading-relaxed sm:text-3xl">Mara brings structure to ambiguous engineering problems and communicates her decisions with unusual clarity.</blockquote>
          <p className="mt-5 text-sm text-[#b7bccd]">Dr. Elena Ruiz, Capstone Advisor</p>
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