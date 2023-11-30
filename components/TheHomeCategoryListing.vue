<template>
  <section class="flex flex-col flex-wrap gap-6 lg:flex-row">
    <h2
      class="block text-center text-gray-900 text-[2rem] leading-[2.421rem] lg:leading-[3.026rem] font-bold lg:text-[2.5rem] order-1 lg:mr-auto"
    >
      Identidade Visual
    </h2>
    <div class="flex flex-col order-2 gap-4 lg:grid lg:order-3 lg:grid-cols-2">
      <NuxtLink
        v-for="(post, pIndex) in posts"
        :key="`post-${pIndex}`"
        class="block"
      >
        <NuxtImg
          :src="post.src"
          :alt="post.alt"
          class="rounded-lg aspect-square"
          width="600"
          height="600"
        />
      </NuxtLink>
    </div>
    <div class="flex items-center order-3 sm:flex sm:justify-center lg:order-2">
      <NuxtLink
        to="#"
        class="flex items-center justify-center w-full h-12 px-6 py-3 text-center text-gray-900 transition-colors border border-gray-900 rounded-lg lg:h-10 hover:bg-gray-50 focus:bg-transparent focus:border-transparent sm:w-fit"
      >
        Portifólio completo
      </NuxtLink>
    </div>
  </section>
</template>

<script setup>
const posts = [
  {
    href: '#',
    src: 'https://placehold.co/600',
    alt: '',
  },
  {
    href: '#',
    src: 'https://placehold.co/600',
    alt: '',
  },
  {
    href: '#',
    src: 'https://placehold.co/600',
    alt: '',
  },
  {
    href: '#',
    src: 'https://placehold.co/600',
    alt: '',
  },
]
</script>
