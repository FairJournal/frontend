import { ProfileInfo, ResPath, ResUserInfo } from '../types'
import { getFsApiUrl, hashToUrl } from '../utils'

// Get info about file/directory
export const getPathInfo = async ({
  userAddress,
  path,
}: {
  userAddress: string
  path: string
}): Promise<ResPath | false> => {
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
export const getUserInfo = async (address: string): Promise<ResUserInfo> => {
  const response = await fetch(getFsApiUrl('user/info', { address }))

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }

  return response.json()
}

// Get Profile User
export const getProfileInfo = async (userAddress: string): Promise<ProfileInfo> => {
  const dataProfile = await getPathInfo({ userAddress, path: '/profile-json' })

  if (dataProfile) {
    const hash = dataProfile.data.hash

    return (await fetch(hashToUrl(hash))).json()
  }

  return {
    avatar: '',
    name: 'UserName',
    description: 'The best user',
    wallet: '',
  }
}
