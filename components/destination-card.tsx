import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, MapPin } from 'lucide-react'
import { destinations, type Destination } from '@/lib/destinations'

export function DestinationCard({
  destination: d,
  compact = false,
  area,
  sizes = '(max-width:680px) 90vw,(max-width:1000px) 48vw, 32vw',
}: {
  destination: Destination
  compact?: boolean
  // Named tile slot in the homepage mosaic.
  area?: string
  sizes?: string
}) {
  return (
    <Link
      href={`/destinations/${d.slug}`}
      className={`destination-card${compact ? ' destination-compact' : ''}`}
      data-area={area}
      aria-label={`Explore ${d.name} destination guide`}
    >
      <Image src={`/images/destinations/${d.slug}.webp`} alt={d.alt} fill sizes={sizes} />
      <span className="destination-veil" />
      <span className="destination-kind">
        <MapPin size={13} aria-hidden="true" />
        {d.kind}
      </span>
      <div className="destination-copy">
        <p>{d.caption}</p>
        <h3>{d.name}</h3>
        {!compact && <p className="destination-description">{d.description}</p>}
        <span className="destination-explore">
          Explore destination <ArrowUpRight size={15} aria-hidden="true" />
        </span>
      </div>
    </Link>
  )
}

// Tile order and size for the homepage mosaic. The lead tile carries the full description.
const mosaic = [
  { slug: 'pokhara', area: 'lead', sizes: '(max-width: 700px) 78vw, 56vw' },
  { slug: 'kathmandu', area: 'wide', sizes: '(max-width: 700px) 78vw, 40vw' },
  { slug: 'nagarkot', area: 'a', sizes: '(max-width: 700px) 78vw, 24vw' },
  { slug: 'lumbini', area: 'b', sizes: '(max-width: 700px) 78vw, 18vw' },
  { slug: 'mustang', area: 'c', sizes: '(max-width: 700px) 78vw, 32vw' },
  { slug: 'chitwan', area: 'd', sizes: '(max-width: 700px) 78vw, 24vw' },
  { slug: 'bandipur', area: 'e', sizes: '(max-width: 700px) 78vw, 24vw' },
]

export function DestinationPreview() {
  return (
    <section className="destination-preview section-space" aria-labelledby="destinations-heading">
      <div className="shell">
        <div className="drive-section-head" data-reveal>
          <div>
            <p className="drive-eyebrow">Beyond Kathmandu</p>
            <h2 id="destinations-heading" className="drive-section-title">
              Explore Nepal by road.
            </h2>
          </div>
          <div className="section-head-aside">
            <p className="section-aside">
              Valley towns, lakeside stays, and roads into the hills. Open a guide, then plan the
              journey with our Kathmandu team.
            </p>
            <Link href="/destinations" className="drive-section-link">
              All destinations <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div className="destination-mosaic" data-reveal>
          {mosaic.map((tile) => {
            const destination = destinations.find((d) => d.slug === tile.slug)
            return (
              destination && (
                <DestinationCard
                  key={tile.slug}
                  destination={destination}
                  compact={tile.area !== 'lead'}
                  area={tile.area}
                  sizes={tile.sizes}
                />
              )
            )
          })}
          <Link href="/destinations" className="destination-more" data-area="more">
            <strong>{destinations.length}</strong>
            <span>destination guides to plan from</span>
            <ArrowRight size={20} aria-hidden="true" />
          </Link>
        </div>
        <p className="image-note">
          Guides are travel inspiration. Routes and vehicle suitability are confirmed for each
          booking. Destination photography courtesy of the{' '}
          <a href="https://ntb.gov.np/" target="_blank" rel="noopener noreferrer">
            Nepal Tourism Board
          </a>
          .
        </p>
      </div>
    </section>
  )
}
