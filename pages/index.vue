<template>
  <div class="container flex flex-col mx-auto">
    <TheHomeHero />
    <TheHomeCategoryListing
      v-for="(category, index) in categories"
      :key="`category-${index}`"
      :class="{
        'mt-[7.5rem]': index !== Number(categories?.length) - 1,
        'my-[7.5rem]': index === Number(categories?.length) - 1,
      }"
      :category="category"
    />
  </div>
</template>

<script setup lang="ts">
import type { Category, Post } from '@/types'

const categoriesToFetch = ['design-de-interfaces', 'identidade-visual']

const { data: categories } = await useAsyncData('categories', async () => {
  const [categories, ...posts] = await Promise.all([
    queryContent('/categories')
      .where({ slug: { $in: categoriesToFetch }, draft: false, private: false })
      .only([
        'name',
        'slug',
        'description',
        'ctaText',
        'featuresTitle',
        'features',
      ])
      .find(),
    queryContent('/posts')
      .where({
        categoriesSlug: { $in: categoriesToFetch[0] },
        draft: false,
        private: false,
      })
      .only(['cover', 'title', 'slug', 'categoriesSlug', 'categoriesName'])
      .sort({ createdAt: -1 })
      .limit(4)
      .find(),

    queryContent('/posts')
      .where({
        categoriesSlug: { $in: categoriesToFetch[1] },
        draft: false,
        private: false,
      })
      .only(['cover', 'title', 'slug', 'categoriesSlug', 'categoriesName'])
      .sort({ createdAt: -1 })
      .limit(4)
      .find(),
  ])
  return categories.map((category) => {
    const postsByCategory = posts
      .flat()
      .filter((post) => post.categoriesSlug.includes(category.slug))

    return {
      ...(category as Category),
      posts: postsByCategory as Post[],
    }
  }) as Category[]
})

useHead({
  title: 'Pedro Henri Design - Inovação em cada pixel',
  titleTemplate: '%s',
})

useSeoMeta({
  ogTitle: 'Pedro Henri Design - Inovação em cada pixel',
  description:
    'O poder do design que se destaca em um mundo de ruídos. Crio identidades visuais, sites e experiências de UI/UX para marcas que visam o crescimento e inovação.',
  ogDescription:
    'O poder do design que se destaca em um mundo de ruídos. Crio identidades visuais, sites e experiências de UI/UX para marcas que visam o crescimento e inovação.',
  ogImage: 'https://ik.imagekit.io/pedrohenri/images/imagem-social.png',
  twitterCard: 'summary_large_image',
})
</script>
