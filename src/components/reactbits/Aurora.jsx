import { useEffect, useRef } from 'react'

// Animated aurora ribbons + drifting stars on a canvas.
// Sits absolutely behind content. Honors prefers-reduced-motion.
export default function Aurora({ className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.innerWidth < 640
    let raf = 0
    let running = true

    const blobs = [
      { hue: [124, 92, 255], r: 0.55, x: 0.25, y: 0.3, sx: 0.00021, sy: 0.00013, ph: 0 },
      { hue: [34, 211, 238], r: 0.5, x: 0.75, y: 0.35, sx: 0.00017, sy: 0.00023, ph: 2.1 },
      { hue: [91, 140, 255], r: 0.45, x: 0.5, y: 0.75, sx: 0.00013, sy: 0.00019, ph: 4.2 },
    ]
    const starCount = isMobile ? 40 : 90
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random(),
      y: Math.random(),
      s: Math.random() * 1.4 + 0.3,
      tw: Math.random() * Math.PI * 2,
      v: Math.random() * 0.9 + 0.35,
    }))

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = (t) => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)

      // Aurora blobs
      ctx.globalCompositeOperation = 'lighter'
      for (const b of blobs) {
        const bx = (b.x + Math.sin(t * b.sx + b.ph) * 0.14) * w
        const by = (b.y + Math.cos(t * b.sy + b.ph) * 0.12) * h
        const radius = b.r * Math.max(w, h) * (1 + Math.sin(t * 0.00025 + b.ph) * 0.08)
        const g = ctx.createRadialGradient(bx, by, 0, bx, by, radius)
        const [r, gr, bl] = b.hue
        g.addColorStop(0, `rgba(${r},${gr},${bl},0.16)`)
        g.addColorStop(0.55, `rgba(${r},${gr},${bl},0.05)`)
        g.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(bx, by, radius, 0, Math.PI * 2)
        ctx.fill()
      }

      // Stars
      ctx.globalCompositeOperation = 'source-over'
      for (const s of stars) {
        const alpha = 0.25 + 0.55 * Math.abs(Math.sin(t * 0.0012 * s.v + s.tw))
        ctx.fillStyle = `rgba(238,240,248,${alpha})`
        ctx.fillRect(s.x * w, s.y * h, s.s, s.s)
      }
    }

    if (reduceMotion) {
      draw(1200)
    } else {
      const loop = (t) => {
        if (!running) return
        draw(t)
        raf = requestAnimationFrame(loop)
      }
      raf = requestAnimationFrame(loop)
      const onVis = () => {
        running = !document.hidden
        if (running) raf = requestAnimationFrame(loop)
      }
      document.addEventListener('visibilitychange', onVis)
      return () => {
        running = false
        cancelAnimationFrame(raf)
        document.removeEventListener('visibilitychange', onVis)
        window.removeEventListener('resize', resize)
      }
    }
    return () => window.removeEventListener('resize', resize)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    />
  )
}
