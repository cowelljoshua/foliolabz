import { useRef, useState } from 'react'

// Card with a radial spotlight that follows the cursor.
export default function SpotlightCard({ children, className = '', spotColor = 'rgba(124,92,255,0.16)' }) {
  const ref = useRef(null)
  const [spot, setSpot] = useState({ x: -999, y: -999, on: false })

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    setSpot({ x: e.clientX - rect.left, y: e.clientY - rect.top, on: true })
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setSpot((s) => ({ ...s, on: false }))}
      className={`relative overflow-hidden rounded-2xl border hairline bg-ink-800/70 ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: spot.on ? 1 : 0,
          background: `radial-gradient(420px circle at ${spot.x}px ${spot.y}px, ${spotColor}, transparent 65%)`,
        }}
      />
      <div className="relative">{children}</div>
    </div>
  )
}
