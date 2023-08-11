import { OutputData } from '@editorjs/editorjs'

export interface ProfileInfo {
  avatar: string
  name: string
  description: string
}

export interface Article {
  slug: string
  data: { slug: string; data: OutputData }
}

export interface ArticleInfo {
  slug: string
  shortText: string
}

export interface ResUserArticle {
  status: string
  userAddress: string
  article: Article
}

export interface ResUserArticles {
  status: string
  userAddress: string
  articles: ArticleInfo[]
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
