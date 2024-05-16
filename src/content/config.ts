import { z, defineCollection, reference } from 'astro:content'
import { availableIcons } from '@/types'

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    socialImage: z.string().url(),
    cover: z.object({
      image: z.string(),
      alternativeText: z.string(),
      source: z.string()
    }),
    draft: z.boolean().default(true),
    private: z.boolean().default(false),
    categories: z.array(reference('categories')),
    updatedAt: z.coerce.date().optional(),
    createdAt: z.coerce.date().default(new Date())
  })
})

const categories = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    description: z.string(),
    private: z.boolean().default(false),
    draft: z.boolean().default(true),
    socialImage: z.string().url(),
    showcase: z.coerce.number().default(0),
    ctaText: z.string().optional(),
    featuresTitle: z.string().optional(),
    features: z
      .array(
        z.object({
          iconName: z.enum(availableIcons),
          title: z.string(),
          description: z.string()
        })
      )
      .optional()
      .default([])
  })
})

export const collections = {
  posts,
  categories
}
