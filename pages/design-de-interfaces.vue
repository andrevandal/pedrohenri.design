<template>
  <div class="container flex flex-col mx-auto">
    <TheHomeCategoryListing
      class="mt-4 lg:mt-[3.25rem] mb-[6.25rem]"
      :category="category"
    />
  </div>
</template>

<script setup>
const category = {
  title: 'UI Design',
  posts: [
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
  ],
  featuresTitle: 'Concepção orientada a resultado',
  features: [
    {
      iconName: 'mapeamento',
      title: 'Mapeamento',
      description:
        'Reunimos os dados indispensáveis para o desenvolvimento da interface através de um briefing detalhado.',
    },
    {
      iconName: 'prototipo',
      title: 'Protótipo',
      description:
        'Pensando na melhor experiência do usuário e na entrega de resultados tangíveis, desenvolvemos um protótipo interativo.',
    },
    {
      iconName: 'codificacao',
      title: 'Codificação',
      description:
        'Após a aprovação, damos vida ao protótipo, transformando-o em uma página web plenamente funcional.',
    },
    {
      iconName: 'otimizacao-seo',
      title: 'Otimização SEO',
      description:
        'Executamos a otimização para assegurar alto desempenho, garantindo acessibilidade e resultados eficientes.',
    },
  ],
}
</script>
