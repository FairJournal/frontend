/* eslint-disable no-console */
import { UpdateUserPayload, User } from '../types'
import { getFsApiUrl } from '../utils'
import { ProfileInfo } from '../utils/fs'

interface ResponsePath {
  status: string
  userAddress: string
  path: string
  data: { hash: string; mimeType: string; updateId: number; size: number }
}

interface UserInfo {
  status: string
  address: string
  isUserExists: boolean
}

// Get info about file/directory
export const getPathInfo = async ({
  userAddress,
  path,
}: {
  userAddress: string
  path: string
}): Promise<ResponsePath | false> => {
  const response = await fetch(getFsApiUrl('blob/get-path-info', { userAddress, path }))

  if (!response.ok) {
    if (response.status === 500) {
      return false
    }
    throw new Error(`HTTP error! Status: ${response.status}`)
  }

  return response.json()
}

export const getUserInfo = async (address: string): Promise<UserInfo> => {
  const response = await fetch(getFsApiUrl('user/info', { address }))

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }

  return response.json()
}

export const getProfileInfo = async (userAddress: string): Promise<ProfileInfo> => {
  const dataProfile = (await getPathInfo({ userAddress, path: '/profile-json' })) as ResponsePath
  const hash = dataProfile.data.hash.toUpperCase()
  const response = await fetch(`https://api.fairjournal.net/ton/${hash}/blob`)

  return response.json()
}

export const loginUser = async (wallet: string): Promise<User> => {
  const response = await fetch(`${process.env.REACT_APP_URL_API}api/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ wallet }),
  })

  if (!response.ok) {
    throw new Error('Unable to login')
  }

  return response.json()
}

export const getUserById = async (id: string) => {
  return (await fetch(`${process.env.REACT_APP_URL_API}api/users/${id}`)).json()
}

export const updateUser = async (id: number, payload: UpdateUserPayload): Promise<User> => {
  const { name, description, avatar, wallet } = payload
  const formData = new FormData()
  formData.append('name', name)
  formData.append('description', description)

  if (avatar) {
    formData.append('avatar', avatar)
  }

  formData.append('wallet', wallet)

  const response = await fetch(`${process.env.REACT_APP_URL_API}api/users/${id}`, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to update user: ${error}`)
  }

  const user = await response.json()

  return user
}

interface ArticlePayload {
  authorId: number
  hash: string
  content: object
}

export const createArticle = async (payload: ArticlePayload): Promise<number> => {
  const response = await fetch(`${process.env.REACT_APP_URL_API}api/articles`, {
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
  const response = await fetch(`${process.env.REACT_APP_URL_API}api/users/${id}/articles`)

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to get articles for user with id ${id}: ${error}`)
  }
  const articles = await response.json()

  return articles.map((item: { id: number; hash: string; content: string }) => {
    return { id: item.id, time: JSON.parse(item.content).time, blocks: JSON.parse(item.content).blocks }
  })
}

export const getArticleById = async (id: string) => {
  return (await fetch(`${process.env.REACT_APP_URL_API}api/articles/${id}`)).json()
}
