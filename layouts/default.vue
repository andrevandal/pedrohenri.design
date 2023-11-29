<template>
  <main>
    <TheHeader />
    <slot />
  </main>
</template>

<script setup>
useHead({
  link: [
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossorigin: true,
    },
    {
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400..900&display=swap',
      rel: 'stylesheet',
    },
    {
      rel: 'icon',
      href: '/favicon.svg',
    },
    {
      ref: 'mask-icon',
      href: '/mask-icon.svg',
      color: '#262E33',
    },
  ],
})
</script>

<style>
.nuxt-icon svg {
  margin-bottom: 0;
}
</style>
