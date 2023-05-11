import { Article } from '../types'

export const shortenString = (str: string | null): string => {
  if (!str) return ''

  if (str.length <= 10) {
    return str
  }
  const firstFive = str.substring(0, 5)
  const lastFive = str.substring(str.length - 5)

  return `${firstFive}...${lastFive}`
}

export const base64ToBlob = (base64String: string, type = 'image/png') => {
  const byteString = atob(base64String.split(',')[1])
  const ab = new ArrayBuffer(byteString.length)
  const ia = new Uint8Array(ab)
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }

  return new Blob([ab], { type })
}

export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp)
  const options = { year: 'numeric', month: 'long', day: 'numeric' } as Intl.DateTimeFormatOptions
  const dateString = date.toLocaleDateString('en-US', options)

  return `${dateString}`
}

export const removeArticleById = (articles: Article[], id: number): Article[] => {
  const index = articles.findIndex(article => article.id === id)

  if (index === -1) {
    return articles
  } else {
    const newArticles = [...articles]
    newArticles.splice(index, 1)

    return newArticles
  }
}

export const findArticleById = (articles: Article[], id: number): Article | undefined => {
  const article = articles.find(article => article.id === id)

  return article ? article : undefined
}

export const updateArticleById = (article: Article, articles: Article[]) => {
  const res = articles
  const articleIndex = articles.findIndex(el => el.id === article.id)
  res[articleIndex] = article

  return res
}
