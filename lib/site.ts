import type { Metadata } from 'next'
import { business } from './fleet'

export const navigation = [
  { label: 'Home', href: '/' },
  { label: 'Fleet', href: '/fleet' },
  { label: 'Self Drive', href: '/self-drive' },
  { label: 'With Driver', href: '/with-driver' },
  { label: 'Destinations', href: '/destinations' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'About', href: '/about' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
] as const

export function siteOrigin(fallback = 'http://localhost:3000') {
  const host = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL
  return host ? `https://${host}` : fallback
}

export function pageMeta(
  title: string,
  description: string,
  path: string,
  image = '/images/hero-wide.webp',
): Metadata {
  const fullTitle = `${title} | U Drive Rental Car Kathmandu`
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: business.name,
      type: 'website',
      locale: 'en_NP',
      images: [{ url: image, alt: title }],
    },
    twitter: { card: 'summary_large_image', title: fullTitle, description, images: [image] },
  }
}
