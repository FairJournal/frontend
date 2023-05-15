/* eslint-disable no-console */
import { OutputData } from '@editorjs/editorjs'

export const deleteArticle = async (id: number): Promise<number> => {
  const response = await fetch(`${process.env.REACT_APP_URL_API}api/articles/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error(`Failed to delete article with id ${id}`)
  }

  return id
}

export const updateArticle = async (
  articleId: number,
  authorId: number,
  hash: string,
  content: OutputData,
): Promise<number | null> => {
  try {
    const response = await fetch(`${process.env.REACT_APP_URL_API}api/articles/${articleId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ authorId, hash, content }),
    })

    if (response.ok) {
      return articleId
    } else if (response.status === 404) {
      console.error(`Article with id ${articleId} not found`)

      return null
    } else {
      console.error(`Failed to update article with id ${articleId}`)

      return null
    }
  } catch (error) {
    console.error(`Failed to update article with id ${articleId}:`, error)

    return null
  }
}
