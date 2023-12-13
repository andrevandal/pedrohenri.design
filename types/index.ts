export type Category = {
  title: string
  slug: string
  description: string
  ctaText: string
  featuresTitle: string
  features: {
    iconName: string
    title: string
    description: string
  }[]
  posts: {
    title: string
    slug: string
    cover: {
      provider: string
      image: string
      alternativeText: string
    }
  }[]
}
