import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { Breadcrumbs, CTASection, TextLink } from '@/components/editorial'
import { Eyebrow } from '@/components/brand'
import { ContactChannels } from '@/components/contact-channels'
import { StatsCounter } from '@/components/stats-counter'
import { pageMeta } from '@/lib/site'

export const metadata = pageMeta(
  'About U Drive — A Kathmandu Rental Service',
  'Meet U Drive Rental Car Kathmandu: a car rental service offering self-drive, driver-assisted journeys, and vehicle delivery across Nepal.',
  '/about',
  '/images/kathmandu.webp',
)
export default function AboutPage() {
  return (
    <main id="main-content">
      <div className="shell">
        <Breadcrumbs items={[{ label: 'About' }]} />
        <div className="about-spread">
          <div>
            <Eyebrow>About U Drive</Eyebrow>
            <h1 className="display page-title">
              Kathmandu
              <br />
              <em>at heart.</em>
            </h1>
            <p className="about-lead">A car rental service built around how you want to travel.</p>
            <p className="body-copy">
              U Drive Rental Car Kathmandu connects a choice of vehicles with two ways to explore
              Nepal: take the wheel yourself, or travel with a professional driver.
            </p>
            <div className="action-row">
              <Link className="action action-gold" href="/fleet">
                Meet the Fleet <ArrowRight />
              </Link>
              <TextLink href="/destinations">Explore destinations</TextLink>
            </div>
          </div>
          <figure>
            <Image
              src="/images/kathmandu.webp"
              alt="The terracotta rooftops of Kathmandu set against layered mountain ridges"
              fill
              sizes="(max-width: 900px) 94vw, 46vw"
              priority
            />
            <figcaption>
              <MapPin size={14} aria-hidden="true" /> Our home · Kathmandu Valley
            </figcaption>
          </figure>
        </div>
      </div>
      <StatsCounter />
      <section className="about-story section-space" aria-labelledby="story-heading">
        <div className="shell why-grid">
          <div className="why-media">
            <div className="why-photo-main">
              <Image
                src="/images/nepal-road.webp"
                alt="A mountain road winding through forested hills towards snow peaks"
                fill
                sizes="(max-width: 900px) 92vw, 40vw"
              />
            </div>
            <div className="why-photo-inset">
              <Image
                src="/images/mountain-mobile.webp"
                alt="A Deepal S05 on a mountain road with snow peaks at sunrise"
                fill
                sizes="(max-width: 900px) 42vw, 18vw"
              />
            </div>
          </div>
          <div>
            <Eyebrow>Our story</Eyebrow>
            <h2 id="story-heading" className="editorial-title">
              Built around the journey.
            </h2>
            <p className="body-copy">
              No two trips in Nepal look the same. A day between the temples of the valley. A week
              on the road to the lakes. A pickup at the airport after a long flight.
            </p>
            <p className="body-copy">
              So we keep the rental flexible. Four cars, each with its daily rate in plain view. Two
              rental modes. A handover point agreed with you, in Kathmandu or wherever in Nepal
              your journey starts.
            </p>
            <p className="body-copy">
              Nothing is assumed. You send a request, and our team confirms the car, the dates, and
              the terms with you directly.
            </p>
          </div>
        </div>
      </section>
      <section className="about-principles on-dark" aria-labelledby="approach-heading">
        <div className="shell section-space editorial-split">
          <div>
            <Eyebrow light>Our approach</Eyebrow>
            <h2 id="approach-heading" className="editorial-title">
              A rental that fits <em>the journey.</em>
            </h2>
          </div>
          <div className="about-entries">
            <article>
              <h3>Choice at the wheel.</h3>
              <p>
                Compare our four models and daily vehicle rates. Choose Self Drive for an
                independent trip, or With Driver when you prefer the passenger seat.
              </p>
            </article>
            <article>
              <h3>A starting point that works.</h3>
              <p>
                Arrange pickup in Kathmandu or request vehicle delivery elsewhere in Nepal. Your
                meeting point and timing are agreed as part of your booking.
              </p>
            </article>
            <article>
              <h3>A conversation before confirmation.</h3>
              <p>
                Share your dates and itinerary directly with the team. U Drive confirms the vehicle,
                rental requirements, and final terms before you set out.
              </p>
            </article>
          </div>
        </div>
      </section>
      <section className="shell section-space editorial-split" aria-labelledby="team-heading">
        <div>
          <Eyebrow>The Kathmandu team</Eyebrow>
          <h2 id="team-heading" className="editorial-title">
            Tell us where you’re headed.
          </h2>
          <p className="body-copy">
            Questions about a car, a route, or a handover go straight to the team in Kathmandu.
          </p>
          <TextLink href="/contact">Send an enquiry</TextLink>
        </div>
        <ContactChannels />
      </section>
      <CTASection />
    </main>
  )
}
