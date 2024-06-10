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

export function parseSizes(sizes: string): Sizes {
  const sizePairs = sizes.split(' ')
  const result: Sizes = {}

  sizePairs.forEach((sizePair) => {
    const [breakpoint, size] = sizePair.includes(':')
      ? sizePair.split(':')
      : ['default', sizePair]
    result[breakpoint] = size
  })

  // checking for missing default
  if (!result['default']) {
    result['default'] = `${Object.entries(result).reduce<number>(
      (biggest, el) => {
        const [_, size] = el
        const sizeNumber = parseInt(size.replace('px', ''))

        if (sizeNumber > biggest) {
          return sizeNumber
        }
        return biggest
      },
      0
    )}px`
  }

  return result
}

export function generateSrcSet(src: string, sizes: Sizes): string {
  const DENSITIES = [1, 1.5, 2, 2.5, 3]
  const srcSetParts: string[] = []

  const calculateWidth = (size: string) => {
    const width = parseInt(size.replace('px', ''))
    return DENSITIES.map((density) => width * density)
  }

  const widths = Object.values(sizes).flatMap((size) => {
    return calculateWidth(size).map((width) => {
      const format = src.endsWith('.gif') ? 'gif' : 'auto'
      const imageUrl = getImageUrl(src, `f_${format},q_90,w_${width}`)
      return `${imageUrl} ${width}w`
    })
  })
  return widths.join(', ')
}

export function generateSizesString(sizes: Sizes): string {
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

  const format = src.endsWith('.gif') ? 'gif' : 'auto'

  return {
    src: getImageUrl(src, `f_${format},q_90,w_${maxWidth}`),
    srcSet,
    sizes: sizesString
  }
}
