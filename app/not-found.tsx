import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Eyebrow } from '@/components/brand'

export default function NotFound() {
  return (
    <main id="main-content" className="shell recovery-page">
      <Eyebrow>Page not found</Eyebrow>
      <h1 className="display section-title">
        Back to <em>the road.</em>
      </h1>
      <p>This page is not in our directory. Explore the fleet to find your next drive.</p>
      <div className="action-row">
        <Link className="action action-gold action-lg" href="/fleet">
          Explore the Fleet <ArrowRight />
        </Link>
        <Link className="action action-outline action-lg" href="/">
          Back to Home
        </Link>
      </div>
    </main>
  )
}
