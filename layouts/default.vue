<template>
  <main>
    <TheHeader />
    <slot />
    <TheFooter>
      <div class="container flex flex-col gap-6 mx-auto lg:flex-row">
        <div class="flex flex-col lg:flex-1 gap-y-4 lg:justify-center">
          <h2
            class="font-bold text-[2rem] lg:text-[3rem] leading-[2.375rem] lg:leading-[3.375rem] tracking-[-0.1rem] lg:tracking-[-0.15rem] text-gray-900 max-w-[38ch]"
          >
            Quer desenvolver o seu projeto comigo?
          </h2>
          <p class="max-w-[38ch] text-xl lg:text-2xl text-gray-900">
            Dê o primeiro passo agora.
          </p>
          <NuxtLink
            to="https://wa.me/5511965712919"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center justify-center w-full h-12 px-6 py-3 mt-2 text-center transition-colors bg-gray-900 rounded-lg text-gray-50 hover:bg-gray-700 focus:bg-gray-500 sm:w-fit"
            >Solicite uma proposta</NuxtLink
          >
        </div>
        <div class="lg:flex-1">
          <LazyNuxtImg
            src="/images/footer.png?updatedAt=1704811637375"
            alt="Pedro Henrique sorrindo com as mãos cruzadas a frente e vestido socialmente."
            sizes="343px sm:540px lg:352px"
            class="w-full h-auto rounded-lg aspect-square"
            provider="imagekit"
            loading="lazy"
            decoding="async"
          />
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
      as: 'style',
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
