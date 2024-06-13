/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_GTAG_ID: string
  readonly PUBLIC_IPX_URL: string
  readonly PUBLIC_S3_BUCKET: string
  readonly SITE_URL: string
  readonly GITHUB_CLIENT_ID: string
  readonly GITHUB_CLIENT_SECRET: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface Window {
  dataLayer?: unknown[]
}

type Runtime = import('@astrojs/cloudflare').Runtime<ImportMetaEnv>

declare namespace App {
  interface Locals extends Runtime {}
}
