export type Post = {
  title: string
  slug: string
  content: string
  socialImage: string
  description: string
  cover: {
    provider: string
    image: string
    alternativeText: string
  }
  categoriesName: string
  categoriesSlug: string
}
export type Category = {
  title: string
  slug: string
  description: string
  ctaText: string
  socialImage: string
  cover: {
    provider: string
    image: string
    alternativeText: string
  }
  featuresTitle: string
  features: {
    iconName: string
    title: string
    description: string
  }[]
  posts: Post[]
}
