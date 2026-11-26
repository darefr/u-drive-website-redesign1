import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, ArrowUpRight, MapPin, Route } from 'lucide-react'
import { Breadcrumbs, CTASection } from '@/components/editorial'
import { DestinationCard } from '@/components/destination-card'
import { destinations, findDestination } from '@/lib/destinations'
import { pageMeta } from '@/lib/site'
import { tripHref } from '@/lib/trip-search'

type Props = { params: Promise<{ slug: string }> }
export const dynamicParams = false
export const generateStaticParams = () => destinations.map(({ slug }) => ({ slug }))
export async function generateMetadata({ params }: Props) {
  const d = findDestination((await params).slug)
  return d
    ? pageMeta(
        `${d.name} — Nepal Road Trip Guide`,
        d.description,
        `/destinations/${d.slug}`,
        `/images/destinations/${d.slug}.webp`,
      )
    : { title: 'Destination not found' }
}
export default async function DestinationPage({ params }: Props) {
  const d = findDestination((await params).slug)
  if (!d) notFound()
  const others = destinations.filter((other) => other.slug !== d.slug)
  // Guides of the same kind come first, so a mountain page leads to more mountains.
  const related = [
    ...others.filter((other) => other.kind === d.kind),
    ...others.filter((other) => other.kind !== d.kind),
  ].slice(0, 3)
  return (
    <main id="main-content">
      <div className="shell">
        <Breadcrumbs
          items={[{ label: 'Destinations', href: '/destinations' }, { label: d.name }]}
        />
      </div>
      <section className="destination-cover guide-cover">
        <Image
          src={`/images/destinations/${d.slug}.webp`}
          alt={d.alt}
          fill
          sizes="100vw"
          priority
        />
        <div className="destination-cover-shade" />
        <div className="shell">
          <p className="journey-kicker">
            <MapPin size={15} aria-hidden="true" />
            {d.kind} · Nepal
          </p>
          <h1>{d.name}.</h1>
          <p>{d.description}</p>
        </div>
      </section>
      <section className="shell section-space guide-body">
        <div>
          <p className="drive-eyebrow">The destination brief</p>
          <h2 className="drive-section-title">{d.caption}.</h2>
          <p className="body-copy">{d.overview}</p>
          <h3>Places to consider</h3>
          <ul className="guide-stops">
            {d.stops.map((stop) => (
              <li key={stop}>
                <MapPin size={17} aria-hidden="true" />
                {stop}
              </li>
            ))}
          </ul>
          <h3>Before you set off</h3>
          <p className="body-copy">{d.planning}</p>
          <p className="image-note">
            Destination photography:{' '}
            <a href={d.source} target="_blank" rel="noopener noreferrer">
              Nepal Tourism Board <ArrowUpRight size={12} aria-hidden="true" />
            </a>
          </p>
        </div>
        <aside className="route-brief">
          <Route size={27} aria-hidden="true" />
          <p className="overline">Plan this journey</p>
          <h2>Kathmandu to {d.name === 'Kathmandu' ? 'the valley' : d.name}.</h2>
          <p>
            Choose a car and your dates. We’ll include {d.name} in the itinerary sent to the rental
            team.
          </p>
          <Link
            className="action action-gold action-lg"
            href={tripHref('/booking', { pickup: 'Kathmandu', destination: d.name })}
          >
            Plan This Trip <ArrowRight />
          </Link>
          <span>Route and availability confirmed on request.</span>
        </aside>
      </section>
      <div className="shell">
        <section className="guide-more" aria-labelledby="more-heading">
          <div className="drive-section-head">
            <div>
              <p className="drive-eyebrow">Keep exploring</p>
              <h2 id="more-heading" className="drive-section-title">
                More places to drive.
              </h2>
            </div>
            <Link href="/destinations" className="drive-section-link">
              All destinations <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="destination-directory">
            {related.map((other) => (
              <DestinationCard key={other.slug} destination={other} />
            ))}
          </div>
        </section>
      </div>
      <CTASection title="Take the scenic route." />
    </main>
  )
}
