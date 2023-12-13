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
import type { Category } from '@/types'

const categoriesToFetch = ['design-de-interfaces', 'identidade-visual']

const { data: categories } = await useAsyncData('categories', async () => {
  const [categories, ...posts] = await Promise.all([
    queryContent('/categories')
      .where({ slug: { $in: categoriesToFetch }, draft: false, private: false })
      .only([
        'title',
        'slug',
        'description',
        'ctaText',
        'featuresTitle',
        'features',
      ])
      .find(),
    queryContent('/posts')
      .where({
        categories: { $in: categoriesToFetch[0] },
        draft: false,
        private: false,
      })
      .only(['cover', 'title', 'slug', 'categories'])
      .sort({ createdAt: -1 })
      .limit(4)
      .find(),

    queryContent('/posts')
      .where({
        categories: { $in: categoriesToFetch[1] },
        draft: false,
        private: false,
      })
      .only(['cover', 'title', 'slug', 'categories'])
      .sort({ createdAt: -1 })
      .limit(4)
      .find(),
  ])
  return categories.map((category) => {
    const postsByCategory = posts
      .flat()
      .filter((post) => post.categories.includes(category.slug))

    return {
      ...category,
      posts: postsByCategory,
    }
  }) as Category[]
})
</script>
