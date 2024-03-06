import { createSlug } from '../../utils'

describe('createSlug', () => {
  it('should generate a slug from title (in English)', () => {
    const title = 'Hello World'
    const slug = createSlug(title)
    expect(slug).toMatch(/^[a-z0-9-]+$/)
  })

  it('should generate a slug from title (in Russian)', () => {
    const title = 'Привет Как дела'
    const slug = createSlug(title)
    expect(slug).toMatch(/^[a-z0-9-]+$/)
  })

  it('should generate a slug from title (in Spanish)', () => {
    const title = 'Hola Cómo estás'
    const slug = createSlug(title)
    expect(slug).toMatch(/^[a-z0-9-]+$/)
  })

  it('should generate different slugs for different titles', () => {
    const title1 = 'Hello World'
    const title2 = 'Hello World'
    const slug1 = createSlug(title1)
    const slug2 = createSlug(title2)
    expect(slug1).not.toEqual(slug2)
  })
})
