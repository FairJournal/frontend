/* eslint-disable no-console */
import React, { useEffect, useState } from 'react'
import { Container } from '@mui/material'
import Output from 'editorjs-react-renderer'
import { useParams } from 'react-router-dom'
import { getArticleById } from '../../api/users'
import { SmallAvatar } from '../../components/smallAvatar'
import { shortenString } from '../../utils'

interface Article {
  author_id: number
  avatar: string
  content: string
  hash: string
  id: number
  name: string
  wallet: string
}

export const RenderArticle = () => {
  const { articleId, authorId } = useParams()
  const [article, setArticle] = useState<Article | null>(null)

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await getArticleById(articleId as string)
        setArticle(data)
      } catch (e) {
        console.log(e)
      }
    }
    fetchArticle()
  }, [articleId])

  if (!article) {
    return <div>Loading...</div>
  }

  const shortWallet = shortenString(article.wallet)

  return (
    <>
      <Container maxWidth="lg" sx={{ pt: 4 }}>
        <SmallAvatar
          to={`profile/${authorId}`}
          profile={{ name: article.name, avatar: article?.avatar, wallet: shortWallet }}
        />
        {article && <Output data={JSON.parse(article.content as string)} />}
      </Container>
    </>
  )
}
