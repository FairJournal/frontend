/* eslint-disable no-console */
import { OutputData } from '@editorjs/editorjs'
import { Update, UpdateDataSigned, createAddDirectoryAction, createAddFileAction } from '@fairjournal/file-system'
import { personalSignString } from './ton'

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
  data: { mime_type: string; reference: string; sha256: string; size: number }
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

export interface GetUpdateIdResponse {
  /**
   * Status of the request
   */
  status: string

  /**
   * Address of the user
   */
  address: string

  /**
   * Update id
   */
  updateId: number
}

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

/**
 * Upload image
 *
 * @param blob Image
 */

export async function uploadFile(blob: File): Promise<StatusResponseUpload> {
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
    console.log(data)

    return data
  } catch (error) {
    throw new Error()
  }
}

export async function uploadJsonFile(objectData: string): Promise<StatusResponseUpload> {
  const jsonString = JSON.stringify(objectData)
  const blob = new Blob([jsonString])
  const formData = new FormData()
  formData.append('blob', blob)

  try {
    const response = await fetch(`${process.env.REACT_APP_URL_API}/fs/blob/upload`, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Failed to upload file')
    }

    const data = (await response.json()) as StatusResponseUpload

    return data
  } catch (error) {
    throw new Error()
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

/**
 * Add new article
 *
 * @param update Update
 */
export async function addArticleToFs({
  data,
  address,
}: {
  data: OutputData
  address: string
}): Promise<StatusResponse> {
  const article = { slug: Date.now(), data }
  const articleData = JSON.stringify(article)
  const res = await uploadJsonFile(articleData)
  const hash = res.data.reference
  console.log('hash', hash)
  const response = await fetch(getFsApiUrl('user/get-update-id', { address }))
  const updatesInfo = await response.json()
  console.log('userUpdatre', updatesInfo)
  update = new Update(PROJECT_NAME, address, updatesInfo.updateId + 1)
  update.addAction(createAddDirectoryAction(`/articles/${article.slug}`))
  update.addAction(
    createAddFileAction({
      path: `/articles/${article.slug}/index-json`,
      mimeType: 'application/json',
      size: articleData.length,
      hash,
    }),
  )
  const signData = update.getSignData()
  const signature = await personalSignString(signData)
  update.setSignature(signature)
  const signedData = update.getUpdateDataSigned()

  return await updateApply(signedData)
}
