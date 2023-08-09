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

// Check User
export const getUserInfo = async (address: string): Promise<UserInfo> => {
  const response = await fetch(getFsApiUrl('user/info', { address }))

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }

  return response.json()
}

// Get Profile User
export const getProfileInfo = async (userAddress: string): Promise<ProfileInfo> => {
  const dataProfile = (await getPathInfo({ userAddress, path: '/profile-json' })) as ResponsePath

  if (dataProfile) {
    const hash = dataProfile.data.hash.toUpperCase()

    return (await fetch(`https://api.fairjournal.net/ton/${hash}/blob`)).json()
  }

  return {
    avatar: '',
    name: 'UserName',
    description: 'The best user',
  }
}
