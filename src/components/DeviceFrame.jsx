import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'motion/react'
import { asset } from '../lib/asset.js'

// The small card previews load each site at a real desktop width and then
// shrink the whole thing to fit. Without this the iframe is only ~500px wide,
// so every site renders its cramped phone layout instead of the design people
// are actually here to look at. 16:10 to match the card's aspect ratio.
const PREVIEW_WIDTH = 1440
const PREVIEW_HEIGHT = 900

// Scale factor that makes a PREVIEW_WIDTH-wide iframe fit the measured box.
// Measured straight away on layout, then kept in sync. ResizeObserver alone is
// not enough: it can be delayed, and a stale scale leaves a visible gap.
function useFitScale(ref) {
  const [scale, setScale] = useState(0.35)

  const measure = useCallback(() => {
    const width = ref.current?.getBoundingClientRect().width
    if (width > 0) setScale(width / PREVIEW_WIDTH)
  }, [ref])

  useLayoutEffect(measure, [measure])

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    window.addEventListener('resize', measure)
    let observer
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(measure)
      observer.observe(el)
    }
    return () => {
      window.removeEventListener('resize', measure)
      observer?.disconnect()
    }
  }, [ref, measure])

  return scale
}

// Tracks whether we are on a small screen (phones).
function useIsMobile() {
  const [mobile, setMobile] = useState(
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 640px)').matches : false
  )
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)')
    const on = () => setMobile(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return mobile
}

function BrowserBar({ url, children }) {
  return (
    <div className="flex items-center gap-2 border-b hairline bg-ink-900 px-4 py-2.5">
      <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
      <span className="ml-2 min-w-0 flex-1 truncate rounded-md bg-frost/5 px-3 py-0.5 text-[11px] text-mist">
        {url.replace('https://', '')}
      </span>
      {children}
    </div>
  )
}

// The big expanded overlay (desktop only). Live, interactive iframe.
function ExpandedModal({ name, url, onClose }) {
  const [mode, setMode] = useState('laptop')

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-frost/55 p-4 backdrop-blur-sm sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Top controls */}
      <div className="mb-4 flex w-full max-w-6xl items-center justify-between" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3">
          <h3 className="font-display text-lg font-semibold text-frost">{name}</h3>
          <div className="glass flex items-center gap-1 rounded-full p-1">
            {['laptop', 'phone'].map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`rounded-full px-3.5 py-1 text-xs font-semibold capitalize transition-colors ${
                  mode === m ? 'bg-frost/10 text-frost' : 'text-mist hover:text-frost'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a href={url} target="_blank" rel="noreferrer" className="btn-ghost !px-4 !py-2 text-xs">
            Open in new tab ↗
          </a>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-mist hover:bg-frost/10 hover:text-frost"
            aria-label="Close preview"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Framed live site */}
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
        className={`overflow-hidden rounded-2xl border hairline bg-ink-800 shadow-[0_30px_70px_-24px_rgba(24,34,48,0.55)] transition-all duration-500 ${
          mode === 'laptop' ? 'h-[80vh] w-full max-w-6xl' : 'h-[78vh] max-h-[780px] w-[26rem] max-w-full'
        }`}
      >
        <BrowserBar url={url} />
        <div className="h-[calc(100%-2.6rem)] overflow-hidden bg-white">
          <iframe
            src={url}
            title={`Live preview of ${name}`}
            className={
              mode === 'laptop'
                ? 'h-[125%] w-[125%] origin-top-left scale-[0.8] bg-white'
                : 'h-full w-full bg-white'
            }
          />
        </div>
      </motion.div>

      <p className="mt-3 text-xs text-ink-800" onClick={(e) => e.stopPropagation()}>
        Live site. Scroll and click around, or press Esc to close.
      </p>
    </motion.div>,
    document.body
  )
}

export default function DeviceFrame({ name, url, thumb, field }) {
  const isMobile = useIsMobile()
  const [open, setOpen] = useState(false)
  const [previewLoaded, setPreviewLoaded] = useState(false)
  const previewBox = useRef(null)
  const previewScale = useFitScale(previewBox)

  // Mobile: no embedded preview, just a clean card that opens the real site.
  if (isMobile) {
    return (
      <div className="overflow-hidden rounded-2xl border hairline bg-ink-800/70">
        <div className="relative h-40 w-full overflow-hidden bg-ink-900">
          {thumb && (
            <img
              src={asset(thumb)}
              alt={`${name} website`}
              className="h-full w-full object-cover object-top"
              onError={(e) => (e.target.style.display = 'none')}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-transparent" />
        </div>
        <div className="flex items-center justify-between gap-3 p-4">
          <div>
            <p className="font-display font-semibold">{name}</p>
            {field && <p className="text-xs uppercase tracking-wide text-mist">{field}</p>}
          </div>
          <a href={url} target="_blank" rel="noreferrer" className="btn-primary shrink-0 !px-4 !py-2 text-sm">
            Visit site ↗
          </a>
        </div>
      </div>
    )
  }

  // Desktop: a compact live preview you click to expand.
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group block w-full overflow-hidden rounded-2xl border hairline bg-ink-800 text-left shadow-[0_18px_40px_-26px_rgba(24,34,48,0.5)] transition-transform duration-300 hover:-translate-y-1"
      >
        <BrowserBar url={url} />
        <div ref={previewBox} className="relative aspect-[16/10] overflow-hidden bg-white">
          {/* Non-interactive live preview */}
          {!previewLoaded && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-ink-900">
              {thumb && (
                <img
                  src={asset(thumb)}
                  alt=""
                  className="h-full w-full object-cover object-top opacity-50"
                  onError={(e) => (e.target.style.display = 'none')}
                />
              )}
              <span className="absolute text-xs text-mist">Loading live preview…</span>
            </div>
          )}
          {/* Loaded wide, then shrunk, so the desktop layout is what shows. */}
          <iframe
            src={url}
            title={`Preview of ${name}`}
            loading="lazy"
            tabIndex={-1}
            onLoad={() => setPreviewLoaded(true)}
            className="pointer-events-none absolute left-0 top-0 origin-top-left border-0 bg-white"
            style={{
              width: PREVIEW_WIDTH,
              height: PREVIEW_HEIGHT,
              transform: `scale(${previewScale})`,
            }}
          />
          {/* Hover overlay inviting a click */}
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-frost/0 transition-colors duration-300 group-hover:bg-frost/35">
            <span className="flex items-center gap-2 rounded-full border hairline bg-ink-800/95 px-5 py-2.5 text-sm font-semibold text-frost opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 2H2v4M10 2h4v4M6 14H2v-4M10 14h4v-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Click to explore
            </span>
          </div>
        </div>
        {/* Caption */}
        <div className="flex items-center justify-between gap-3 p-4">
          <div>
            <p className="font-display font-semibold">{name}</p>
            {field && <p className="text-xs uppercase tracking-wide text-mist">{field}</p>}
          </div>
          <span className="shrink-0 text-sm font-semibold text-gradient">Click to explore →</span>
        </div>
      </button>

      <AnimatePresence>
        {open && <ExpandedModal name={name} url={url} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  )
}
