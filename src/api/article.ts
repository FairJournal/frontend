import { ResUserArticles, ResUserArticle } from '../types'
import { getFsApiUrl } from '../utils'

export const getUserArticles = async (userAddress: string): Promise<ResUserArticles> => {
  const response = await fetch(getFsApiUrl('blob/get-articles', { userAddress }))

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }

  return response.json()
}

export const geArticleBySlug = async ({
  userAddress,
  slug,
}: {
  userAddress: string
  slug: string
}): Promise<ResUserArticle> => {
  const response = await fetch(getFsApiUrl('blob/get-article', { userAddress, slug }))

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }

  return response.json()
}
