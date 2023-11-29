<template>
  <div class="container mx-auto">
    <section
      class="flex flex-col py-4 mx-auto bg-gray-100 rounded-lg lg:flex-row sm:pb-8 lg:justify-between lg:items-center lg:py-8 lg:px-8"
    >
      <div
        class="flex flex-col order-2 gap-2 px-4 sm:px-10 lg:order-1 lg:px-0 lg:max-w-[29.25rem]"
      >
        <h1
          class="font-bold text-[2rem] lg:text-[3rem] leading-[2.375rem] lg:leading-[3.375rem] tracking-[-0.1rem] lg:tracking-[-0.15rem] text-gray-900 max-w-[38ch]"
        >
          Identidade visual
        </h1>
        <p class="max-w-[38ch] text-xl lg:text-2xl text-gray-900">
          As marcas com crescimento mais expressivo são aquelas que valorizam e
          investem em design.
        </p>
        <NuxtLink
          to="#"
          class="flex items-center justify-center w-full h-12 px-6 py-3 mt-4 text-center transition-colors bg-gray-900 rounded-lg lg:h-10 text-gray-50 hover:bg-gray-700 focus:bg-gray-500 sm:w-fit"
        >
          Conheça meu trabalho
        </NuxtLink>
      </div>
      <div class="order-1 lg:order-2">
        <NuxtImg
          src="/images/primeira-dobra.png"
          sizes="343px sm:540px lg:352px"
          class="w-full h-auto aspect-[9/10]"
        />
      </div>
    </section>
  </div>
</template>
