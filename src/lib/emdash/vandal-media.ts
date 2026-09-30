/**
 * EmDash media provider for the site's existing S3 bucket
 * (files.vandal.services), resized on the fly by images.vandal.services.
 *
 * Nothing is copied: content stores `{ provider: 'vandal', id: <object key> }`
 * and renders straight from the bucket. Editors pick existing objects in the
 * admin media picker (the bucket is publicly listable, so browsing needs no
 * credentials). New uploads go through EmDash's own library, which stores
 * them in the same bucket through the S3 storage adapter.
 */
import type {
  CreateMediaProviderFn,
  MediaListOptions,
  MediaProvider,
  MediaProviderItem
} from 'emdash/media'

type VandalMediaConfig = {
  /** Public bucket URL, e.g. https://files.vandal.services/pedrohenri.design */
  bucketUrl: string
  /** Resizing proxy, e.g. https://images.vandal.services */
  transformUrl: string
}

const IMAGE_EXTENSIONS: Record<string, string> = {
  avif: 'image/avif',
  gif: 'image/gif',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  png: 'image/png',
  svg: 'image/svg+xml',
  webp: 'image/webp'
}

const DEFAULT_PAGE_SIZE = 50
const MAX_SEARCH_PAGES = 20

function decodeXml(value: string): string {
  return value
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&')
}

type ListedObject = { key: string; size: number }

async function listPage(
  bucketUrl: string,
  maxKeys: number,
  token?: string
): Promise<{ objects: ListedObject[]; nextToken?: string }> {
  const url = new URL(bucketUrl)
  url.searchParams.set('list-type', '2')
  url.searchParams.set('max-keys', String(maxKeys))
  if (token) url.searchParams.set('continuation-token', token)

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`[vandal-media] listing failed: ${response.status}`)
  }
  const xml = await response.text()
  const objects = [...xml.matchAll(/<Contents>([\s\S]*?)<\/Contents>/g)].map(
    ([, body]) => ({
      key: decodeXml(body.match(/<Key>([\s\S]*?)<\/Key>/)?.[1] ?? ''),
      size: Number(body.match(/<Size>(\d+)<\/Size>/)?.[1] ?? 0)
    })
  )
  const truncated = /<IsTruncated>true<\/IsTruncated>/.test(xml)
  const nextToken = xml.match(
    /<NextContinuationToken>([\s\S]*?)<\/NextContinuationToken>/
  )?.[1]
  return {
    objects,
    nextToken: truncated && nextToken ? decodeXml(nextToken) : undefined
  }
}

export const createMediaProvider: CreateMediaProviderFn<VandalMediaConfig> = (
  config
): MediaProvider => {
  const bucketUrl = config.bucketUrl.replace(/\/+$/, '')
  const transformUrl = config.transformUrl.replace(/\/+$/, '')
  // images.vandal.services path: /{format,quality[,size]}/{source url}
  const imageUrl = (key: string, width?: number, height?: number) => {
    const format = key.toLowerCase().endsWith('.gif') ? 'gif' : 'auto'
    const size = [width && `w_${width}`, height && `h_${height}`].filter(
      Boolean
    )
    const transform = [`f_${format}`, 'q_90', ...size].join(',')
    return `${transformUrl}/${transform}/${bucketUrl}/${key}`
  }

  const toItem = ({ key, size }: ListedObject): MediaProviderItem | null => {
    const mimeType = IMAGE_EXTENSIONS[key.split('.').pop()?.toLowerCase() ?? '']
    if (!mimeType) return null
    return {
      id: key,
      filename: key.split('/').pop() ?? key,
      mimeType,
      size,
      previewUrl: imageUrl(key, 400)
    }
  }

  return {
    async list(options: MediaListOptions) {
      const limit = options.limit ?? DEFAULT_PAGE_SIZE
      const query = options.query?.trim().toLowerCase()

      if (!query) {
        const page = await listPage(bucketUrl, limit, options.cursor)
        return {
          items: page.objects.map(toItem).filter((item) => item !== null),
          nextCursor: page.nextToken
        }
      }

      // S3 listing only filters by prefix, so search walks the bucket
      // (a few hundred objects) and matches anywhere in the key.
      const matches: MediaProviderItem[] = []
      let token: string | undefined
      for (let pages = 0; pages < MAX_SEARCH_PAGES; pages++) {
        const page = await listPage(bucketUrl, 1000, token)
        for (const object of page.objects) {
          const item = toItem(object)
          if (item && object.key.toLowerCase().includes(query)) {
            matches.push(item)
          }
        }
        token = page.nextToken
        if (!token) break
      }
      const offset = Number(options.cursor ?? 0)
      const end = offset + limit
      return {
        items: matches.slice(offset, end),
        nextCursor: end < matches.length ? String(end) : undefined
      }
    },

    async get(id) {
      // Route params arrive percent-encoded (`images%2Ffooter.png`).
      const key = decodeURIComponent(id)
      const response = await fetch(`${bucketUrl}/${key}`, { method: 'HEAD' })
      if (!response.ok) return null
      return toItem({
        key,
        size: Number(response.headers.get('content-length') ?? 0)
      })
    },

    getEmbed(value, options) {
      const width = options?.width ?? value.width
      return {
        type: 'image',
        src: imageUrl(value.id, width),
        width: value.width,
        height: value.height,
        alt: value.alt,
        getSrc: ({ width }) => imageUrl(value.id, width)
      }
    },

    getThumbnailUrl(id, _mimeType, options) {
      return imageUrl(id, options?.width ?? 400, options?.height)
    }
  }
}
