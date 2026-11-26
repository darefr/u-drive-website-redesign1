import { business, money, vehicles } from './fleet'

export const faqGroups = [
  'Fleet & rates',
  'Rental modes',
  'Booking requests',
  'Pickup & delivery',
] as const

export type Faq = {
  group: (typeof faqGroups)[number]
  q: string
  a: string
  // Featured questions are also shown in the homepage FAQ preview.
  featured?: boolean
}

export const faqs: Faq[] = [
  {
    group: faqGroups[0],
    q: 'What vehicles are available?',
    a:
      vehicles.map((v) => `${v.name} — ${money(v.rate)}/day`).join('; ') +
      '. Availability for your dates is confirmed by U Drive.',
    featured: true,
  },
  {
    group: faqGroups[0],
    q: 'How is the rental price calculated?',
    a: 'The estimate multiplies the selected vehicle’s daily rate by the number of rental days. A same-day trip is estimated as one day. No extra charges are added to the on-screen estimate.',
  },
  {
    group: faqGroups[0],
    q: 'What does the estimate cover?',
    a: 'The estimate is for the vehicle at its listed daily rate. U Drive confirms the final amount and any driver or delivery arrangements for your specific trip before booking.',
  },
  {
    group: faqGroups[1],
    q: 'Do you offer self-drive rental?',
    a: 'Yes. Select Self Drive when requesting your car. Requirements will be confirmed during booking.',
    featured: true,
  },
  {
    group: faqGroups[1],
    q: 'Can I rent a car with a driver?',
    a: 'Yes. Select With Driver and share your itinerary. U Drive will confirm the professional driver arrangement and final terms with you.',
    featured: true,
  },
  {
    group: faqGroups[2],
    q: 'How do I request a booking?',
    a: 'Choose your vehicle and rental mode, select your dates, and enter a pickup location and contact details. Review your estimate, then send your prepared request using WhatsApp or email.',
  },
  {
    group: faqGroups[2],
    q: 'Is sending a request a confirmed booking?',
    a: 'No. Opening a WhatsApp or email draft does not send it. After you send your message, U Drive will confirm availability, rental terms, and collection or delivery directly with you.',
    featured: true,
  },
  {
    group: faqGroups[2],
    q: 'How do I change a request?',
    a: 'Before sending, use the edit controls in the review step. If you have already sent your request, contact the team in the same conversation with the changes you would like to make.',
  },
  {
    group: faqGroups[2],
    q: 'How can I contact U Drive?',
    a: `Call or WhatsApp ${business.phoneDisplay}, email ${business.email}, or prepare an enquiry on the Contact page.`,
  },
  {
    group: faqGroups[3],
    q: 'Where do you provide service?',
    a: 'U Drive is based in Kathmandu and provides car rental and delivery services across Nepal. Share your intended route so the team can confirm arrangements.',
  },
  {
    group: faqGroups[3],
    q: 'Can I request vehicle delivery?',
    a: 'Yes. Include your preferred pickup or delivery location in your booking request. The team will confirm the exact location, timing, and terms.',
    featured: true,
  },
  {
    group: faqGroups[3],
    q: 'Can I request a different return location?',
    a: 'Yes. Uncheck “Return to the same location” in the booking form and enter your preferred drop-off point. U Drive will confirm whether that arrangement is possible for your trip.',
  },
]
