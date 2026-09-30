/**
 * Pages sitemap. Overrides EmDash's `/sitemap-[collection].xml` for the
 * `pages` collection only, because the "home" page lives at `/`, not at
 * `/home/`. EmDash's `/sitemap.xml` index links here as usual.
 */
import type { APIRoute } from 'astro'
import {
  getEmDashCollection,
  getEmDashEntry,
  getSeoMeta,
  getSiteSettings
} from 'emdash'

const escapeXml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

export const GET: APIRoute = async ({ url }) => {
  const settings = await getSiteSettings()
  // Same precedence as EmDash's own sitemaps: stored site URL, then the
  // SITE_URL env var, then the request origin.
  const origin = (settings.url || process.env.SITE_URL || url.origin).replace(
    /\/$/,
    ''
  )
  const { entries } = await getEmDashCollection('pages', {
    status: 'published'
  })
  // Collection listings don't carry SEO panel data; single-entry reads do,
  // and a site has only a handful of pages.
  const pages = await Promise.all(
    entries.map(async ({ id }) => (await getEmDashEntry('pages', id)).entry)
  )

  const urls = pages
    .filter(
      (page): page is NonNullable<typeof page> =>
        !!page && !getSeoMeta(page).robots
    )
    .map((page) => {
      const path = page.id === 'home' ? '/' : `/${page.id}/`
      return [
        '  <url>',
        `    <loc>${escapeXml(origin + path)}</loc>`,
        `    <lastmod>${page.data.updatedAt.toISOString()}</lastmod>`,
        '  </url>'
      ].join('\n')
    })

  return new Response(
    [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      ...urls,
      '</urlset>'
    ].join('\n'),
    {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600'
      }
    }
  )
}
