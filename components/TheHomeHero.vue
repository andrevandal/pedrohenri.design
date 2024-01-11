<template>
  <section
    class="flex flex-col py-4 bg-gray-100 rounded-lg lg:flex-row sm:pb-8 lg:justify-between lg:items-center lg:py-8 lg:px-8"
  >
    <div
      class="flex flex-col order-2 gap-2 px-4 sm:px-10 lg:order-1 lg:px-0 lg:max-w-[29.25rem]"
    >
      <h1
        class="font-bold text-[2rem] lg:text-[3rem] leading-[2.375rem] lg:leading-[3.375rem] tracking-[-0.1rem] lg:tracking-[-0.15rem] text-gray-900 max-w-[38ch]"
      >
        Em um mundo cheio de barulho,<br />
        o design fala mais alto.
      </h1>
      <p class="max-w-[38ch] text-xl lg:text-2xl text-gray-900">
        As marcas com crescimento mais expressivo são aquelas que valorizam e
        investem em design.
      </p>
      <NuxtLink
        to="/#identidade-visual"
        class="flex items-center justify-center w-full h-12 px-6 py-3 mt-4 text-center transition-colors bg-gray-900 rounded-lg text-gray-50 hover:bg-gray-700 focus:bg-gray-500 sm:w-fit"
      >
        Conheça meu trabalho
      </NuxtLink>
    </div>
    <div class="order-1 lg:order-2 w-full h-auto aspect-[9/10] block">
      <NuxtImg
        src="/images/primeira-dobra.png?updatedAt=1704811637285"
        sizes="268px xs:288px sm:496px lg:525px"
        class="w-full h-auto aspect-[9/10]"
        provider="imagekit"
        alt="Pedro Henrique pensativo segurando sua caneta (da mesa digitalizadora) olhado para frente."
        loading="eager"
        preload
      />
    </div>
  </section>
  <section class="flex flex-col mt-6 mb-5 gap-y-6 lg:flex-row lg:gap-x-6">
    <div class="order-1 lg:order-2 lg:flex-1">
      <NuxtImg
        src="/images/sessao_crio-para-marcas.png?updatedAt=1704811637276"
        sizes="268px xs:288px sm:496px"
        class="w-full h-auto rounded-lg aspect-square"
        provider="imagekit"
        alt="Pedro Henrique pensativo segurando sua caneta (da mesa digitalizadora) sentado em sua cadeira. Algo comum em seu cotidiano."
        loading="lazy"
        decoding="async"
      />
    </div>
    <div
      class="order-2 lg:order-1 lg:flex-1 lg:flex lg:flex-col lg:justify-center"
    >
      <h2
        class="font-bold text-[2rem] lg:text-[3rem] leading-[2.375rem] lg:leading-[3.375rem] tracking-[-0.1rem] lg:tracking-[-0.15rem] text-gray-900 max-w-[38ch]"
      >
        Crio para marcas que visam o crescimento e inovação.
      </h2>
      <p class="max-w-[38ch] text-xl lg:text-2xl text-gray-900 mt-2">
        Transformo a essência singular da sua marca em soluções para conduzi-la
        ao sucesso.
      </p>
    </div>
  </section>
</template>
