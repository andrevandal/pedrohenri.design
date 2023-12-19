<template>
  <section v-if="category" class="flex flex-col flex-wrap gap-6 lg:flex-row">
    <h2
      class="block text-gray-900 text-[2rem] leading-[2.421rem] lg:leading-[3.026rem] font-bold lg:text-[2.5rem] order-1 lg:mr-auto"
    >
      {{ category.title }}
    </h2>
    <div class="flex flex-col order-2 gap-4 lg:grid lg:order-3 lg:grid-cols-2">
      <NuxtLink
        v-for="(post, pIndex) in category.posts"
        :key="`post-${pIndex}`"
        class="block"
        :to="`/posts/${post.slug}/`"
      >
        <NuxtImg
          :src="post.cover.image"
          :alt="post.cover.alternativeText"
          :provider="post.cover.provider"
          class="rounded-lg aspect-square"
          width="600"
          height="600"
        />
      </NuxtLink>
    </div>
    <div
      v-if="!!category?.ctaText"
      class="flex items-center order-3 sm:flex sm:justify-center lg:order-2"
    >
      <NuxtLink
        :to="`/categorias/${category?.slug}/`"
        class="flex items-center justify-center w-full h-12 px-6 py-3 text-center text-gray-900 transition-colors border border-gray-900 rounded-lg hover:bg-gray-50 focus:bg-transparent focus:border-transparent sm:w-fit"
      >
        {{ category?.ctaText }}
      </NuxtLink>
    </div>
    <div class="order-4 mt-[3.25rem] lg:mt-12">
      <h3
        class="text-[2rem] leading-10 font-bold text-gray-900 lg:text-[2rem] sm:leading-[2.375rem]"
      >
        {{ category.featuresTitle }}
      </h3>
      <div
        class="flex flex-col gap-6 mt-8 sm:mt-6 sm:gap-4 lg:grid lg:gap-6 lg:grid-cols-2"
      >
        <div
          v-for="(feature, fIndex) in category.features"
          :key="`feature-${fIndex}`"
          class="flex flex-col items-start justify-center gap-2"
        >
          <NuxtIcon
            :name="feature.iconName"
            class="flex items-center justify-center w-12 h-12 text-2xl leading-6 text-gray-900 rounded-lg bg-gray-50"
            :class="[
              {
                'text-[2rem]': feature.iconName === 'otimizacao-seo',
              },
            ]"
            filled
          />
          <h4 class="text-gray-900 text-2xl leading-[1.816rem] font-bold">
            {{ feature.title }}
          </h4>
          <p class="text-gray-500 text-base leading-[1.375rem] text-balance">
            {{ feature.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Category } from '@/types'

type Props = {
  category?: Category | null
}

const { category } = defineProps<Props>()
</script>
