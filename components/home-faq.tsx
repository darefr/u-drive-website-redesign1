import { Eyebrow, WhatsAppIcon } from './brand'
import { FAQAccordion, TextLink } from './editorial'
import { faqs } from '@/lib/faq'
import { whatsappLink } from '@/lib/fleet'

export function HomeFaq() {
  return (
    <section className="home-faq section-space" aria-labelledby="faq-heading">
      <div className="shell editorial-split">
        <div data-reveal>
          <Eyebrow>Good to know</Eyebrow>
          <h2 id="faq-heading" className="editorial-title">
            Before you book.
          </h2>
          <p className="body-copy">
            Quick answers about the fleet, the two rental modes, and how a booking request works.
          </p>
          <div className="action-row home-faq-links">
            <TextLink href="/faq">Read all questions</TextLink>
            <a
              className="text-action"
              href={whatsappLink('Hello U Drive! I have a question about renting a car.')}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon size={16} /> Ask on WhatsApp
            </a>
          </div>
        </div>
        <div data-reveal>
          <FAQAccordion questions={faqs.filter((faq) => faq.featured)} />
        </div>
      </div>
    </section>
  )
}
