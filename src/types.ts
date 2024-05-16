export const availableIcons = [
  'apresentacao',
  'codificacao',
  'concepcao',
  'descoberta',
  'entrega',
  'instagram',
  'linkedin',
  'mapeamento',
  'otimizacao-seo',
  'prototipo',
  'mdi:linkedin',
  'mdi:instagram',
  'logos:linkedin-icon',
  'logos:instagram-icon'
] as const

export type AvailableIcons = (typeof availableIcons)[number]
