<template>
  <div class="container flex flex-col mx-auto">
    <TheHomeCategoryListing
      class="mt-4 lg:mt-[3.25rem] mb-[7.5rem]"
      :category="category"
    />
  </div>
</template>

<script setup>
const category = {
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
}
</script>
