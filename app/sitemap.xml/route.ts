import { vehicles } from '@/lib/fleet'
import { destinations } from '@/lib/destinations'
import { navigation, siteOrigin } from '@/lib/site'

export function GET(request: Request) {
  const origin = siteOrigin(new URL(request.url).origin)
  const paths = [
    ...navigation.map((n) => n.href),
    ...vehicles.map((v) => `/fleet/${v.slug}`),
    ...destinations.map((d) => `/destinations/${d.slug}`),
    '/service-area',
    '/booking',
    '/privacy',
  ]
  const urls = paths
    .map(
      (path) =>
        `<url><loc>${new URL(path, origin).toString().replace(/&/g, '&amp;').replace(/</g, '&lt;')}</loc></url>`,
    )
    .join('')
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    },
  )
}
