import type { MediaValue } from 'emdash'
import { getImageUrl } from './image'

const MEDIA_ROUTE = '/_emdash/api/media/file/'

/**
 * Absolute share-image URL (Open Graph / Twitter) for an EmDash image value.
 *
 * - `vandal` provider (existing files.vandal.services objects): cropped to
 *   1200×630 by images.vandal.services.
 * - EmDash library uploads: the storage key through `resolveStorageKey`
 *   (`Astro.locals.emdash.getPublicMediaUrl`), else `src`, else the internal
 *   media route.
 */
export function socialImageUrl(
  media:
    Pick<MediaValue, 'id' | 'src' | 'meta' | 'provider'> | null | undefined,
  origin: URL | string,
  resolveStorageKey?: (key: string) => string
): string {
  if (!media) return ''
  if (media.provider === 'vandal') {
    return getImageUrl(media.id, 'f_auto,q_90,w_1200,h_630')
  }
  const storageKey = media.meta?.storageKey
  let path = ''
  if (typeof storageKey === 'string' && storageKey) {
    path = resolveStorageKey
      ? resolveStorageKey(storageKey)
      : `${MEDIA_ROUTE}${storageKey}`
  } else if (media.src) {
    path = media.src
  } else if (media.id) {
    path = `${MEDIA_ROUTE}${media.id}`
  }
  return path ? new URL(path, origin).href : ''
}
