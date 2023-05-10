/* eslint-disable no-console */
import { UpdateUserPayload, User } from '../types'

export const loginUser = async (wallet: string) => {
  const response = await fetch(`${process.env.REACT_APP_URL_API}/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ wallet }),
  })

  if (!response.ok) {
    throw new Error('Unable to login')
  }

  const user: User = await response.json()

  return user
}

export const getUserById = async (id: string) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_URL_API}/users/${id}`)
    const data = await response.json()

    return data
  } catch (err) {
    console.error(err)

    return null
  }
}

export const updateUser = async (id: number, payload: UpdateUserPayload) => {
  // const formData = new FormData()
  // formData.append('wallet', String(payload.wallet))
  // formData.append('avatar', payload.avatar)
  // formData.append('name', payload.name)
  // formData.append('description', payload.description)
  const response = await fetch(`${process.env.REACT_APP_URL_API}/users/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to update user: ${error}`)
  }
}

interface ArticlePayload {
  authorId: number
  hash: string
  content: object
}

export const createArticle = async (payload: ArticlePayload): Promise<number> => {
  const response = await fetch(`${process.env.REACT_APP_URL_API}/articles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to create article: ${error}`)
  }

  const newArticle = await response.json()

  return newArticle.id
}

export const getArticlesByUserId = async (id: number) => {
  const response = await fetch(`${process.env.REACT_APP_URL_API}/users/${id}/articles`)

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to get articles for user with id ${id}: ${error}`)
  }
  const articles = await response.json()
  const result = articles.map((item: { id: number; hash: string; content: string }) => {
    return { id: item.id, time: JSON.parse(item.content).time, blocks: JSON.parse(item.content).blocks }
  })

  return result
}

export const getArticleById = async (id: string) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_URL_API}/articles/${id}`)
    const data = await response.json()

    return data
  } catch (err) {
    console.error(err)

    return null
  }
}
