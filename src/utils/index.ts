import { OutputBlockData, OutputData } from '@editorjs/editorjs'
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

export const stripHtmlTags = (html: string): string => {
  if (!html) return ''
  const tempElement = document.createElement('div')
  tempElement.innerHTML = html

  return tempElement.textContent || tempElement.innerText || ''
}

export const createSlug = (title: string): string => {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  const randomChars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let newSlug = slug
  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * randomChars.length)
    const randomChar = randomChars[randomIndex]
    newSlug += randomChar
  }

  return newSlug
}

export const findHeaderBlock = (data: OutputData): string => {
  const arr = data.blocks
  const headerBlock = arr.find((block: OutputBlockData) => block.type === 'header')

  return headerBlock ? headerBlock.data.text : 'fair-journal'
}

export const getFsApiUrl = (url: string, params?: { [key: string]: string }): string => {
  const queryParams = params ? `?${new URLSearchParams(params).toString()}` : ''

  return `${process.env.REACT_APP_URL_API}/fs/${url}${queryParams}`
}

export const isValidAddress = (address: string): boolean => {
  const addressRegex = /^[0-9a-fA-F]{64}$/

  return addressRegex.test(address)
}

export const slugToHeader = (slug: string): string => {
  const words = slug.split('-').map(word => {
    // Remove the added random characters
    const cleanedWord = word.replace(/[a-z0-9]{4}$/i, '')

    // Capitalize the first letter
    return cleanedWord.charAt(0).toUpperCase() + cleanedWord.slice(1)
  })

  return words.join(' ')
}
