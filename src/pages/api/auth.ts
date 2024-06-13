import type { APIRoute } from 'astro'

export const prerender = false

export const GET: APIRoute = (context) => {
  const { GITHUB_CLIENT_ID } = context.locals.runtime.env
  try {
    const url = new URL(context.url)
    const redirectUrl = new URL('https://github.com/login/oauth/authorize')
    redirectUrl.searchParams.set('client_id', GITHUB_CLIENT_ID)
    redirectUrl.searchParams.set('redirect_uri', url.origin + '/api/callback')
    redirectUrl.searchParams.set('scope', 'repo user')
    redirectUrl.searchParams.set(
      'state',
      crypto.getRandomValues(new Uint8Array(12)).join('')
    )

    return context.redirect(redirectUrl.href, 301)
  } catch (error) {
    const e = error instanceof Error ? error : new Error(String(error))
    return new Response(e.message, {
      status: 500
    })
  }
}
