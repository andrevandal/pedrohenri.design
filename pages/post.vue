<template>
  <article class="container flex flex-col pt-4 mx-auto gap-y-8">
    <header class="flex flex-col">
      <span class="text-sm leading-[1.059rem] text-gray-500 uppercase"
        >Identidade Visual</span
      >
      <h1 class="font-bold text-[2rem] leading-[2.421rem]">Nome da Marca</h1>
    </header>
    <div class="w-full max-w-full prose">
      <NuxtImg
        src="https://picsum.photos/id/237/960/538"
        width="375"
        height="210"
        sizes="375px, sm:496px, lg:960px"
        class="aspect-[375/210] rounded-t-lg w-full h-auto mb-0"
        alt=""
      />
      <NuxtImg
        src="https://picsum.photos/id/25/960/538"
        width="375"
        height="210"
        sizes="375px, sm:496px, lg:960px"
        class="aspect-[375/210] w-full h-auto my-0"
        alt=""
      />
      <NuxtImg
        src="https://picsum.photos/id/28/960/538"
        width="375"
        height="210"
        sizes="375px, sm:496px, lg:960px"
        class="aspect-[375/210] w-full h-auto my-0"
        alt=""
      />
      <NuxtImg
        src="https://picsum.photos/id/100/960/538"
        width="375"
        height="210"
        sizes="375px, sm:496px, lg:960px"
        class="aspect-[375/210] w-full h-auto my-0"
        alt=""
      />
      <NuxtImg
        src="https://picsum.photos/id/120/960/538"
        width="375"
        height="210"
        sizes="375px, sm:496px, lg:960px"
        class="aspect-[375/210] w-full h-auto my-0"
        alt=""
      />
      <NuxtImg
        src="https://picsum.photos/id/180/960/538"
        width="375"
        height="210"
        sizes="375px, sm:496px, lg:960px"
        class="aspect-[375/210] w-full h-auto my-0"
        alt=""
      />
      <NuxtImg
        src="https://picsum.photos/id/56/960/538"
        width="375"
        height="210"
        sizes="375px, sm:496px, lg:960px"
        class="aspect-[375/210] w-full h-auto mt-0 rounded-b-lg"
        alt=""
      />
    </div>
  </article>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'post',
})
</script>
