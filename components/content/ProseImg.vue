<template>
  <component
    :is="lazy ? LazyNuxtImg : NuxtImg"
    :provider="provider"
    :src="src"
    :width="width"
    :height="height"
    :sizes="sizes"
    :class="[
      `aspect-[${width}/${height}] w-full h-auto my-0`,
      {
        'rounded-t-lg': roundedT,
        'rounded-b-lg': roundedB,
      },
    ]"
    :alt="alt === true ? '' : alt"
    :loading="lazy ? 'lazy' : 'eager'"
    :decoding="lazy ? 'async' : 'sync'"
  />
</template>

<script setup lang="ts">
import { LazyNuxtImg, NuxtImg } from '#components'

type Props = {
  src: string
  width?: number
  height?: number
  sizes?: string
  provider?: string
  roundedB?: boolean
  roundedT?: boolean
  lazy?: boolean
  alt: any
}
const { provider, src, alt, width, height, sizes, roundedB, roundedT, lazy } =
  withDefaults(defineProps<Props>(), {
    width: 375,
    height: 210,
    sizes: '375px, sm:496px, lg:960px',
    provider: undefined,
    roundedB: false,
    roundedT: false,
    lazy: true,
    alt: '',
  })
</script>
