import { payments } from '../config/site.js'

// One quiet line wherever money is mentioned: a lock, the sentence, and the
// Stripe wordmark. Deliberately small. If you want Stripe's exact logo file,
// download the SVG from stripe.com/newsroom/brand-assets, drop it in public/,
// and swap the <span> below for an <img>.
export default function StripeNote({ className = '', center = false }) {
  return (
    <p className={`flex flex-wrap items-center gap-1.5 text-xs text-mist ${center ? 'justify-center' : ''} ${className}`}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
        <rect x="4" y="10.5" width="16" height="10.5" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
      {payments.short}
      <span className="font-display font-bold tracking-tight text-[#635bff]">Stripe</span>
    </p>
  )
}
