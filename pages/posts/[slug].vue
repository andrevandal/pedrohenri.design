<template>
  <article class="container flex flex-col pt-4 mx-auto gap-y-8">
    <ContentRenderer v-if="data" :value="data">
      <header class="flex flex-col">
        <NuxtLink
          v-if="data.categorySlug && data.categoryName"
          :to="`/categorias/${data.categorySlug}/`"
          class="text-sm leading-[1.059rem] text-gray-500 uppercase"
          >{{ data.categoryName }}</NuxtLink
        >
        <h1 class="font-bold text-[2rem] leading-[2.421rem]">
          {{ data.title }}
        </h1>
      </header>
      <ContentRendererMarkdown :value="data" class="w-full max-w-full prose" />
    </ContentRenderer>
  </article>
</template>

<script setup lang="ts">
import type { Post } from '~/types'

definePageMeta({
  layout: 'post',
})

const route = useRoute()
const slug = route.params?.slug?.toString()

const { data } = await useAsyncData(`post-${slug}`, async () => {
  const post = await queryContent<Post>('/posts')
    .where({
      slug,
      draft: false,
    })
    .findOne()

  return {
    ...(post as Post),
    categorySlug: post?.categoriesSlug?.[0],
    categoryName: post?.categoriesName?.[0],
  }
})
</script>
