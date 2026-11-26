import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Eyebrow } from './brand'

export function ServiceArea() {
  return (
    <section className="nepal-band on-dark" aria-labelledby="service-heading">
      <Image
        className="nepal-band-photo"
        src="/images/nepal-high-road.webp"
        alt="A mountain road lined with prayer flags at dusk, with snow peaks catching the last light"
        fill
        sizes="100vw"
      />
      <div className="shell nepal-band-inner">
        <div className="nepal-band-copy" data-reveal>
          <Eyebrow light>Kathmandu + all Nepal</Eyebrow>
          <h2 id="service-heading" className="display">
            Kathmandu is the <em>start line.</em>
          </h2>
          <p>
            Collect your car in the valley, or ask for delivery where your journey begins. Tell us
            your route and we confirm the vehicle, the handover point, and the timing with you.
          </p>
          <div className="action-row">
            <Link className="action action-gold" href="/service-area">
              See the service area <ArrowRight />
            </Link>
            <Link className="action action-glass" href="/contact?topic=delivery">
              Ask about delivery
            </Link>
          </div>
        </div>
        <dl className="nepal-band-facts" data-reveal>
          <div>
            <dt>Our base</dt>
            <dd>Kathmandu</dd>
          </div>
          <div>
            <dt>Handover</dt>
            <dd>Pickup or delivery</dd>
          </div>
          <div>
            <dt>Coverage</dt>
            <dd>Across Nepal</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}
