'use client'

import { business } from '@/lib/fleet'

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main id="main-content" className="shell recovery-page">
      <p className="eyebrow">CONNECTION INTERRUPTED</p>
      <h1 className="display section-title">LET’S TRY THAT AGAIN.</h1>
      <p>This view could not load. Try again, or call the team for rental assistance.</p>
      <div className="flex flex-wrap gap-3">
        <button type="button" className="action action-gold" onClick={reset}>
          Try again
        </button>
        <a className="action action-outline" href={`tel:${business.phone}`}>
          Call U Drive
        </a>
      </div>
    </main>
  )
}
