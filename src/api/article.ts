export const deleteArticle = async (id: number): Promise<number> => {
  const response = await fetch(`${process.env.REACT_APP_URL_API}/articles/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error(`Failed to delete article with id ${id}`)
  }

  return id
}
