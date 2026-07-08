import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'

// 3D tilt-on-hover card.
export default function TiltedCard({ children, className = '', max = 9 }) {
  const ref = useRef(null)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rx = useSpring(useTransform(my, [0, 1], [max, -max]), { stiffness: 260, damping: 22 })
  const ry = useSpring(useTransform(mx, [0, 1], [-max, max]), { stiffness: 260, damping: 22 })

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width)
    my.set((e.clientY - rect.top) / rect.height)
  }
  const reset = () => {
    mx.set(0.5)
    my.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  )
}
