import { mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'astro/config'
import { loadEnv } from 'vite'
import partytown from '@astrojs/partytown'
import cloudflare from '@astrojs/cloudflare'
import node from '@astrojs/node'
import react from '@astrojs/react'
import emdash, { s3 } from 'emdash/astro'
import { sqlite } from 'emdash/db'
import icon from 'astro-iconset'
import tailwindcss from '@tailwindcss/vite'

const env = loadEnv(import.meta.env.MODE, process.cwd(), '')

// Make `.env` values visible to server code at runtime on Node (the libSQL,
// S3 and SMTP adapters read `process.env` when they connect). Values already
// set in the shell win.
for (const [key, value] of Object.entries(env)) {
  process.env[key] ??= value
}

const {
  SITE_URL,
  LIBSQL_URL,
  S3_ENDPOINT,
  S3_BUCKET,
  S3_REGION,
  S3_PUBLIC_URL,
  SMTP_HOST
} = env

// Node by default (`pnpm dev`, `pnpm build`). The Cloudflare Worker build is
// selected with DEPLOY_TARGET=cloudflare, or automatically in Workers Builds.
const isCloudflare = env.DEPLOY_TARGET === 'cloudflare' || !!env.WORKERS_CI

// The database and email switch to the real service when their env vars are
// set, on either runtime. Without them, Node falls back to a local SQLite file
// and the built-in console email provider (dev only).
const useLibsql = !!LIBSQL_URL
const useSmtp = !!SMTP_HOST

if (isCloudflare && !useLibsql) {
  throw new Error('[config] The Cloudflare build needs LIBSQL_URL.')
}

const localPath = (path) => fileURLToPath(new URL(path, import.meta.url))

if (!useLibsql) mkdirSync(localPath('./data'), { recursive: true })

const database = useLibsql
  ? {
      entrypoint: localPath('./src/lib/emdash/libsql.ts'),
      config: {},
      type: 'sqlite'
    }
  : sqlite({ url: 'file:./data/emdash.db' })

// Images never live in the repo or on this server: everything is in the
// files.vandal.services bucket. Reads are public; uploading through the admin
// needs S3_ACCESS_KEY_ID / S3_SECRET_ACCESS_KEY at runtime.
const bucket = {
  endpoint: S3_ENDPOINT || 'https://files.vandal.services',
  bucket: S3_BUCKET || 'pedrohenri.design',
  region: S3_REGION || 'us-east-1'
}
const bucketUrl = S3_PUBLIC_URL || `${bucket.endpoint}/${bucket.bucket}`

const storage = s3({ ...bucket, publicUrl: bucketUrl })

// Existing bucket objects, browsable in the admin media picker and resized by
// images.vandal.services (see src/lib/emdash/vandal-media.ts).
const mediaProviders = [
  {
    id: 'vandal',
    name: 'files.vandal.services',
    icon: 'cloud',
    entrypoint: localPath('./src/lib/emdash/vandal-media.ts'),
    capabilities: { browse: true, search: true, upload: false, delete: false },
    config: { bucketUrl, transformUrl: 'https://images.vandal.services' }
  }
]

const plugins = useSmtp
  ? [
      {
        id: 'smtp-email',
        version: '1.0.0',
        entrypoint: localPath(
          isCloudflare
            ? './src/lib/emdash/smtp-email-worker.ts'
            : './src/lib/emdash/smtp-email-node.ts'
        ),
        format: 'native',
        options: {},
        capabilities: ['hooks.email-transport:register']
      }
    ]
  : []

// https://astro.build/config
export default defineConfig({
  output: 'server',

  adapter: isCloudflare
    ? cloudflare({ prerenderEnvironment: 'node' })
    : node({ mode: 'standalone' }),

  integrations: [
    react(),
    emdash({
      database,
      storage,
      mediaProviders,
      plugins,
      siteUrl: SITE_URL || undefined
    }),
    partytown({
      config: {
        forward: ['dataLayer.push']
      }
    }),
    icon({
      include: {
        mdi: ['linkedin', 'instagram'],
        logos: ['linkedin-icon', 'instagram-icon'],
        'heroicons-outline': ['chat-alt-2'],
        heroicons: ['arrow-down']
      },
      iconDir: 'src/assets/icons',
      svgoOptions: {
        plugins: [
          {
            name: 'addAttributesToSVGElement',
            params: {
              attributes: [{ 'shape-rendering': 'auto' }]
            }
          }
        ]
      }
    })
  ],

  trailingSlash: 'ignore',
  site: SITE_URL || 'http://localhost:4321',

  vite: {
    plugins: [tailwindcss()],
    // Resolve package.json `browser` fields in the Worker bundle, as wrangler's
    // own bundler does. The AWS SDK (S3 storage) relies on those mappings to
    // swap its Node HTTP/stream internals for fetch/WebCrypto ones.
    ...(isCloudflare && {
      environments: {
        ssr: {
          resolve: {
            mainFields: ['browser', 'module', 'jsnext:main', 'jsnext']
          }
        }
      }
    })
  }
})
