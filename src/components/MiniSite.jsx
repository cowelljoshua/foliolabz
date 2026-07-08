// Rough luminance of a #rrggbb hex, 0 (black) to 1 (white).
function luminance(hex) {
  const m = hex.replace('#', '')
  const r = parseInt(m.slice(0, 2), 16) / 255
  const g = parseInt(m.slice(2, 4), 16) / 255
  const b = parseInt(m.slice(4, 6), 16) / 255
  return 0.299 * r + 0.587 * g + 0.114 * b
}

// A tiny abstract wireframe of a website, drawn in a style's colors.
// Used as the preview art on style cards.
export default function MiniSite({ swatch }) {
  const [bg, accent, secondary] = swatch
  const isLightBg = luminance(bg) > 0.6
  const ink = isLightBg ? 'rgba(0,0,0,0.65)' : 'rgba(255,255,255,0.8)'
  const inkSoft = isLightBg ? 'rgba(0,0,0,0.18)' : 'rgba(255,255,255,0.25)'

  return (
    <div className="h-full w-full p-3" style={{ background: bg }}>
      {/* nav */}
      <div className="flex items-center justify-between">
        <div className="h-1.5 w-8 rounded-full" style={{ background: accent }} />
        <div className="flex gap-1.5">
          <div className="h-1.5 w-4 rounded-full" style={{ background: inkSoft }} />
          <div className="h-1.5 w-4 rounded-full" style={{ background: inkSoft }} />
        </div>
      </div>
      {/* hero */}
      <div className="mt-4">
        <div className="h-2.5 w-3/4 rounded-full" style={{ background: ink }} />
        <div className="mt-1.5 h-2.5 w-1/2 rounded-full" style={{ background: accent }} />
        <div className="mt-2 h-1.5 w-2/3 rounded-full" style={{ background: inkSoft }} />
        <div className="mt-3 h-4 w-14 rounded-full" style={{ background: accent }} />
      </div>
      {/* cards */}
      <div className="mt-4 grid grid-cols-3 gap-1.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-md p-1.5" style={{ background: isLightBg ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)' }}>
            <div className="h-6 rounded" style={{ background: i === 1 ? accent : secondary, opacity: 0.85 }} />
            <div className="mt-1 h-1 w-3/4 rounded-full" style={{ background: inkSoft }} />
          </div>
        ))}
      </div>
    </div>
  )
}
