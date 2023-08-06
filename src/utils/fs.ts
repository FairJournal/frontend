/* eslint-disable no-console */
import { Update, UpdateDataSigned } from '@fairjournal/file-system'

export const PROJECT_NAME = 'fairjournal'

/**
 * Default directory for articles
 */
export const DEFAULT_DIRECTORY = 'articles'

/**
 * Status response from FS API
 */
export interface StatusResponse {
  /**
   * Status
   */
  status: string
}

export interface StatusResponseUpload {
  /**
   * Status
   */
  status: string
}

/**
 * User info from FS API - `/fs/user/info`
 */
interface UserInfo {
  status: string
  address: string
  isUserExists: boolean
}

let update: Update | undefined

/**
 * Gets file system instance
 */
export function getUpdateInstance(userAddress: string): Update {
  if (!update || update.getUserAddress() !== userAddress) {
    update = new Update(PROJECT_NAME, userAddress)
  }

  return update
}

/**
 * Clears file system instance
 */
export function clearUpdateInstance(): void {
  update = undefined
}

/**
 * Gets fs api url
 *
 * @param url Url
 * @param params Query params
 */
function getFsApiUrl(url: string, params?: { [key: string]: string }): string {
  const queryParams = params ? `?${new URLSearchParams(params).toString()}` : ''

  return `${process.env.REACT_APP_URL_API}/fs/${url}${queryParams}`
}

export async function uploadFile(blob: File): Promise<any> {
  const formData = new FormData()
  formData.append('blob', blob)

  try {
    const response = await fetch(`${process.env.REACT_APP_URL_API}fs/blob/upload`, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Failed to upload file')
    }

    const data = await response.json()

    return data
  } catch (error) {
    console.error('Error uploading file:', error)

    return null
  }
}

/**
 * Gets user info from FS API
 *
 * @param address User address
 */
export async function getUserInfo(address: string): Promise<UserInfo> {
  const response = await fetch(getFsApiUrl('user/info', { address }))

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }

  return (await response.json()) as UserInfo
}

/**
 * Applies update to the user file system
 *
 * @param update Update
 */
export async function updateApply(update: UpdateDataSigned): Promise<StatusResponse> {
  return (await (
    await fetch(getFsApiUrl('update/apply'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ update }),
    })
  ).json()) as StatusResponse
}
