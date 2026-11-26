import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Eyebrow } from '@/components/brand'

export default function NotFound() {
  return (
    <main id="main-content" className="shell recovery-page">
      <Eyebrow>PAGE NOT FOUND</Eyebrow>
      <h1 className="display section-title">BACK TO THE ROAD.</h1>
      <p>This page is not in our directory. Explore the fleet to find your next drive.</p>
      <Link className="action action-gold" href="/fleet">
        Explore the fleet <ArrowRight />
      </Link>
    </main>
  )
}
