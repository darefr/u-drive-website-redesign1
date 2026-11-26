import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Breadcrumbs, PageIntro } from '@/components/editorial'
import { FAQBrowser } from '@/components/faq-browser'
import { pageMeta } from '@/lib/site'
import { faqs } from '@/lib/faq'

export const metadata = pageMeta(
  'Rental FAQ — Cars, Rates & Delivery',
  'Find answers about U Drive vehicles, daily rates, self-drive requirements, professional drivers, booking requests, and vehicle delivery across Nepal.',
  '/faq',
)
export default function FAQPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
  return (
    <main id="main-content" className="shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
      />
      <Breadcrumbs items={[{ label: 'FAQ' }]} />
      <PageIntro label="The rental guide" title="Good to know.">
        Answers about the fleet, your booking request, and getting on the road in Nepal.
      </PageIntro>
      <FAQBrowser />
      <div className="contact-booking">
        <div>
          <h2>Have a different question?</h2>
          <p>Tell the Kathmandu team what you have in mind.</p>
        </div>
        <Link href="/contact" className="action action-dark">
          Contact U Drive <ArrowRight />
        </Link>
      </div>
    </main>
  )
}
