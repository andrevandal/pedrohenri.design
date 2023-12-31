<template>
  <div class="container flex flex-col mx-auto">
    <TheHomeCategoryListing
      class="mt-4 lg:mt-[3.25rem] mb-[7.5rem]"
      :category="category"
    />
  </div>
</template>

<script setup lang="ts">
import type { Category } from '@/types'

const route = useRoute()
const slug = route.params?.slug?.toString()

const { data: category } = await useAsyncData(`category-${slug}`, async () => {
  const [category, posts] = await Promise.all([
    queryContent('/categories')
      .where({ slug, draft: false })
      .only([
        'title',
        'slug',
        'description',
        'featuresTitle',
        'features',
        'socialImage',
      ])
      .find(),
    queryContent('/posts')
      .where({
        categoriesSlug: { $in: [slug] },
        draft: false,
        private: false,
      })
      .only(['cover', 'title', 'slug', 'categoriesSlug', 'categoriesName'])
      .sort({ createdAt: -1 })
      .limit(4)
      .find(),
  ])

  return {
    ...category[0],
    posts,
  } as Category
})

useSeoMeta({
  title: category.value?.title,
  ogTitle: category.value?.title,
  description: category.value?.description,
  ogDescription: category.value?.description,
  ogImage: category.value?.socialImage,
  twitterCard: 'summary_large_image',
  twitterTitle: category.value?.title,
  twitterDescription: category.value?.description,
  twitterImage: category.value?.socialImage,
})
</script>
