// import { screens as screenSizes } from 'tailwind.config.mjs'

// type ScreenKey = keyof typeof screenSizes

const IPX_ENDPOINT = 'https://ipx.vandal.services'
const BUCKET_ENDPOINT = 'https://files.vandal.services'
const BUCKET_NAME = 'pedrohenri.design'

export function getImageUrl(imagePath: string, transform = '_') {
  // https://ipx.vandal.services/_/https://files.vandal.services/pedrohenri.design/images/footer.png
  return `${IPX_ENDPOINT}/${transform}/${BUCKET_ENDPOINT}/${BUCKET_NAME}/${imagePath}`.replace(
    /([^:]\/)\/+/g,
    '$1'
  )
}

type Screens = {
  [key: string]: string
}

const screens: Screens = {
  xs: '480px',
  sm: '640px',
  lg: '1024px',
  xl: '1280px'
}

type Sizes = {
  [key: string]: string
}

function parseSizes(sizes: string): Sizes {
  const sizePairs = sizes.split(' ')
  const result: Sizes = {}

  sizePairs.forEach((sizePair) => {
    const [breakpoint, size] = sizePair.includes(':')
      ? sizePair.split(':')
      : ['default', sizePair]
    result[breakpoint] = size
  })

  return result
}

function generateSrcSet(src: string, sizes: Sizes): string {
  const srcSetParts: string[] = []

  for (const size in sizes) {
    const width = sizes[size].replace('px', '')
    srcSetParts.push(`${getImageUrl(src, `f_auto,q_90,w_${width}`)} ${width}w`)
  }

  return srcSetParts.join(', ')
}

function generateSizesString(sizes: Sizes): string {
  const sizesParts: { mediaQuery: string; size: string }[] = []
  const defaultSize = sizes['default']

  for (const size in sizes) {
    if (size !== 'default') {
      const mediaQuery = screens[size]
      if (mediaQuery) {
        sizesParts.push({ mediaQuery, size: sizes[size] })
      }
    }
  }

  // Ordenar sizesParts em ordem crescente de mediaQuery
  sizesParts.sort((a, b) => parseInt(b.mediaQuery) - parseInt(a.mediaQuery))

  const sizesStringParts = sizesParts.map(
    (part) => `(min-width: ${part.mediaQuery}) ${part.size}`
  )

  if (defaultSize) {
    sizesStringParts.push(`${defaultSize}`)
  }

  return sizesStringParts.join(', ')
}

export function generateImageProps(src: string, sizes: string) {
  const parsedSizes = parseSizes(sizes)

  const maxWidth = Math.max(
    ...Object.values(parsedSizes).map((size) =>
      parseInt(size.replace('px', ''))
    )
  )

  const srcSet = generateSrcSet(src, parsedSizes)
  const sizesString = generateSizesString(parsedSizes)

  return {
    src: getImageUrl(src, `f_auto,q_90,w_${maxWidth}`),
    srcSet,
    sizes: sizesString
  }
}
// function pxToNumber(value?: string | null) {
//   if (!value) return 0
//   return Number(value.replace('px', ''))
// }

// export function parseSizes(sizes: string) {
//   const sizeMap = {} as Record<ScreenKey | 'default', string>
//   const sizeArray = sizes.split(' ')
//   let bigestSize: string | null = null

//   sizeArray.forEach((size) => {
//     const [screen, value] = parseSizePair(size)

//     if (!screen) {
//       sizeMap['default'] = value
//       return
//     }

//     if (screen in screenSizes) {
//       sizeMap[screen] = value
//       if (!sizeMap['default'] && pxToNumber(bigestSize) < pxToNumber(value)) {
//         bigestSize = value
//       }
//     }
//   })

//   if (!!bigestSize) {
//     sizeMap['default'] = bigestSize
//   }

//   return sizeMap
// }

// export function parseSizes(input: string) {
//   const sizes: Record<string, string> = {}
//   for (const entry of input.split(/[\s,]+/).filter((e) => e)) {
//     const s = entry.split(':')
//     if (s.length !== 2) {
//       sizes['default'] = s[0].trim()
//     } else {
//       sizes[s[0].trim()] = s[1].trim()
//     }
//   }
//   return sizes as Record<ScreenKey | 'default', string>
// }

// export function getSizes(imagePath: string, rawSizes: string) {
//   const { default: defaultSize, ...sizes } = parseSizes(rawSizes)

//   const generateSizes = () => {
//     const sortedSizes = Object.entries(sizes)
//       .filter(([screen]) => screen !== 'default')
//       .sort((a, b) => screenSizes[b[0]] - screenSizes[a[0]])

//     const mediaQueries = sortedSizes.map(([screen, size]) => {
//       return `(min-width: ${screenSizes[screen]}px) ${pxToNumber(size)}w`
//     })

//     const defaultSize = sizes['default']
//       ? `${pxToNumber(sizes['default'])}w`
//       : ''

//     if (defaultSize) {
//       mediaQueries.push(defaultSize)
//     }

//     return mediaQueries
//   }

//   return {
//     src: getImageUrl(
//       'images/footer.png',
//       `f_auto,q_90,w_${pxToNumber(defaultSize)}`
//     ),
//     sizes: generateSizes()
//   }

// src={getImageUrl('images/footer.png', 'f_auto,q_90,w_540')}
// srcset={`${getImageUrl('images/footer.png', 'f_auto,q_90,w_311')} 311w,
//   ${getImageUrl('images/footer.png', 'f_auto,q_90,w_448')} 448w,
//   ${getImageUrl('images/footer.png', 'f_auto,q_90,w_362')} 362w,
//   ${getImageUrl('images/footer.png', 'f_auto,q_90,w_469')} 469w`}
// sizes='(min-width: 1280px) 469w, (min-width: 1024px) 362w, (min-width: 640px) 448w, 311w'
// }
