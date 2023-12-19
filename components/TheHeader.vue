<template>
  <header class="bg-white">
    <nav
      class="container relative flex items-center justify-between mx-auto"
      aria-label="Global"
    >
      <div class="flex items-center justify-between w-full py-4 gap-x-12">
        <NuxtLink to="/">
          <span class="sr-only">Pedro Henrique Design</span>
          <img
            class="w-auto h-10 aspect-[213/40]"
            src="/images/logo-horizontal.svg"
            height="40"
            width="214"
            alt=""
          />
        </NuxtLink>
        <div>
          <div class="hidden lg:flex lg:items-center">
            <NuxtLink
              v-for="link in navigation"
              :key="link.href"
              :to="link.href"
              :as="NuxtLink"
              class="flex items-center justify-start px-4 py-2 text-base font-medium text-gray-900 h-9"
            >
              {{ link.shortName }}
            </NuxtLink>
            <NuxtLink
              v-if="callToAction.href"
              :href="callToAction.href"
              :as="NuxtLink"
              class="inline-flex items-center justify-center h-12 px-6 py-3 mt-2 text-base font-medium text-center text-gray-900 transition-all border border-gray-900 rounded-lg lg:mt-0 lg:ml-4 lg:px-4 lg:py-2 hover:text-white focus:text-white hover:bg-gray-900 focus:right-1 focus:ring-gray-900"
            >
              {{ callToAction.name }}
            </NuxtLink>
          </div>
          <button
            class="block w-10 h-10 text-gray-900 transition-colors border border-transparent rounded-lg lg:hidden"
            @click="setIsOpen(true)"
          >
            <Bars3Icon />
          </button>
        </div>
      </div>
      <TransitionRoot :show="isOpen" as="template">
        <Dialog class="relative z-50 lg:hidden trans" @close="setIsOpen">
          <TransitionChild
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
          </TransitionChild>

          <div class="fixed top-0 w-full">
            <TransitionChild
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95 translate-y-[-50%]"
              enter-to="opacity-100 scale-100 translate-y-0"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100 translate-y-0"
              leave-to="opacity-0 scale-95 translate-y-[-50%]"
            >
              <DialogPanel class="w-full bg-white rounded-b-lg">
                <div class="container mx-auto">
                  <div class="flex flex-row justify-between py-4 gap-x-12">
                    <NuxtLink to="/">
                      <span class="sr-only">Pedro Henrique Design</span>
                      <img
                        class="w-auto h-10 lg:h-12 aspect-[256/48]"
                        src="/images/logo-horizontal.svg"
                        height="48"
                        width="256"
                        alt=""
                      />
                    </NuxtLink>
                    <button
                      class="block w-10 h-10 text-gray-900 transition-colors border border-gray-300 rounded-lg lg:hidden"
                      @click="setIsOpen(false)"
                    >
                      <XMarkIcon />
                    </button>
                  </div>
                  <div class="flex flex-col">
                    <NuxtLink
                      v-for="link in navigation"
                      :key="link.href"
                      :to="link.href"
                      :as="NuxtLink"
                      class="h-12 py-3 text-base font-medium text-gray-900"
                    >
                      {{ link.name }}
                    </NuxtLink>
                    <NuxtLink
                      v-if="callToAction.href"
                      :href="callToAction.href"
                      :as="NuxtLink"
                      class="inline-flex items-center justify-center h-12 px-6 py-3 mt-2 mb-6 text-base font-medium text-center text-gray-900 transition-all border border-gray-900 rounded-lg hover:text-white focus:text-white hover:bg-gray-900 focus:right-1 focus:ring-gray-900"
                    >
                      {{ callToAction.name }}
                    </NuxtLink>
                  </div>
                </div>
                <!-- ... -->
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </TransitionRoot>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue'

import {
  Dialog,
  DialogPanel,
  TransitionRoot,
  TransitionChild,
} from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

import { NuxtLink } from '#components'

const navigation = [
  {
    name: 'Identidade Visual',
    shortName: 'ID Visual',
    href: '/categorias/identidade-visual/',
  },
  {
    name: 'Design de Interfaces',
    shortName: 'Interfaces',
    href: '/categorias/design-de-interfaces/',
  },
]

const callToAction = {
  name: 'Contato',
  href: 'https://wa.me/5511965712919',
}

const isOpen = ref(false)

function setIsOpen(value) {
  isOpen.value = value
}
</script>
