/* eslint-disable no-console */
import { User } from '../types'

export const loginUser = async (wallet: string) => {
  // eslint-disable-next-line no-console
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

interface UpdateUserPayload {
  wallet: string
  avatar: string
  name: string
  description: string
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
