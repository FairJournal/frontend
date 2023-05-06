import { User } from '../types'

export const loginUser = async (wallet: string) => {
  // eslint-disable-next-line no-console
  console.log(process.env.REACT_APP_URL_API)
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
