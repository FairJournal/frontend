/* eslint-disable no-console */
import { OutputData } from '@editorjs/editorjs'
import {
  Update,
  UpdateDataSigned,
  createAddDirectoryAction,
  createAddFileAction,
  createRemoveDirectoryAction,
  createRemoveFileAction,
  createAddUserAction,
} from '@fairjournal/file-system'
import { createSlug, extractArticleText, findHeaderBlock, findImageBlock, getFsApiUrl } from '.'
import { getPathInfo } from '../api/users'
import { ProfileInfo } from '../types'
import { personalSignString } from './ton'

export const PROJECT_NAME = 'fairjournal'

/**
 * Default directory for articles
 */
export const DEFAULT_DIRECTORY = 'articles'
export const DEFAULT_PROFILE = 'profile-json'

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
 * Create new user
 *
 * @param address public key
 */

export async function createUser(address: string): Promise<StatusResponse> {
  const data = {
    avatar: '',
    name: 'UserName',
    description: 'The best user',
  }
  const userData = JSON.stringify(data)
  const res = await uploadJsonFile(userData)
  const hash = res.data.reference

  const update = new Update(PROJECT_NAME, address, 1)
  update.addAction(createAddUserAction(address))
  update.addAction(createAddDirectoryAction(`/${DEFAULT_DIRECTORY}`))
  update.addAction(
    createAddFileAction({
      path: `/profile-json`,
      mimeType: 'application/json',
      size: userData.length,
      hash,
    }),
  )
  const signData = update.getSignData()
  const signature = await personalSignString(signData)
  update.setSignature(signature)
  const signedData = update.getUpdateDataSigned()

  return await updateApply(signedData)
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

    return data
  } catch (error) {
    throw new Error()
  }
}

/**
 * Upload json
 *
 * @param data Object
 */

export async function uploadJsonFile(data: string): Promise<StatusResponseUpload> {
  const file = new File([data], 'file.json', { type: 'application/json' })
  const formData = new FormData()
  formData.append('blob', file)

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
 * Add new article
 *
 * @param data Article
 * @param address Address
 */
export async function addArticleToFs({
  data,
  address,
}: {
  data: OutputData
  address: string
}): Promise<StatusResponse> {
  const title = findHeaderBlock(data)
  const slug = createSlug(title)
  const img = findImageBlock(data)
  const shortText = extractArticleText(data)
  const preview = {
    slug,
    img,
    title,
    shortText,
    time: data.time,
  }
  const article = { slug, preview, data }
  console.log(article)
  console.log(address)
  const articleData = JSON.stringify(article)
  const res = await uploadJsonFile(articleData)
  const hash = res.data.reference
  const response = await fetch(getFsApiUrl('user/get-update-id', { address }))
  const updatesInfo = await response.json()
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

/**
 * Remove article
 *
 * @param address Address
 * @param slug Article
 */
export async function removeArticleToFs({ address, slug }: { address: string; slug: string }): Promise<StatusResponse> {
  const res = await fetch(getFsApiUrl('user/get-update-id', { address }))
  const removeInfo = await res.json()
  update = new Update(PROJECT_NAME, address, removeInfo.updateId + 1)
  update.addAction(createRemoveDirectoryAction(`/articles/${slug}`))
  const signData = update.getSignData()
  const signature = await personalSignString(signData)
  update.setSignature(signature)
  const signedData = update.getUpdateDataSigned()

  return await updateApply(signedData)
}

/**
 * Remove article
 * @param data Article
 * @param address Address
 * @param slug Article
 */
export async function updateArticleToFs({
  address,
  data,
  slug,
}: {
  address: string
  data: OutputData
  slug: string
}): Promise<StatusResponse> {
  const title = findHeaderBlock(data)
  const img = findImageBlock(data)
  const shortText = extractArticleText(data)
  const preview = {
    slug,
    img,
    title,
    shortText,
    time: data.time,
  }
  const article = { slug, preview, data }
  const articleData = JSON.stringify(article)
  const resData = await uploadJsonFile(articleData)
  const hash = resData.data.reference
  const res = await fetch(getFsApiUrl('user/get-update-id', { address }))
  const removeInfo = await res.json()
  update = new Update(PROJECT_NAME, address, removeInfo.updateId + 1)
  update.addAction(createRemoveFileAction(`/articles/${slug}/index-json`))
  update.addAction(
    createAddFileAction({
      path: `/articles/${slug}/index-json`,
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

/**
 * UserInfo
 *
 * @param address Address
 * @param data User Info
 */
export async function addProfileInfo({
  address,
  data,
}: {
  address: string
  data: ProfileInfo
}): Promise<StatusResponse> {
  const userData = JSON.stringify(data)
  const res = await uploadJsonFile(userData)
  const hash = res.data.reference
  const response = await fetch(getFsApiUrl('user/get-update-id', { address }))
  const updatesInfo = await response.json()
  const isExistInfo = Boolean(await getPathInfo({ userAddress: address, path: '/profile-json' }))
  update = new Update(PROJECT_NAME, address, updatesInfo.updateId + 1)

  if (isExistInfo) {
    update.addAction(createRemoveFileAction(`/profile-json`))
  }
  update.addAction(
    createAddFileAction({
      path: `/profile-json`,
      mimeType: 'application/json',
      size: userData.length,
      hash,
    }),
  )
  const signData = update.getSignData()
  const signature = await personalSignString(signData)
  update.setSignature(signature)
  const signedData = update.getUpdateDataSigned()

  return await updateApply(signedData)
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
