import { OutputBlockData } from '@editorjs/editorjs'

export interface Profile {
  avatar: string
  name: string
  description: string
}

export interface User {
  wallet: string
  publickey: string
  profile: Profile
}

export interface UpdateUserPayload {
  avatar: File | undefined
  name: string
  description: string
}

export interface Article {
  id: number
  time: number
  blocks: OutputBlockData<string, any>[]
}

export interface ArticleInfo {
  slug: string
  shortText: string
}
