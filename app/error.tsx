'use client'

import { Eyebrow } from '@/components/brand'
import { business } from '@/lib/fleet'

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main id="main-content" className="shell recovery-page">
      <Eyebrow>Connection interrupted</Eyebrow>
      <h1 className="display section-title">Let’s try that again.</h1>
      <p>This view could not load. Try again, or call the team for rental assistance.</p>
      <div className="action-row">
        <button type="button" className="action action-gold action-lg" onClick={reset}>
          Try Again
        </button>
        <a className="action action-outline action-lg" href={`tel:${business.phone}`}>
          Call U Drive
        </a>
      </div>
    </main>
  )
}
