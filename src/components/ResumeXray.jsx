import { resumeService } from '../config/site.js'
import { asset } from '../lib/asset.js'

export default function ResumeXray() {
  const { resumePdf } = resumeService

  return (
    <div className="glass rounded-3xl p-6 sm:p-9">
      <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <div>
          <h3 className="font-display text-xl font-semibold sm:text-2xl">Want proof I practice what I preach?</h3>
        </div>
        <a href={asset(resumePdf)} target="_blank" rel="noreferrer" className="btn-primary shrink-0 !py-2.5 text-sm">
          View my resume ↗
        </a>
      </div>
    </div>
  )
}
