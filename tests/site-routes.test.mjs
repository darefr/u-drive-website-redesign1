import assert from 'node:assert/strict'
import test from 'node:test'
import { vehicles } from '../lib/fleet.ts'
import { destinations } from '../lib/destinations.ts'

const base = process.env.TEST_BASE_URL || 'http://localhost:3000'
const required = [
  '/',
  '/fleet',
  '/self-drive',
  '/with-driver',
  '/destinations',
  '/how-it-works',
  '/about',
  '/reviews',
  '/faq',
  '/contact',
  '/booking',
  '/privacy',
  '/service-area',
  ...vehicles.map((v) => `/fleet/${v.slug}`),
  ...destinations.map((d) => `/destinations/${d.slug}`),
]

async function pool(items, task) {
  const pending = [...items]
  await Promise.all(
    Array.from({ length: 3 }, async () => {
      while (pending.length) await task(pending.shift())
    }),
  )
}

test(
  'every page renders and every internal CTA, navigation link and image resolves',
  { timeout: 120000 },
  async () => {
    const links = new Set()
    const images = new Set()
    const visited = new Set()
    const check = async (path) => {
      const res = await fetch(new URL(path, base), { signal: AbortSignal.timeout(25000) })
      assert.equal(res.status, 200, path)
      const html = await res.text()
      assert.match(html, /<main\b[^>]*id="main-content"/, path)
      assert.equal([...html.matchAll(/<h1[\s>]/g)].length, 1, `${path}: one main heading`)
      assert.doesNotMatch(html, /<h1[^>]*>(?:LET’S TRY THAT AGAIN|PAGE NOT FOUND)/i, path)
      visited.add(path)
      for (const [, href] of html.matchAll(/<a\s[^>]*?href="([^"]+)"/g)) {
        if (href.startsWith('/')) links.add(href.replaceAll('&amp;', '&'))
        else if (href.startsWith('#'))
          assert.equal(href, '#main-content', `${path}: major navigation must use pages`)
      }
      for (const [, src] of html.matchAll(/<img\s[^>]*?src="([^"]+)"/g)) {
        const url = new URL(src.replaceAll('&amp;', '&'), base)
        const asset = url.pathname === '/_next/image' ? url.searchParams.get('url') : url.pathname
        if (asset?.startsWith('/')) images.add(asset)
      }
      for (const [, src] of html.matchAll(/<source\s[^>]*?srcSet="(\/images\/[^" ]+)"/gi))
        images.add(src)
    }
    await pool(required, check)
    await pool(
      [...links].filter((path) => !visited.has(path)),
      check,
    )
    await pool(images, async (src) => {
      const res = await fetch(new URL(src, base), {
        method: 'HEAD',
        signal: AbortSignal.timeout(10000),
      })
      assert.equal(res.status, 200, src)
      assert.match(res.headers.get('content-type') || '', /^image\//, src)
    })
    console.log(
      `Validated ${required.length} pages, ${visited.size} distinct page URLs, and ${images.size} image assets.`,
    )
  },
)

test('missing vehicles and destinations return a genuine 404', async () => {
  for (const path of ['/fleet/not-a-rental-car', '/destinations/not-a-destination'])
    assert.equal((await fetch(new URL(path, base))).status, 404, path)
})
