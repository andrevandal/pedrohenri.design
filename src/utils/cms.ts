import type { Category, Post } from '../../emdash-env'
import type { Features } from '@/types'

type Entry<T> = { id: string; data: T }

export type PostCard = {
  id: string
  title: string
  cover: Post['cover']
}

export type CategoryListing = {
  id: string
  name: string
  description: string
  ctaText?: string
  featuresTitle?: string
  features: Features
  posts: PostCard[]
}

/** Newest first, by the post's editorial date. */
export function sortPostsByDate<T extends Entry<Post>>(posts: T[]): T[] {
  return [...posts].sort(
    (a, b) => Date.parse(b.data.date) - Date.parse(a.data.date)
  )
}

export function toCategoryListing(
  category: Entry<Category>,
  posts: Entry<Post>[]
): CategoryListing {
  const { data } = category
  return {
    id: category.id,
    name: data.name,
    description: data.description,
    ctaText: data.cta_text,
    featuresTitle: data.features_title,
    features: (data.features ?? []).map(({ icon, title, description }) => ({
      iconName: icon,
      title,
      description
    })),
    posts: posts.map(({ id, data }) => ({
      id,
      title: data.title,
      cover: data.cover
    }))
  }
}
