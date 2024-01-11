<template>
  <main>
    <TheHeader />
    <slot />
    <TheFooter>
      <div class="mt-12 bg-gray-900">
        <div
          class="container flex flex-col items-center py-6 mx-auto gap-y-2 sm:flex-row lg:gap-x-8 lg:justify-center"
        >
          <h2
            class="text-white font-bold text-2xl leading-[1.875rem] text-center sm:text-left tracking-[-0.075rem] w-full lg:text-[2rem] lg:leading-[2.421rem] lg:tracking-[-0.1rem] lg:w-auto"
          >
            Quer desenvolver o seu projeto comigo?
          </h2>
          <NuxtLink
            to="https://wa.me/5511965712919"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center justify-center h-12 px-6 py-3 text-center text-gray-900 transition-colors bg-white rounded-lg hover:bg-gray-200 focus:bg-gray-500 sm:w-fit text-nowrap"
            >Solicite uma proposta</NuxtLink
          >
        </div>
      </div>
    </TheFooter>
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
      rel: 'preload',
      onload: "this.rel='stylesheet'",
    },
    {
      rel: 'preconnect',
      href: 'https://ik.imagekit.io/pedrohenri/',
      crossorigin: true,
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
