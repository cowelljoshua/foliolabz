import { useEffect, useRef } from 'react'
import gsap from 'gsap'

// Splits text into characters and staggers them in when scrolled into view.
export default function SplitText({
  text,
  className = '',
  delay = 0,
  stagger = 0.025,
  as: Tag = 'span',
}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const chars = el.querySelectorAll('[data-char]')
    if (reduceMotion) {
      gsap.set(chars, { opacity: 1, y: 0, rotateX: 0 })
      return
    }
    gsap.set(chars, { opacity: 0, y: 28, rotateX: -45 })
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          gsap.to(chars, {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.7,
            ease: 'back.out(1.6)',
            stagger,
            delay,
          })
          io.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [text, delay, stagger])

  const words = text.split(' ')
  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap" aria-hidden="true">
          {word.split('').map((ch, ci) => (
            <span key={ci} data-char className="inline-block will-change-transform">
              {ch}
            </span>
          ))}
          {wi < words.length - 1 ? <span className="inline-block">&nbsp;</span> : null}
        </span>
      ))}
    </Tag>
  )
}
