/**
 * EmDash database runtime entrypoint for libSQL (Turso or self-hosted sqld).
 *
 * EmDash's stock `libsql()` adapter serialises its config into the build, so
 * an auth token passed there ends up in the server bundle. This entrypoint
 * reads the connection from the environment at runtime instead:
 *
 * - `LIBSQL_URL` — `libsql://…`, `https://…`, `http://…` (or `file:` on Node)
 * - `LIBSQL_AUTH_TOKEN` — database token (omit for unauthenticated sqld)
 *
 * On Workers, `process.env` is populated from vars and secrets
 * (`nodejs_compat`), and `@libsql/client` resolves to its fetch-based client.
 */
import { LibsqlDialect } from '@libsql/kysely-libsql'

export function createDialect() {
  const url = process.env.LIBSQL_URL
  if (!url) {
    throw new Error('[emdash] LIBSQL_URL is not set')
  }
  return new LibsqlDialect({
    url,
    authToken: process.env.LIBSQL_AUTH_TOKEN || undefined
  })
}
