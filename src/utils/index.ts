import { OutputBlockData, OutputData } from '@editorjs/editorjs'
import { slugify } from 'transliteration'
import { Preview } from '../types'

export const shortenString = (str: string | null): string => {
  if (!str) return ''

  if (str.length <= 10) {
    return str
  }
  const firstFive = str.substring(0, 5)
  const lastFive = str.substring(str.length - 5)

  return `${firstFive}...${lastFive}`
}

export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp)
  const options = { year: 'numeric', month: 'long', day: 'numeric' } as Intl.DateTimeFormatOptions
  const dateString = date.toLocaleDateString('en-US', options)

  return `${dateString}`
}

export const removeArticleBySlug = (articles: Preview[], slug: string): Preview[] => {
  const index = articles.findIndex(article => article.slug === slug)

  if (index === -1) {
    return articles
  } else {
    const newArticles = [...articles]
    newArticles.splice(index, 1)

    return newArticles
  }
}

export const createSlug = (title: string): string => {
  const slug = slugify(title)
    .replace(/^-+|-+$/g, '')
    .replace(/\./g, '')

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

  if (headerBlock) {
    const headerText = document.createElement('div')
    headerText.innerHTML = headerBlock.data.text
    const decodedHeaderText = headerText.textContent || headerText.innerText

    return decodedHeaderText.length <= 25 ? decodedHeaderText : decodedHeaderText.substring(0, 25) + '...'
  }

  return 'New Article'
}

export const findImageBlock = (data: OutputData): string => {
  const arr = data.blocks
  const headerBlock = arr.find((block: OutputBlockData) => block.type === 'image')

  return headerBlock ? headerBlock.data.file.url : ''
}

export const getFsApiUrl = (url: string, params?: { [key: string]: string }): string => {
  const queryParams = params ? `?${new URLSearchParams(params).toString()}` : ''

  return `${process.env.REACT_APP_URL_API}v1/fs/${url}${queryParams}`
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

export const extractArticleText = (data: OutputData): string => {
  const paragraphs = data.blocks
    .filter(block => block.type === 'paragraph')
    .map(block => {
      const paragraphText = document.createElement('div')
      paragraphText.innerHTML = block.data.text
      const decodedParagraphText = paragraphText.textContent || paragraphText.innerText

      return decodedParagraphText.replace(/<\/?[^>]+>/g, '')
    })
    .join(' ')

  const concatenatedText = paragraphs.slice(0, 100)

  return paragraphs ? concatenatedText : 'This article is about'
}

export const hashToUrl = (hash: string | undefined): string => {
  if (hash) {
    return `${process.env.REACT_APP_URL_API}ton/${hash.toUpperCase()}/blob`
  }

  return ''
}
