# AGENTS.md

## Project

`pedrohenri.design` — Astro 7 portfolio site for Pedro Henri. Runs on the Node adapter by default; `DEPLOY_TARGET=cloudflare` (or Workers Builds' `WORKERS_CI`) builds a Cloudflare Worker (`src/worker.ts`). Content is managed in EmDash CMS (`/_emdash/admin`).

## Stack

- Astro 7 (`output: 'server'`, `@astrojs/node` or `@astrojs/cloudflare`, chosen in `astro.config.mjs`)
- EmDash CMS (`emdash`, `@emdash-cms/cloudflare` for the Worker entry, `@astrojs/react` for the admin)
  - With env vars set (any runtime): libSQL (`src/lib/emdash/libsql.ts`), SMTP plugin (`src/lib/emdash/smtp*.ts`; nodemailer on Node, worker-mailer on Workers). Without them (Node only): SQLite `data/emdash.db`, console email in dev
  - Media: always the files.vandal.services bucket. Existing objects via the `vandal` media provider (`src/lib/emdash/vandal-media.ts`, resized by images.vandal.services); uploads via S3 storage into the same bucket. No images in the repo.
- Editable surfaces: `pages` collection with a `layout` blocks field (`home` = `/`; renderers in `src/components/blocks/`), `primary` menu (header), `footer_cta` widget area, site settings (title, social, logo, favicon, SEO), redirects, per-entry SEO panel
- Schema + initial content: `seed/seed.json`; generated types: `emdash-env.d.ts`
- Tailwind CSS 4 (`@tailwindcss/vite`), `astro-iconset`, `@astrojs/partytown`
- TypeScript, ESLint, Prettier, Vitest

## Commands

Run from repo root:

| Command                  | Action                                  |
| ------------------------ | --------------------------------------- |
| `pnpm install`           | Install dependencies                    |
| `pnpm dev`               | Node dev server at `localhost:4321`     |
| `pnpm build`             | `astro check` + Node build to `./dist/` |
| `pnpm build:cloudflare`  | `astro check` + Cloudflare Worker build |
| `pnpm deploy:cloudflare` | Cloudflare build + `wrangler deploy`    |
| `pnpm preview`           | Preview production build                |
| `pnpm astro ...`         | Astro CLI (`astro add`, `astro check`)  |
| `pnpm test`              | Run Vitest                              |
| `pnpm lint`              | Run ESLint                              |

## Conventions

- Package manager: `pnpm` (see `pnpm-workspace.yaml`, `pnpm-lock.yaml`).
- Formatting via Prettier (`.prettierrc.mjs`); do not hand-format against it.
- Query content with `getEmDashEntry` / `getEmDashCollection` / `getEmDashReferences` from `emdash`; render rich text with `PortableText` from `emdash/ui` and pass `{ type: { colorPanel: ColorPanel } }`.
- SEO tags come from `<EmDashHead>` in `Base.astro`: pass the entry as `content` and fallbacks as `description`/`image`; the SEO panel wins. Compute `<title>` with `getSeoMeta` and the site settings.
- Image values reference bucket keys (`{ provider: 'vandal', id: '<key>' }`); never add image files to `public/`.
- Env vars: `SITE_URL`, `LIBSQL_URL`, `LIBSQL_AUTH_TOKEN`, `S3_*`, `SMTP_*`, `DEPLOY_TARGET` (see README). Never pass secrets into `astro.config.mjs` — EmDash serialises adapter config into the build.
- `typescript` stays on 6.x: TypeScript 7 has no JS API, which `@astrojs/check` and `typescript-eslint` require.
- Site content is Portuguese (README and copy); keep user-facing strings consistent with existing locale.

## Documentation

Look up EmDash documentation via the `emdash-docs` MCP server when you need to
verify an API, hook, config option, or pattern. Prefer the docs MCP over
assumptions from training data -- the docs reflect the current published
behaviour.
