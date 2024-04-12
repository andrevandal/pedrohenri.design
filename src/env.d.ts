/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_GTAG_ID: string
  readonly PUBLIC_IPX_URL: string
  readonly PUBLIC_S3_BUCKET: string
  readonly SITE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}