<template>
  <div class="container flex flex-col mx-auto">
    <TheHomeHero />
    <TheHomeCategoryListing
      v-for="(category, index) in categories"
      :key="`category-${index}`"
      :class="{
        'mt-[7.5rem]': index !== categories.length - 1,
        'my-[7.5rem]': index === categories.length - 1,
      }"
      :category="category"
    />
  </div>
</template>

<script setup>
const categories = [
  {
    title: 'Identidade Visual',
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
    cta: {
      text: 'Portifólio completo',
      href: '/identidade-visual/',
    },
    featuresTitle: 'Bastidores da inovação da marca',
    features: [
      {
        iconName: 'descoberta',
        title: 'Descoberta',
        description:
          'Coletamos as informações essenciais para o desenvolvimento através de um briefing detalhado.',
      },
      {
        iconName: 'concepcao',
        title: 'Concepção',
        description:
          'A direção do projeto é guiada por muita análise, estudos de mercado e referências visuais nesta fase.',
      },
      {
        iconName: 'apresentacao',
        title: 'Apresentação',
        description:
          'Revelamos o projeto completo, detalhando a evolução e o conceito inerente à solução idealizada.',
      },
      {
        iconName: 'entrega',
        title: 'Entrega',
        description:
          'Disponibilizamos os documentos para a utilização nas mídias de veiculação, junto a guias práticas.',
      },
    ],
  },
  {
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
    cta: {
      text: 'Portifólio completo',
      href: '/design-de-interfaces/',
    },
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
  },
]
</script>
