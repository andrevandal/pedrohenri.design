<template>
  <footer class="flex flex-col gap-y-12">
    <slot />
    <div class="container flex flex-col mx-auto gap-y-4">
      <div class="flex justify-between w-full">
        <NuxtLink
          to="/"
          class="transition-opacity hover:opacity-80 focus:opacity-60"
        >
          <span class="sr-only">Pedro Henrique Design</span>
          <img
            class="w-auto h-8 aspect-[171/32]"
            src="/images/logo-horizontal.svg"
            height="32"
            width="171"
            alt=""
          />
        </NuxtLink>
        <div class="flex gap-x-4 text-[2rem] text-gray-900">
          <NuxtLink
            href="https://www.instagram.com/pedrohenri.design/"
            target="_blank"
            rel="noopener noreferrer"
            class="transition-opacity hover:opacity-80 focus:opacity-60"
          >
            <span class="sr-only">Instagram</span>
            <NuxtIcon name="instagram" filled />
          </NuxtLink>
          <NuxtLink
            href="https://www.linkedin.com/in/pedro-henrique-92b806bb/"
            target="_blank"
            rel="noopener noreferrer"
            class="transition-opacity hover:opacity-80 focus:opacity-60"
          >
            <span class="sr-only">LinkedIn</span>
            <NuxtIcon name="linkedin" filled />
          </NuxtLink>
        </div>
      </div>

      <div
        class="flex items-center justify-center w-full h-12 mx-auto border-t border-t-gray-100"
      >
        <span class="text-base leading-4 text-center text-gray-900"
          >© {{ currentYear }} | Pedro Henri Design</span
        >
      </div>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>
