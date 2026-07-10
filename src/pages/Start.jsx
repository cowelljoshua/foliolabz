import { useMemo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import Reveal from '../components/reactbits/Reveal.jsx'
import RushSwitch from '../components/RushSwitch.jsx'
import FileDrop from '../components/FileDrop.jsx'
import {
  site,
  tiers,
  deposit,
  demoStyles,
  palettes,
  brandChips,
  pageOptions,
  pageLimits,
  resumeService,
} from '../config/site.js'

const MAX_TOTAL_BYTES = 8 * 1024 * 1024 // stay under Netlify's upload ceiling
const MAX_PROJECTS = 6
const MAX_IMAGES_PER_PROJECT = 3
const PROJECTS_PAGE = 'Projects / Work'

const emptyProject = () => ({ title: '', description: '', link: '', images: [] })

const websiteSteps = ['about', 'package', 'style', 'content', 'files', 'review']
const resumeSteps = ['about', 'resume', 'review']

const stepTitles = {
  about: ['First, the basics', 'So I know who I am building for.'],
  package: ['Your package', 'Change your mind anytime before I start.'],
  style: ['Your style', 'This is the fun part.'],
  content: ['Your content', 'Rough is fine. I polish everything.'],
  files: ['Your files', 'Whatever you have. Missing something? Send it later.'],
  resume: ['Your resume', 'Attach it and tell me where you are aiming.'],
  review: ['One last look', 'This exact brief lands in my inbox.'],
}

/* ---------- tiny shared inputs ---------- */

function Field({ label, optional, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-baseline gap-2 text-sm font-medium">
        {label}
        {optional && <span className="text-xs text-mist/60">optional</span>}
      </span>
      {children}
    </label>
  )
}

function Chip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
        active ? 'border-violet bg-violet/20 text-frost' : 'border-white/15 text-mist hover:border-white/30'
      }`}
    >
      {children}
    </button>
  )
}

/* ---------- the wizard ---------- */

export default function Start() {
  const [params] = useSearchParams()
  const navigate = useNavigate()

  const paramPackage = params.get('package') || ''
  const paramIsResume = params.get('track') === 'resume' || paramPackage.startsWith('resume')
  const paramIsWebsite = !paramIsResume && (paramPackage || params.get('style'))

  const [track, setTrack] = useState(paramIsResume ? 'resume' : paramIsWebsite ? 'website' : null)
  const [stepIdx, setStepIdx] = useState(0)
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    profession: '',
    package: ['launch', 'pro'].includes(paramPackage) ? paramPackage : '',
    rush: params.get('rush') === '1',
    style: demoStyles.some((d) => d.id === params.get('style')) ? params.get('style') : '',
    palette: '',
    brands: [],
    emulate: '',
    bio: '',
    pages: [],
    socials: '',
    notes: '',
    headshot: [],
    resumeFile: [],
    logoFile: [],
    projects: [],
    resumePkg: paramPackage.startsWith('resume') ? paramPackage : 'resume-polish',
    target: '',
    wrong: '',
  })

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }))
  const toggleIn = (key, value) =>
    setForm((f) => ({
      ...f,
      [key]: f[key].includes(value) ? f[key].filter((v) => v !== value) : [...f[key], value],
    }))

  const steps = track === 'resume' ? resumeSteps : websiteSteps
  const step = steps[stepIdx]
  const tier = tiers.find((t) => t.id === form.package)
  const pageLimit = pageLimits[form.package] || pageLimits.launch

  const togglePage = (page) =>
    setForm((f) => {
      if (f.pages.includes(page)) {
        const pages = f.pages.filter((p) => p !== page)
        const projects = page === PROJECTS_PAGE ? [] : f.projects
        return { ...f, pages, projects }
      }
      if (f.pages.length >= pageLimit) return f
      const pages = [...f.pages, page]
      const projects = page === PROJECTS_PAGE && f.projects.length === 0 ? [emptyProject()] : f.projects
      return { ...f, pages, projects }
    })

  const addProject = () =>
    setForm((f) => (f.projects.length >= MAX_PROJECTS ? f : { ...f, projects: [...f.projects, emptyProject()] }))
  const removeProject = (idx) =>
    setForm((f) => ({ ...f, projects: f.projects.filter((_, i) => i !== idx) }))
  const updateProject = (idx, key, value) =>
    setForm((f) => ({
      ...f,
      projects: f.projects.map((p, i) => (i === idx ? { ...p, [key]: value } : p)),
    }))

  const wantsProjects = form.pages.includes(PROJECTS_PAGE)
  const projectImages = form.projects.flatMap((p) => p.images)
  const allFiles = [...form.headshot, ...form.resumeFile, ...form.logoFile, ...projectImages]
  const totalBytes = allFiles.reduce((s, f) => s + f.size, 0)
  const overLimit = totalBytes > MAX_TOTAL_BYTES

  const emailOk = /.+@.+\..+/.test(form.email)
  const canNext = useMemo(() => {
    if (step === 'about') return form.name.trim() && emailOk
    if (step === 'package') return !!form.package
    if (step === 'resume') return form.resumeFile.length > 0 && !overLimit
    if (step === 'files') return !overLimit
    return true
  }, [step, form, emailOk, overLimit])

  /* ---------- summary (this becomes the "one sheet" email) ---------- */

  const buildSummary = () => {
    const L = []
    L.push('FOLIOLAB CLIENT BRIEF')
    L.push('======================')
    L.push(`Name: ${form.name}`)
    L.push(`Email: ${form.email}`)
    if (form.phone) L.push(`Phone: ${form.phone}`)
    if (track === 'resume') {
      const pkg = resumeService.tiers.find((t) => t.id === form.resumePkg)
      L.push(`Service: ${pkg?.name} (${pkg?.priceLabel})`)
      if (form.target) L.push(`Aiming for: ${form.target}`)
      if (form.wrong) L.push(`What is not working: ${form.wrong}`)
      if (form.notes) L.push(`Notes: ${form.notes}`)
      L.push(`Resume attached: ${form.resumeFile[0]?.name || 'no'}`)
    } else {
      L.push(`Profession: ${form.profession || 'not given'}`)
      L.push('')
      L.push('PACKAGE')
      L.push(`Tier: ${tier?.name} (${tier?.priceLabel})`)
      L.push(`Rush: ${form.rush ? 'YES (+$75, 1 week)' : 'no, standard'}`)
      L.push(`Payment: $${deposit.amount} deposit to start, balance due at launch`)
      L.push('')
      L.push('STYLE')
      L.push(`Style pick: ${demoStyles.find((d) => d.id === form.style)?.name || 'undecided'}`)
      L.push(`Palette: ${palettes.find((p) => p.id === form.palette)?.name || 'undecided'}`)
      if (form.brands.length) L.push(`Brands they like: ${form.brands.join(', ')}`)
      if (form.emulate) L.push(`Sites to emulate: ${form.emulate}`)
      L.push('')
      L.push('CONTENT')
      if (form.pages.length) L.push(`Pages wanted (${form.pages.length}/${pageLimit}): ${form.pages.join(', ')}`)
      if (form.socials) L.push(`Links: ${form.socials}`)
      if (form.bio) L.push(`Bio: ${form.bio}`)
      if (form.notes) L.push(`Notes: ${form.notes}`)
      if (wantsProjects && form.projects.length) {
        L.push('')
        L.push('PROJECTS')
        form.projects.forEach((p, i) => {
          L.push(`${i + 1}. ${p.title || 'Untitled project'}`)
          if (p.description) L.push(`   ${p.description}`)
          if (p.link) L.push(`   Link: ${p.link}`)
          L.push(`   Images: ${p.images.length ? p.images.map((f) => f.name).join(', ') : 'none attached'}`)
        })
      }
      L.push('')
      L.push(`OTHER FILES: ${[...form.headshot, ...form.resumeFile, ...form.logoFile].length ? [...form.headshot, ...form.resumeFile, ...form.logoFile].map((f) => f.name).join(', ') : 'none attached'}`)
    }
    return L.join('\n')
  }

  /* ---------- submit ---------- */

  const submit = async () => {
    setSending(true)
    setError('')
    const fd = new FormData()
    if (track === 'resume') {
      fd.append('form-name', 'resume-intake')
      fd.append('name', form.name)
      fd.append('email', form.email)
      fd.append('phone', form.phone)
      fd.append('package', form.resumePkg)
      fd.append('target_role', form.target)
      fd.append('whats_wrong', form.wrong)
      fd.append('extra_notes', form.notes)
      if (form.resumeFile[0]) fd.append('resume_file', form.resumeFile[0])
    } else {
      fd.append('form-name', 'website-intake')
      fd.append('name', form.name)
      fd.append('email', form.email)
      fd.append('phone', form.phone)
      fd.append('profession', form.profession)
      fd.append('package', form.package)
      fd.append('rush', form.rush ? 'yes' : 'no')
      fd.append('style_pick', form.style)
      fd.append('palette', form.palette)
      fd.append('brand_inspo', form.brands.join(', '))
      fd.append('emulate_links', form.emulate)
      fd.append('bio', form.bio)
      fd.append('pages', form.pages.join(', '))
      fd.append('socials', form.socials)
      fd.append('extra_notes', form.notes)
      if (form.headshot[0]) fd.append('headshot', form.headshot[0])
      if (form.resumeFile[0]) fd.append('resume_file', form.resumeFile[0])
      if (form.logoFile[0]) fd.append('logo_file', form.logoFile[0])
      form.projects.slice(0, MAX_PROJECTS).forEach((p, i) => {
        fd.append(`project_${i + 1}_title`, p.title)
        fd.append(`project_${i + 1}_description`, p.description)
        fd.append(`project_${i + 1}_link`, p.link)
        p.images.slice(0, MAX_IMAGES_PER_PROJECT).forEach((img, j) => fd.append(`project_${i + 1}_image_${j + 1}`, img))
      })
    }
    fd.append('summary', buildSummary())

    const state = {
      track,
      packageId: track === 'resume' ? form.resumePkg : form.package,
      rush: form.rush,
      name: form.name,
    }

    try {
      const res = await fetch('/', { method: 'POST', body: fd })
      if (!res.ok) throw new Error(`Status ${res.status}`)
      navigate('/thanks', { state })
    } catch (e) {
      if (import.meta.env.DEV) {
        // No Netlify locally; treat as success so the flow can be tested.
        console.warn('DEV: simulating successful submit', e)
        navigate('/thanks', { state })
      } else {
        setError(`Something went wrong sending your form. Email me directly at ${site.email} and I will sort it out.`)
      }
    } finally {
      setSending(false)
    }
  }

  /* ---------- track picker ---------- */

  if (!track) {
    return (
      <main className="mx-auto flex min-h-[80vh] max-w-3xl flex-col justify-center px-6 pt-28 pb-16">
        <Reveal className="text-center">
          <h1 className="font-display text-4xl font-bold sm:text-5xl">What can I build for you?</h1>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          <Reveal delay={0.1}>
            <button
              onClick={() => setTrack('website')}
              className="group h-full w-full rounded-3xl border hairline bg-ink-800/70 p-8 text-left transition-all hover:-translate-y-1 hover:border-violet/60"
            >
              <span className="text-3xl">🌐</span>
              <h2 className="font-display mt-4 text-2xl font-semibold">A website</h2>
              <p className="mt-2 text-sm text-mist">Your portfolio, built and launched for you. From $300.</p>
              <p className="mt-5 text-sm font-semibold text-gradient">Let&rsquo;s go →</p>
            </button>
          </Reveal>
          <Reveal delay={0.2}>
            <button
              onClick={() => setTrack('resume')}
              className="group h-full w-full rounded-3xl border hairline bg-ink-800/70 p-8 text-left transition-all hover:-translate-y-1 hover:border-mint/60"
            >
              <span className="text-3xl">📄</span>
              <h2 className="font-display mt-4 text-2xl font-semibold">A sharper resume</h2>
              <p className="mt-2 text-sm text-mist">Polished by a human, me. From $40, money back if it is not better.</p>
              <p className="mt-5 text-sm font-semibold text-mint">Let&rsquo;s go →</p>
            </button>
          </Reveal>
        </div>
      </main>
    )
  }

  /* ---------- wizard shell ---------- */

  const [title, subtitle] = stepTitles[step]
  const progress = ((stepIdx + 1) / steps.length) * 100

  return (
    <main className="mx-auto max-w-2xl px-6 pt-32 pb-24">
      {/* progress */}
      <div className="mb-8">
        <div className="flex items-baseline justify-between">
          <p className="text-xs font-semibold uppercase tracking-wide text-mist">
            Step {stepIdx + 1} of {steps.length}
          </p>
          <button
            onClick={() => {
              setTrack(null)
              setStepIdx(0)
            }}
            className="text-xs text-mist hover:text-frost"
          >
            Switch to {track === 'resume' ? 'website' : 'resume'} instead
          </button>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-violet to-cyan"
            animate={{ width: `${progress}%` }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.25 }}
        >
          <h1 className="font-display text-3xl font-bold">{title}</h1>
          <p className="mt-1.5 text-sm text-mist">{subtitle}</p>

          <div className="mt-8 space-y-6">
            {/* ABOUT */}
            {step === 'about' && (
              <>
                <Field label="Your name">
                  <input className="field-input" value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Jordan Smith" />
                </Field>
                <Field label="Email">
                  <input className="field-input" type="email" value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="you@email.com" />
                </Field>
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="Phone" optional>
                    <input className="field-input" value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="(555) 555-5555" />
                  </Field>
                  {track === 'website' && (
                    <Field label="What do you do?" optional>
                      <input className="field-input" value={form.profession} onChange={(e) => set('profession', e.target.value)} placeholder="Nurse, engineer, photographer…" />
                    </Field>
                  )}
                </div>
              </>
            )}

            {/* PACKAGE */}
            {step === 'package' && (
              <>
                <div className="grid gap-3">
                  {tiers.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => set('package', t.id)}
                      className={`flex items-baseline justify-between rounded-2xl border p-5 text-left transition-colors ${
                        form.package === t.id ? 'border-violet bg-violet/10' : 'hairline bg-white/[0.03] hover:border-white/25'
                      }`}
                    >
                      <span>
                        <span className="font-display block font-semibold">{t.name}</span>
                        <span className="mt-0.5 block text-xs text-mist">{t.blurb}</span>
                      </span>
                      <span className="font-display shrink-0 pl-4 font-bold">{t.priceLabel}</span>
                    </button>
                  ))}
                </div>

                <div className="rounded-2xl border border-cyan/30 bg-cyan/[0.05] p-5">
                  <p className="font-display text-sm font-semibold text-frost">{deposit.label}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-mist">{deposit.detail}</p>
                </div>

                <RushSwitch on={form.rush} onChange={(v) => set('rush', v)} />
              </>
            )}

            {/* STYLE */}
            {step === 'style' && (
              <>
                <div>
                  <p className="mb-2 text-sm font-medium">Which style felt right?</p>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {demoStyles.map((d) => (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => set('style', form.style === d.id ? '' : d.id)}
                        className={`rounded-2xl border p-4 text-left transition-colors ${
                          form.style === d.id ? 'border-violet bg-violet/10' : 'hairline bg-white/[0.03] hover:border-white/25'
                        }`}
                      >
                        <span className="flex gap-1">
                          {d.swatch.map((c) => (
                            <span key={c} className="h-3 w-3 rounded-full border border-white/20" style={{ background: c }} />
                          ))}
                        </span>
                        <span className="font-display mt-2 block text-sm font-semibold">{d.name}</span>
                        <span className="block text-xs text-mist">{d.vibe}</span>
                      </button>
                    ))}
                  </div>
                  <Link to="/styles" className="mt-2 inline-block text-xs text-cyan hover:underline">
                    Need another look? Browse the styles ↗
                  </Link>
                </div>

                <div>
                  <p className="mb-2 text-sm font-medium">Colors you gravitate toward?</p>
                  <div className="flex flex-wrap gap-2.5">
                    {palettes.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => set('palette', form.palette === p.id ? '' : p.id)}
                        className={`flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-medium transition-colors ${
                          form.palette === p.id ? 'border-violet bg-violet/10 text-frost' : 'border-white/15 text-mist hover:border-white/30'
                        }`}
                      >
                        <span className="flex gap-1">
                          {p.colors.map((c) => (
                            <span key={c} className="h-3 w-3 rounded-full border border-white/20" style={{ background: c }} />
                          ))}
                        </span>
                        {p.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-sm font-medium">
                    Brands whose style you like <span className="text-xs font-normal text-mist/60">pick any</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {brandChips.map((b) => (
                      <Chip key={b} active={form.brands.includes(b)} onClick={() => toggleIn('brands', b)}>
                        {b}
                      </Chip>
                    ))}
                  </div>
                </div>

                <Field label="Any sites you want yours to feel like?" optional>
                  <input className="field-input" value={form.emulate} onChange={(e) => set('emulate', e.target.value)} placeholder="Paste links, separated by commas" />
                </Field>
              </>
            )}

            {/* CONTENT */}
            {step === 'content' && (
              <>
                <Field label="Tell me about yourself" optional>
                  <textarea
                    className="field-input min-h-28"
                    value={form.bio}
                    onChange={(e) => set('bio', e.target.value)}
                    placeholder="A few sentences. Who you are, what you do, what you are proud of. Rough notes are perfect."
                  />
                </Field>
                <div>
                  <p className="mb-2 text-sm font-medium">
                    Pages you want on the site <span className="text-xs font-normal text-mist/60">{form.pages.length}/{pageLimit} picked</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {pageOptions.map((s) => {
                      const active = form.pages.includes(s)
                      const disabled = !active && form.pages.length >= pageLimit
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => togglePage(s)}
                          disabled={disabled}
                          className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                            active
                              ? 'border-violet bg-violet/20 text-frost'
                              : disabled
                                ? 'cursor-not-allowed border-white/10 text-mist/40'
                                : 'border-white/15 text-mist hover:border-white/30'
                          }`}
                        >
                          {s}
                        </button>
                      )
                    })}
                  </div>
                  {form.pages.length >= pageLimit && (
                    <p className="mt-1.5 text-xs text-mist/60">
                      {tier?.name || 'Launch'} tops out at {pageLimit} pages. {form.package === 'launch' ? 'Go Pro for up to 7.' : ''}
                    </p>
                  )}
                </div>

                {wantsProjects && (
                  <div>
                    <p className="mb-2 text-sm font-medium">Your projects</p>
                    <div className="space-y-4">
                      {form.projects.map((p, i) => (
                        <div key={i} className="rounded-2xl border hairline bg-white/[0.03] p-4">
                          <div className="flex items-start justify-between gap-3">
                            <p className="text-xs font-semibold uppercase tracking-wide text-mist">Project {i + 1}</p>
                            {form.projects.length > 1 && (
                              <button type="button" onClick={() => removeProject(i)} className="text-xs text-mist hover:text-frost">
                                Remove
                              </button>
                            )}
                          </div>
                          <div className="mt-3 space-y-3">
                            <Field label="Title">
                              <input
                                className="field-input"
                                value={p.title}
                                onChange={(e) => updateProject(i, 'title', e.target.value)}
                                placeholder="e.g. Senior design capstone"
                              />
                            </Field>
                            <Field label="What was it?" optional>
                              <textarea
                                className="field-input min-h-20"
                                value={p.description}
                                onChange={(e) => updateProject(i, 'description', e.target.value)}
                                placeholder="What you built, your role, the result."
                              />
                            </Field>
                            <Field label="Link" optional>
                              <input
                                className="field-input"
                                value={p.link}
                                onChange={(e) => updateProject(i, 'link', e.target.value)}
                                placeholder="Live demo, GitHub, write-up…"
                              />
                            </Field>
                            <FileDrop
                              label="Photos"
                              hint={`Up to ${MAX_IMAGES_PER_PROJECT} images of this project`}
                              files={p.images}
                              onChange={(v) => updateProject(i, 'images', v)}
                              multiple
                              max={MAX_IMAGES_PER_PROJECT}
                              accept="image/*"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    {form.projects.length < MAX_PROJECTS && (
                      <button type="button" onClick={addProject} className="btn-ghost mt-3 !px-4 !py-2 text-sm">
                        + Add another project
                      </button>
                    )}
                  </div>
                )}

                <Field label="Your links" optional>
                  <input className="field-input" value={form.socials} onChange={(e) => set('socials', e.target.value)} placeholder="LinkedIn, GitHub, Instagram…" />
                </Field>
                <Field label="Anything else I should know?" optional>
                  <textarea className="field-input min-h-20" value={form.notes} onChange={(e) => set('notes', e.target.value)} placeholder="Deadlines, must-haves, things you hate…" />
                </Field>
              </>
            )}

            {/* FILES */}
            {step === 'files' && (
              <>
                <FileDrop label="Headshot" hint="A photo of you, if you want one on the site" files={form.headshot} onChange={(v) => set('headshot', v)} accept="image/*" />
                <FileDrop label="Resume" hint="PDF or Word" files={form.resumeFile} onChange={(v) => set('resumeFile', v)} accept=".pdf,.doc,.docx" />
                <FileDrop label="Logo" hint="If you have one" files={form.logoFile} onChange={(v) => set('logoFile', v)} />
                <p className={`text-xs ${overLimit ? 'font-semibold text-[#ff6b6b]' : 'text-mist/70'}`}>
                  {overLimit
                    ? `That is ${(totalBytes / 1024 / 1024).toFixed(1)} MB total. Keep it under 8 MB here and email me the rest after submitting.`
                    : 'Everything is optional. 8 MB total limit here; bigger files can be emailed later.'}
                </p>
              </>
            )}

            {/* RESUME TRACK */}
            {step === 'resume' && (
              <>
                <div className="grid gap-3 sm:grid-cols-2">
                  {resumeService.tiers.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => set('resumePkg', t.id)}
                      className={`rounded-2xl border p-5 text-left transition-colors ${
                        form.resumePkg === t.id ? 'border-mint bg-mint/10' : 'hairline bg-white/[0.03] hover:border-white/25'
                      }`}
                    >
                      <span className="font-display block font-semibold">{t.name}</span>
                      <span className="font-display mt-1 block text-2xl font-bold">{t.priceLabel}</span>
                      <span className="mt-1 block text-xs text-mist">{t.blurb}</span>
                    </button>
                  ))}
                </div>
                <FileDrop label="Your current resume" hint="PDF or Word. This one is required." files={form.resumeFile} onChange={(v) => set('resumeFile', v)} accept=".pdf,.doc,.docx" />
                <Field label="What are you aiming for?" optional>
                  <input className="field-input" value={form.target} onChange={(e) => set('target', e.target.value)} placeholder="Job title, industry, or a posting link" />
                </Field>
                <Field label="What is not working right now?" optional>
                  <textarea className="field-input min-h-20" value={form.wrong} onChange={(e) => set('wrong', e.target.value)} placeholder="No interviews? Career change? Just feels flat?" />
                </Field>
                <Field label="Anything else?" optional>
                  <textarea className="field-input min-h-16" value={form.notes} onChange={(e) => set('notes', e.target.value)} />
                </Field>
              </>
            )}

            {/* REVIEW */}
            {step === 'review' && (
              <div className="space-y-4">
                <pre className="glass overflow-x-auto whitespace-pre-wrap rounded-2xl p-6 font-body text-sm leading-relaxed text-mist">
                  {buildSummary()}
                </pre>
                <p className="text-xs text-mist/70">
                  Spot something off? Use Back to fix it. Payment comes after, nothing is charged by this form.
                </p>
                {error && <p className="rounded-xl bg-[#ff6b6b]/10 p-4 text-sm text-[#ff9b9b]">{error}</p>}
              </div>
            )}
          </div>

          {/* nav buttons */}
          <div className="mt-10 flex items-center justify-between">
            <button
              type="button"
              onClick={() => (stepIdx === 0 ? setTrack(null) : setStepIdx(stepIdx - 1))}
              className="btn-ghost !px-5 !py-2.5 text-sm"
            >
              ← Back
            </button>
            {step === 'review' ? (
              <button type="button" onClick={submit} disabled={sending || overLimit} className="btn-primary disabled:opacity-50">
                {sending ? 'Sending…' : 'Send it to me 🚀'}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => canNext && setStepIdx(stepIdx + 1)}
                disabled={!canNext}
                className="btn-primary disabled:opacity-40"
              >
                Next →
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </main>
  )
}
