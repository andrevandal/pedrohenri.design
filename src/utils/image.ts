const IMAGES_ENDPOINT = 'https://images.vandal.services'
const BUCKET_ENDPOINT = 'https://files.vandal.services'
const BUCKET_NAME = 'pedrohenri.design'

export function getImageUrl(imagePath: string, transform = '_') {
  // https://images.vandal.services/_/https://files.vandal.services/pedrohenri.design/images/footer.png
  return `${IMAGES_ENDPOINT}/${transform}/${BUCKET_ENDPOINT}/${BUCKET_NAME}/${imagePath}`.replace(
    /([^:]\/)\/+/g,
    '$1'
  )
}
