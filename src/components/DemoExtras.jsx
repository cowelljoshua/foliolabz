export function DemoTopNav({ brand, links = [], tone = 'dark', accent = '#ffffff' }) {
  const dark = tone === 'dark'

  return (
    <nav
      className="sticky top-0 z-40 border-b px-6 backdrop-blur-xl"
      style={{
        background: dark ? 'rgba(8, 8, 15, 0.78)' : 'rgba(255, 255, 255, 0.82)',
        borderColor: dark ? 'rgba(255,255,255,0.1)' : 'rgba(15,23,42,0.1)',
        color: dark ? '#f8fafc' : '#172033',
      }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-5">
        <a href="#top" className="text-sm font-bold uppercase tracking-[0.2em]">{brand}</a>
        <div className="hidden items-center gap-7 text-xs font-semibold uppercase tracking-[0.14em] md:flex">
          {links.map((link) => <a key={link.href} href={link.href} className="opacity-65 transition-opacity hover:opacity-100">{link.label}</a>)}
        </div>
        <a href="#contact" className="rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.12em]" style={{ borderColor: accent, color: accent }}>
          Let&apos;s talk
        </a>
      </div>
    </nav>
  )
}

export function DemoStatStrip({ stats, color = '#111827', border = 'rgba(127,127,127,0.2)' }) {
  return (
    <section className="mx-auto max-w-6xl px-6">
      <div className="grid overflow-hidden rounded-3xl border sm:grid-cols-3" style={{ borderColor: border }}>
        {stats.map((stat, index) => (
          <div key={stat.label} className={`px-7 py-7 ${index ? 'border-t sm:border-l sm:border-t-0' : ''}`} style={{ borderColor: border }}>
            <p className="text-3xl font-bold tracking-tight" style={{ color }}>{stat.value}</p>
            <p className="mt-1 text-sm opacity-65">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export function DemoFeature({ image, alt, eyebrow, title, body, bullets = [], accent = '#111827', panel = '#ffffff', reverse = false }) {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-20">
      <div className={`grid overflow-hidden rounded-[2rem] lg:grid-cols-2 ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`} style={{ background: panel }}>
        <div className="min-h-[320px] overflow-hidden lg:min-h-[520px]">
          <img src={image} alt={alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]" />
        </div>
        <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
          <p className="text-xs font-bold uppercase tracking-[0.24em]" style={{ color: accent }}>{eyebrow}</p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">{title}</h2>
          <p className="mt-5 text-base leading-7 opacity-70">{body}</p>
          <ul className="mt-7 space-y-3">
            {bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3 text-sm leading-6">
                <span aria-hidden="true" style={{ color: accent }}>&#9679;</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
