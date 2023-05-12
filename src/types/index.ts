import { OutputBlockData } from '@editorjs/editorjs'

export interface User {
  id: number
  wallet: string
  avatar: string
  name: string
  description: string
  articles: number[]
}

export interface UpdateUserPayload {
  wallet: string
  avatar: File | undefined
  name: string
  description: string
}

export interface Article {
  id: number
  time: number
  blocks: OutputBlockData<string, any>[]
}
