import Image from 'next/image'
import { Breadcrumbs, CTASection, TextLink } from '@/components/editorial'
import { Eyebrow } from '@/components/brand'
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
            <Eyebrow>ABOUT U DRIVE</Eyebrow>
            <h1 className="display page-title">
              KATHMANDU
              <br />
              AT HEART.
            </h1>
            <p className="about-lead">A car rental service built around how you want to travel.</p>
            <p className="body-copy">
              U Drive Rental Car Kathmandu connects a choice of vehicles with two ways to explore
              Nepal: take the wheel yourself, or travel with a professional driver.
            </p>
            <div className="action-row">
              <TextLink href="/fleet">Meet the fleet</TextLink>
              <TextLink href="/destinations">Explore destinations</TextLink>
            </div>
          </div>
          <figure>
            <Image
              src="/images/kathmandu.webp"
              alt="The terracotta rooftops of Kathmandu set against layered mountain ridges"
              fill
              sizes="(max-width:760px) 94vw, 48vw"
              priority
            />
            <figcaption>OUR HOME / KATHMANDU VALLEY</figcaption>
          </figure>
        </div>
      </div>
      <section className="about-principles">
        <div className="shell section-space editorial-split">
          <div>
            <Eyebrow light>OUR APPROACH</Eyebrow>
            <h2 className="editorial-title">
              A rental that fits
              <br />
              the journey.
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
      <section className="shell about-contact">
        <div>
          <Eyebrow>THE KATHMANDU TEAM</Eyebrow>
          <h2 className="editorial-title">Tell us where you’re headed.</h2>
        </div>
        <TextLink href="/contact">Get in touch</TextLink>
      </section>
      <CTASection />
    </main>
  )
}
