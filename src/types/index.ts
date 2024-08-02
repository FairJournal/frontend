import { OutputData } from '@editorjs/editorjs'

export interface ProfileInfo {
  avatar: string
  name: string
  description: string
  wallet: string
  telegram?: string
  github?: string
  twitter?: string
  linkedin?: string
}

export interface Preview {
  slug: string
  img: string
  shortText: string
  time: number
  title: string
}

export interface Article {
  slug: string
  data: OutputData
  preview: Preview
}

export interface ResUserArticle {
  status: string
  userAddress: string
  article: Article
  reference: string
}

export interface ResUserArticles {
  status: string
  userAddress: string
  articles: Array<{ previewData: Preview }>
}

export interface ResPath {
  status: string
  userAddress: string
  path: string
  data: { hash: string; mimeType: string; updateId: number; size: number }
}

export interface ResUserInfo {
  status: string
  address: string
  isUserExists: boolean
}
