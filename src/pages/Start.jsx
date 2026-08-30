import { useCallback, useMemo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import Reveal from '../components/reactbits/Reveal.jsx'
import CloudinaryUpload from '../components/CloudinaryUpload.jsx'
import UploadGate from '../components/UploadGate.jsx'
import StripeNote from '../components/StripeNote.jsx'
import {
  site,
  tier,
  deposit,
  portfolioPalettes,
  brandChips,
  pageOptions,
  projectLimit,
  resumeService,
  promises,
  hosting,
} from '../config/site.js'

// The single resume option, offered as an add-on on the website track.
const resumeTier = resumeService.tiers[0]

// Write-in choice for anything not in pageOptions.
const OTHER_PAGE = 'Other'

const MAX_UPLOADS = 55
const MAX_PROJECTS = 10
const MAX_IMAGES_PER_PROJECT = 5
const PROJECTS_PAGE = 'Projects / Work'

const makeSessionId = () =>
  globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}-${Math.random().toString(16).slice(2)}`

const assetLine = (asset) => `${asset.name}: ${asset.url}`

const emptyProject = () => ({ title: '', description: '', link: '', images: [] })

const websiteSteps = ['about', 'package', 'style', 'content', 'files', 'review']
const resumeSteps = ['about', 'resume', 'review']

const siteFormats = [
  {
    id: 'single',
    name: 'One scrolling page',
    detail: 'Everything flows on one page. Menu links jump to each section.',
  },
  {
    id: 'multi',
    name: 'Separate pages',
    detail: 'A navigation bar opens distinct pages like Work, Resume, and Contact.',
  },
  {
    id: 'recommend',
    name: 'Recommend what fits',
    detail: 'I will choose based on how much content you send.',
  },
]

const domainInterestOptions = [
  { id: 'yes', label: 'Yes, I would like one' },
  { id: 'maybe', label: 'Maybe, tell me more later' },
  { id: 'no', label: 'No, the free address is fine' },
]

const cleanNetlifyName = (value) => value
  .toLowerCase()
  .replace(/^https?:\/\//, '')
  .replace(/\.netlify\.app.*$/, '')
  .replace(/[^a-z0-9-]/g, '-')
  .replace(/-{2,}/g, '-')
  .replace(/^-|-$/g, '')

const stepTitles = {
  about: ['First, the basics', 'So I know who I am building for.'],
  package: ['What you get', 'One package, one price, everything included.'],
  style: ['Your palette', 'Choose the colors that feel like you.'],
  content: ['Your content', ''],
  files: ['Your files', ''],
  resume: ['Your resume', 'Attach it and tell me where you are aiming.'],
  review: ['One last look', 'Here is what comes to me. Payment happens after, never in this form.'],
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
        active ? 'border-violet bg-violet/20 text-frost' : 'border-frost/20 text-mist hover:border-frost/40'
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
  const paramCareer = (params.get('career') || '').trim()
  const paramIsWebsite = !paramIsResume && (paramPackage || params.get('style') || paramCareer)

  const [track, setTrack] = useState(paramIsResume ? 'resume' : paramIsWebsite ? 'website' : null)
  const [stepIdx, setStepIdx] = useState(0)
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)
  const [uploadSession] = useState(makeSessionId)
  const [uploadAuthorization, setUploadAuthorization] = useState(null)
  const [uploadingKeys, setUploadingKeys] = useState(() => new Set())

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    profession: paramCareer,
    // There is only one website package now, so it is always selected.
    package: tier.id,
    styles: portfolioPalettes.some((d) => d.id === params.get('style')) ? [params.get('style')] : [],
    styleNotes: '',
    brands: [],
    emulate: '',
    bio: '',
    siteFormat: 'multi',
    pages: [],
    otherPages: '',
    addResume: false,
    domainInterest: '',
    netlifyChoices: ['', '', ''],
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

  const togglePage = (page) =>
    setForm((f) => {
      if (f.pages.includes(page)) {
        const pages = f.pages.filter((p) => p !== page)
        const projects = page === PROJECTS_PAGE ? [] : f.projects
        return { ...f, pages, projects }
      }
      const pages = [...f.pages, page]
      const projects = page === PROJECTS_PAGE && f.projects.length === 0 ? [emptyProject()] : f.projects
      return { ...f, pages, projects }
    })

  const pickedPageCount = form.pages.filter((p) => p !== OTHER_PAGE).length
  const wantsOtherPages = form.pages.includes(OTHER_PAGE)
  // "Other" only counts once the person has actually written something.
  const hasPageSelection = pickedPageCount > 0 || (wantsOtherPages && form.otherPages.trim().length > 0)
  const toggleOtherPages = () =>
    setForm((f) => ({
      ...f,
      pages: f.pages.includes(OTHER_PAGE) ? f.pages.filter((p) => p !== OTHER_PAGE) : [...f.pages, OTHER_PAGE],
      otherPages: f.pages.includes(OTHER_PAGE) ? '' : f.otherPages,
    }))

  const addProject = () =>
    setForm((f) => (f.projects.length >= projectLimit ? f : { ...f, projects: [...f.projects, emptyProject()] }))
  const removeProject = (idx) =>
    setForm((f) => ({ ...f, projects: f.projects.filter((_, i) => i !== idx) }))
  const updateProject = (idx, key, value) =>
    setForm((f) => ({
      ...f,
      projects: f.projects.map((p, i) => (i === idx ? { ...p, [key]: value } : p)),
    }))

  const markUploading = useCallback((key, active) => {
    setUploadingKeys((current) => {
      const next = new Set(current)
      if (active) next.add(key)
      else next.delete(key)
      return next
    })
  }, [])
  const authorizeUploads = useCallback((authorization) => setUploadAuthorization(authorization), [])
  const expireUploads = useCallback(() => setUploadAuthorization(null), [])

  const wantsProjects = form.pages.includes(PROJECTS_PAGE)
  const projectImages = form.projects.flatMap((p) => p.images)
  const allFiles = [...form.headshot, ...form.resumeFile, ...form.logoFile, ...projectImages]
  const uploadsBusy = uploadingKeys.size > 0
  const activeAuthorization = uploadAuthorization?.expiresAt > Date.now() ? uploadAuthorization : null

  const emailOk = /.+@.+\..+/.test(form.email)
  const canNext = useMemo(() => {
    if (step === 'about') return form.name.trim() && emailOk
    if (step === 'package') return !!form.package
    if (step === 'content') {
      const freeAddressReady = form.domainInterest !== 'no' || form.netlifyChoices.every((choice) => choice.trim())
      return !!form.siteFormat && hasPageSelection && freeAddressReady
    }
    if (step === 'resume') return form.resumeFile.length > 0 && !uploadsBusy
    if (step === 'files') return !uploadsBusy
    return true
  }, [step, form, emailOk, uploadsBusy, hasPageSelection])

  const uploadManifest = () => [
    ...form.headshot.map((asset) => ({ ...asset, role: 'headshot' })),
    ...form.resumeFile.map((asset) => ({ ...asset, role: 'resume' })),
    ...form.logoFile.map((asset) => ({ ...asset, role: 'logo' })),
    ...form.projects.flatMap((project, index) =>
      project.images.map((asset) => ({ ...asset, role: 'project-image', project: index + 1, projectTitle: project.title })),
    ),
  ].map(({ publicId, assetId, url, name, bytes, format, resourceType, role, project, projectTitle }) => ({
    publicId,
    assetId,
    url,
    name,
    bytes,
    format,
    resourceType,
    role,
    ...(project ? { project, projectTitle } : {}),
  }))

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
      L.push(`Resume: ${form.resumeFile[0] ? assetLine(form.resumeFile[0]) : 'not uploaded'}`)
    } else {
      L.push(`Profession: ${form.profession || 'not given'}`)
      L.push('')
      L.push('PACKAGE')
      L.push(`Package: ${tier.name} (${tier.priceLabel})`)
      L.push(`Resume polish add-on: ${form.addResume ? `YES (+${resumeTier.priceLabel}, billed separately)` : 'no'}`)
      L.push(`Payment: $${deposit.amount} deposit to start, $${tier.price - deposit.amount} balance due at launch`)
      L.push('')
      L.push('SUPABASE PORTAL PROFILE — paste this into Supabase SQL Editor')
      L.push('---------------------------------------------------------------')
      const sqlText = (value) => String(value || '').replace(/'/g, "''")
      const balanceDue = Math.max(0, tier.price - deposit.amount)
      L.push(`insert into public.client_profiles (email, name, package, balance_due, build_status, pay_link, domain, domain_active)`)
      L.push(`values ('${sqlText(form.email.trim().toLowerCase())}', '${sqlText(form.name)}', '${form.package}', ${balanceDue}, 'brief', '', '', false);`)
      L.push('')
      L.push('STYLE')
      L.push(`Color direction: ${form.styles.map((id) => portfolioPalettes.find((d) => d.id === id)?.name).filter(Boolean).join(', ') || 'undecided'}`)
      if (form.styleNotes) L.push(`Direction adjustments: ${form.styleNotes}`)
      if (form.brands.length) L.push(`Brands they like: ${form.brands.join(', ')}`)
      if (form.emulate) L.push(`Sites to emulate: ${form.emulate}`)
      L.push('')
      L.push('CONTENT')
      L.push(`Site format: ${siteFormats.find((option) => option.id === form.siteFormat)?.name || 'undecided'}`)
      L.push(`Custom domain interest: ${domainInterestOptions.find((option) => option.id === form.domainInterest)?.label || 'not answered'}`)
      if (form.domainInterest === 'no') {
        form.netlifyChoices.forEach((choice, index) => L.push('Netlify choice ' + (index + 1) + ': ' + choice + '.netlify.app'))
      }
      const pickedPages = form.pages.filter((p) => p !== OTHER_PAGE)
      if (pickedPages.length) L.push(`Pages wanted (${pickedPages.length}): ${pickedPages.join(', ')}`)
      if (wantsOtherPages && form.otherPages.trim()) L.push(`Other pages requested: ${form.otherPages.trim()}`)
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
          if (p.images.length) {
            L.push('   Files:')
            p.images.forEach((asset) => L.push(`   - ${assetLine(asset)}`))
          } else {
            L.push('   Files: none uploaded')
          }
        })
      }
      L.push('')
      L.push('OTHER FILES')
      L.push(`Headshot: ${form.headshot[0] ? assetLine(form.headshot[0]) : 'not uploaded'}`)
      L.push(`Resume: ${form.resumeFile[0] ? assetLine(form.resumeFile[0]) : 'not uploaded'}`)
      L.push(`Logo: ${form.logoFile[0] ? assetLine(form.logoFile[0]) : 'not uploaded'}`)
    }
    return L.join('\n')
  }

  /* ---------- submit ---------- */

  const submit = async () => {
    setSending(true)
    setError('')
    if (uploadsBusy) {
      setError('Please wait for every upload to finish before submitting.')
      setSending(false)
      return
    }

    const fd = new URLSearchParams()
    const manifest = uploadManifest()
    if (track === 'resume') {
      fd.append('form-name', 'resume-intake')
      fd.append('name', form.name)
      fd.append('email', form.email)
      fd.append('phone', form.phone)
      fd.append('package', form.resumePkg)
      fd.append('target_role', form.target)
      fd.append('whats_wrong', form.wrong)
      fd.append('extra_notes', form.notes)
      fd.append('resume_url', form.resumeFile[0]?.url || '')
      fd.append('resume_public_id', form.resumeFile[0]?.publicId || '')
    } else {
      fd.append('form-name', 'website-intake')
      fd.append('name', form.name)
      fd.append('email', form.email)
      fd.append('phone', form.phone)
      fd.append('profession', form.profession)
      fd.append('package', form.package)
      fd.append('style_pick', form.styles.join(', '))
      fd.append('style_notes', form.styleNotes)
      fd.append('brand_inspo', form.brands.join(', '))
      fd.append('emulate_links', form.emulate)
      fd.append('bio', form.bio)
      fd.append('site_format', form.siteFormat)
      fd.append('pages', form.pages.filter((p) => p !== OTHER_PAGE).join(', '))
      fd.append('other_pages', wantsOtherPages ? form.otherPages.trim() : '')
      fd.append('add_resume_polish', form.addResume ? 'yes' : 'no')
      fd.append('domain_interest', form.domainInterest)
      form.netlifyChoices.forEach((choice, index) => {
        const value = form.domainInterest === 'no' ? choice + '.netlify.app' : ''
        fd.append('netlify_option_' + (index + 1), value)
      })
      fd.append('socials', form.socials)
      fd.append('extra_notes', form.notes)
      fd.append('headshot_url', form.headshot[0]?.url || '')
      fd.append('resume_url', form.resumeFile[0]?.url || '')
      fd.append('logo_url', form.logoFile[0]?.url || '')
      form.projects.slice(0, projectLimit).forEach((project, index) => {
        fd.append(`project_${index + 1}_title`, project.title)
        fd.append(`project_${index + 1}_description`, project.description)
        fd.append(`project_${index + 1}_link`, project.link)
        fd.append(
          `project_${index + 1}_image_urls`,
          project.images.slice(0, MAX_IMAGES_PER_PROJECT).map((asset) => asset.url).join('\n'),
        )
      })
    }
    fd.append('upload_session', uploadSession)
    fd.append('cloudinary_assets', JSON.stringify(manifest))
    fd.append('summary', buildSummary())

    const state = {
      track,
      packageId: track === 'resume' ? form.resumePkg : form.package,
      addResume: track === 'website' && form.addResume,
      name: form.name,
    }

    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: fd.toString(),
      })
      if (!res.ok) throw new Error(`Status ${res.status}`)
      if (track === 'website') {
        try {
          const profileResponse = await fetch('/.netlify/functions/client-intake', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ intake: { ...form, email: form.email.trim().toLowerCase(), assets: manifest } }),
          })
          if (!profileResponse.ok) throw new Error(`Status ${profileResponse.status}`)
        } catch (profileError) {
          console.warn('Client profile was not created automatically', profileError)
        }
      }
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
          <h1 className="font-head text-4xl sm:text-5xl">What can I build for you?</h1>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          <Reveal delay={0.1}>
            <button
              onClick={() => setTrack('website')}
              className="group h-full w-full rounded-3xl border hairline bg-ink-800 p-8 text-left shadow-[0_14px_30px_-24px_rgba(24,34,48,0.4)] transition-all hover:-translate-y-1 hover:border-violet/60"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet/12 text-violet">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
                  <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </span>
              <h2 className="font-display mt-4 text-2xl font-semibold">A website</h2>
              <p className="mt-2 text-sm text-mist">Your portfolio, built and launched for you. {tier.priceLabel} all in.</p>
              <p className="mt-5 text-sm font-semibold text-gradient">Let&rsquo;s go →</p>
            </button>
          </Reveal>
          <Reveal delay={0.2}>
            <button
              onClick={() => setTrack('resume')}
              className="group h-full w-full rounded-3xl border hairline bg-ink-800 p-8 text-left shadow-[0_14px_30px_-24px_rgba(24,34,48,0.4)] transition-all hover:-translate-y-1 hover:border-mint/60"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mint/12 text-mint">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M7 3h7l4 4v14H7z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                  <path d="M14 3v4h4M10 12h5M10 16h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </span>
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

  // A short, human recap for the client. The full brief still goes to me on submit.
  const paletteNames = form.styles
    .map((id) => portfolioPalettes.find((d) => d.id === id)?.name)
    .filter(Boolean)
  const pickedPageNames = [
    ...form.pages.filter((page) => page !== OTHER_PAGE),
    ...(wantsOtherPages ? form.otherPages.split(/[\n,]/).map((line) => line.trim()).filter(Boolean) : []),
  ]
  const filledProjects = form.projects.filter((project) => project.title.trim() || project.images.length).length
  const reviewRows = (
    track === 'resume'
      ? [
          ['Name', form.name],
          ['Email', form.email],
          form.phone && ['Phone', form.phone],
          ['Service', `${resumeTier.name} · ${resumeTier.priceLabel}`],
          ['Your resume', form.resumeFile[0]?.name || 'Not attached yet'],
          form.target && ['Aiming for', form.target],
        ]
      : [
          ['Name', form.name],
          ['Email', form.email],
          form.phone && ['Phone', form.phone],
          [
            'Package',
            `${tier.name} · ${tier.priceLabel}${form.addResume ? ` + ${resumeTier.name} ${resumeTier.priceLabel}` : ''}`,
          ],
          ['Colors', paletteNames.join(', ') || 'Your call, I will pick'],
          [form.siteFormat === 'single' ? 'Sections' : 'Pages', pickedPageNames.join(', ')],
          filledProjects > 0 && ['Projects', `${filledProjects} added`],
          ['Files', allFiles.length ? `${allFiles.length} attached` : 'Sending later'],
        ]
  ).filter(Boolean)

  return (
    <main className="mx-auto max-w-2xl px-6 pt-32 pb-24">
      {/* progress */}
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-mist">
          Step {stepIdx + 1} of {steps.length}
        </p>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-frost/10">
          <motion.div
            className="h-full rounded-full bg-violet"
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
          <h1 className="font-head text-3xl">{title}</h1>
          {subtitle && <p className="mt-1.5 text-sm text-mist">{subtitle}</p>}

          <div className="mt-8 space-y-6">
            {((step === 'content' && wantsProjects) || step === 'files' || step === 'resume') && (
              <UploadGate
                sessionId={uploadSession}
                authorization={activeAuthorization}
                onAuthorize={authorizeUploads}
                onExpire={expireUploads}
              />
            )}
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

            {/* PACKAGE — a short confirmation. The full breakdown lives on /pricing. */}
            {step === 'package' && (
              <>
                <div className="flex items-baseline justify-between gap-4 rounded-2xl border border-violet bg-violet/10 p-5">
                  <span className="font-display font-semibold">{tier.name}</span>
                  <span className="shrink-0 text-right">
                    <span className="font-display block text-2xl font-bold">
                      <span className="mr-1.5 text-base font-semibold text-mist line-through">{tier.originalPriceLabel}</span>
                      {tier.priceLabel}
                    </span>
                    <span className="block text-[0.7rem] text-mist">${deposit.amount} today &middot; ${tier.price - deposit.amount} after approval</span>
                  </span>
                </div>

                {/* Optional resume polish, added on to the website order. */}
                <button
                  type="button"
                  aria-pressed={form.addResume}
                  onClick={() => set('addResume', !form.addResume)}
                  className={`flex w-full items-center justify-between gap-4 rounded-2xl border p-5 text-left transition-colors ${
                    form.addResume ? 'border-mint bg-mint/10' : 'hairline bg-frost/[0.03] hover:border-frost/30'
                  }`}
                >
                  <span className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-[0.7rem] font-bold transition-colors ${
                        form.addResume ? 'border-mint bg-mint text-ink-950' : 'border-frost/30 text-transparent'
                      }`}
                      aria-hidden="true"
                    >
                      ✓
                    </span>
                    <span>
                      <span className="font-display block font-semibold">Add {resumeTier.name}</span>
                      <span className="mt-0.5 block text-xs text-mist">{resumeTier.blurb} {promises.resume.title}.</span>
                    </span>
                  </span>
                  <span className="font-display shrink-0 text-xl font-bold">
                    <span className="mr-1.5 text-sm font-semibold text-mist line-through">{resumeTier.originalPriceLabel}</span>
                    +{resumeTier.priceLabel}
                  </span>
                </button>

                <p className="text-sm leading-relaxed text-mist">
                  Nothing is charged by this form. Your ${deposit.amount} deposit comes after you send the brief, and the ${tier.price - deposit.amount} balance is due only once your site is live and you approve it.
                  {form.addResume && ` The ${resumeTier.priceLabel} resume polish is billed separately, and I will email you that link.`}
                </p>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <StripeNote />
                  <Link to="/pricing" className="text-xs text-cyan hover:underline">See everything included ↗</Link>
                </div>
              </>
            )}

            {/* STYLE */}
            {step === 'style' && (
              <>
                <div>
                  <div className="mb-3">
                    <p className="text-sm font-medium">Which color direction feels right?</p>
                    <p className="mt-1 text-xs leading-relaxed text-mist">These swatches set the color and mood only. I will design the final layout around your content.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                    {portfolioPalettes.map((d) => (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => set('styles', form.styles[0] === d.id ? [] : [d.id])}
                        className={`rounded-xl border p-3 text-left transition-colors ${
                          form.styles.includes(d.id) ? 'border-violet bg-violet/10' : 'hairline bg-frost/[0.03] hover:border-frost/30'
                        }`}
                      >
                        <span className="flex gap-1">
                          {d.swatch.map((c) => (
                            <span key={c} className="h-3 w-3 rounded-full border border-frost/15" style={{ background: c }} />
                          ))}
                        </span>
                        <span className="font-display mt-2 block text-sm font-semibold">{d.name}</span>
                        <span className="block text-xs text-mist">{d.type}</span>
                      </button>
                    ))}
                  </div>
                  <Link to="/styles#finder" className="mt-2 inline-block text-xs text-cyan hover:underline">
                    Need another look? Reopen all palettes ↗
                  </Link>
                </div>

                <Field label="Anything you want to change or combine?" optional>
                  <textarea className="field-input min-h-20" value={form.styleNotes} onChange={(e) => set('styleNotes', e.target.value)} placeholder="e.g. Keep it simple, but use the dark colors" />
                </Field>

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
                    {form.siteFormat === 'single' ? 'Sections' : 'Pages'} you want on the site <span className="rounded-full bg-violet/10 px-2 py-0.5 text-[0.65rem] font-semibold text-violet">required</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {pageOptions.map((s) => {
                      const active = form.pages.includes(s)
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => togglePage(s)}
                          className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                            active
                              ? 'border-violet bg-violet/20 text-frost'
                              : 'border-frost/20 text-mist hover:border-frost/40'
                          }`}
                        >
                          {s}
                        </button>
                      )
                    })}
                    {/* Write-in for anything not in the list. */}
                    <button
                      type="button"
                      aria-pressed={wantsOtherPages}
                      onClick={toggleOtherPages}
                      className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                        wantsOtherPages
                          ? 'border-violet bg-violet/20 text-frost'
                          : 'border-frost/20 text-mist hover:border-frost/40'
                      }`}
                    >
                      Other{wantsOtherPages ? '' : ' +'}
                    </button>
                  </div>
                  {wantsOtherPages && (
                    <textarea
                      className="field-input mt-3 min-h-20"
                      value={form.otherPages}
                      onChange={(e) => set('otherPages', e.target.value)}
                      placeholder="What else do you want on the site? One per line is perfect."
                      aria-label="Other sections or pages you want"
                    />
                  )}
                  {!hasPageSelection && (
                    <p className="mt-2 text-xs font-medium text-violet">Choose at least one before continuing.</p>
                  )}
                </div>

                <div>
                  <p className="text-sm font-medium">
                    Interested in a custom .com later? <span className="text-xs font-normal text-mist/60">optional</span>
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-mist">A custom domain is {hosting.custom.priceLine}, and I buy it and set it up for you. Answering here does not reserve a name or start payment. It just lets me know whether to bring it up later.</p>
                  <div className="mt-3 grid gap-2 sm:grid-cols-3">
                    {domainInterestOptions.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        aria-pressed={form.domainInterest === option.id}
                        onClick={() => set('domainInterest', option.id)}
                        className={`rounded-xl border p-3 text-left text-sm transition-colors ${
                          form.domainInterest === option.id
                            ? 'border-violet bg-violet/10 text-frost'
                            : 'hairline bg-frost/[0.03] text-mist hover:border-frost/30'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                  {form.domainInterest === 'no' && (
                    <div className="mt-5 rounded-2xl border border-cyan/25 bg-cyan/[0.04] p-5">
                      <p className="text-sm font-semibold text-frost">Choose three free web-address preferences</p>
                      <p className="mt-1 text-xs leading-relaxed text-mist">Enter the part that comes before .netlify.app, in order of preference. I will use the first available option.</p>
                      <div className="mt-4 grid gap-3">
                        {form.netlifyChoices.map((choice, index) => (
                          <label key={index} className="block">
                            <span className="mb-1.5 block text-xs font-medium text-mist">{index === 0 ? 'First' : index === 1 ? 'Second' : 'Third'} choice</span>
                            <span className="flex overflow-hidden rounded-xl border hairline bg-ink-800 focus-within:border-violet">
                              <input
                                className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm outline-none"
                                value={choice}
                                onChange={(event) => set('netlifyChoices', form.netlifyChoices.map((item, choiceIndex) => choiceIndex === index ? cleanNetlifyName(event.target.value) : item))}
                                placeholder={index === 0 ? 'your-name' : index === 1 ? 'your-portfolio' : 'your-name-work'}
                                required
                                autoCapitalize="none"
                                autoCorrect="off"
                                spellCheck={false}
                              />
                              <span className="flex items-center border-l hairline bg-frost/[0.04] px-3 text-xs text-mist">.netlify.app</span>
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {wantsProjects && (
                  <div>
                    <p className="mb-2 text-sm font-medium">Your projects</p>
                    <div className="space-y-4">
                      {form.projects.map((p, i) => (
                        <div key={i} className="rounded-2xl border hairline bg-frost/[0.03] p-4">
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
                            <CloudinaryUpload
                              label="Project files"
                              hint={`Up to ${MAX_IMAGES_PER_PROJECT} images or PDFs for this project · 15 MB each`}
                              assets={p.images}
                              onChange={(value) => updateProject(i, 'images', value)}
                              multiple
                              max={MAX_IMAGES_PER_PROJECT}
                              totalCount={allFiles.length}
                              totalMax={MAX_UPLOADS}
                              sessionId={uploadSession}
                              category={`project-${i + 1}`}
                              authorization={activeAuthorization}
                              onAuthorizationExpired={expireUploads}
                              onUploadingChange={(active) => markUploading(`project-${i + 1}`, active)}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    {form.projects.length < projectLimit ? (
                      <button type="button" onClick={addProject} className="btn-ghost mt-3 !px-4 !py-2 text-sm">
                        + Add another project
                      </button>
                    ) : (
                      <p className="mt-3 text-xs text-mist/70">
                        That is {projectLimit} projects. Want more? Email me at {site.email} and we will sort it out.
                      </p>
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
                <CloudinaryUpload
                  label="Headshot"
                  note="Any photo of you works. I clean it up so it looks professional."
                  hint="JPG, JPEG, PNG, HEIC or WebP · 15 MB"
                  assets={form.headshot}
                  onChange={(value) => set('headshot', value)}
                  formats={['jpg', 'jpeg', 'png', 'heic', 'webp']}
                  totalCount={allFiles.length}
                  totalMax={MAX_UPLOADS}
                  sessionId={uploadSession}
                  category="headshot"
                  authorization={activeAuthorization}
                  onAuthorizationExpired={expireUploads}
                  onUploadingChange={(active) => markUploading('headshot', active)}
                />
                <CloudinaryUpload
                  label="Resume"
                  hint="PDF or Word · 15 MB"
                  assets={form.resumeFile}
                  onChange={(value) => set('resumeFile', value)}
                  formats={['pdf', 'doc', 'docx']}
                  totalCount={allFiles.length}
                  totalMax={MAX_UPLOADS}
                  sessionId={uploadSession}
                  category="resume"
                  authorization={activeAuthorization}
                  onAuthorizationExpired={expireUploads}
                  onUploadingChange={(active) => markUploading('resume', active)}
                />
                <CloudinaryUpload
                  label="Logo"
                  note="No logo? Leave this blank and I will design one for you."
                  hint="JPG, JPEG, PNG, HEIC, WebP or PDF · 15 MB"
                  assets={form.logoFile}
                  onChange={(value) => set('logoFile', value)}
                  totalCount={allFiles.length}
                  totalMax={MAX_UPLOADS}
                  sessionId={uploadSession}
                  category="logo"
                  authorization={activeAuthorization}
                  onAuthorizationExpired={expireUploads}
                  onUploadingChange={(active) => markUploading('logo', active)}
                />
              </>
            )}

            {/* RESUME TRACK */}
            {step === 'resume' && (
              <>
                <div className="flex items-baseline justify-between gap-4 rounded-2xl border border-mint bg-mint/10 p-5">
                  <span className="font-display font-semibold">{resumeService.tiers[0].name}</span>
                  <span className="font-display shrink-0 text-2xl font-bold">
                    <span className="mr-1.5 text-base font-semibold text-mist line-through">{resumeService.tiers[0].originalPriceLabel}</span>
                    {resumeService.tiers[0].priceLabel}
                  </span>
                </div>
                <CloudinaryUpload
                  label="Your current resume"
                  hint="PDF or Word · 15 MB · required"
                  assets={form.resumeFile}
                  onChange={(value) => set('resumeFile', value)}
                  formats={['pdf', 'doc', 'docx']}
                  totalCount={allFiles.length}
                  totalMax={MAX_UPLOADS}
                  sessionId={uploadSession}
                  category="resume"
                  authorization={activeAuthorization}
                  onAuthorizationExpired={expireUploads}
                  onUploadingChange={(active) => markUploading('resume', active)}
                />
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
              <div className="space-y-5">
                <div className="glass rounded-2xl p-6">
                  <dl className="divide-y divide-frost/10">
                    {reviewRows.map(([label, value]) => (
                      <div key={label} className="flex items-baseline justify-between gap-6 py-2.5 first:pt-0 last:pb-0">
                        <dt className="shrink-0 text-xs uppercase tracking-wide text-mist/70">{label}</dt>
                        <dd className="text-right text-sm text-frost">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <StripeNote />
                {error && <p className="rounded-xl bg-[#b3261e]/10 p-4 text-sm text-[#8f1d16]">{error}</p>}
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
              <button type="button" onClick={submit} disabled={sending || uploadsBusy} className="btn-primary disabled:opacity-50">
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
