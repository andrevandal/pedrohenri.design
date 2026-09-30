import { describe, it, expect } from 'vitest'
import { getImageUrl } from '@utils/image'

describe('getImageUrl', () => {
  it('should return the correct URL', () => {
    const url = getImageUrl('images/footer.png', 'f_auto,q_90,w_540')
    expect(url).toMatchSnapshot()
  })
})
