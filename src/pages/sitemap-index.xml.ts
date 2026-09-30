// The old @astrojs/sitemap index URL (still known to search engines). EmDash
// redirects skip paths with file extensions, so this one lives in code.
import type { APIRoute } from 'astro'

export const GET: APIRoute = ({ redirect }) => redirect('/sitemap.xml', 301)
