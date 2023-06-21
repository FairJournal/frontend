/* eslint-disable no-console */
import React, { useEffect, useState } from 'react'
import { Box, Container, Skeleton, Typography } from '@mui/material'
import Output from 'editorjs-react-renderer'
import { useParams } from 'react-router-dom'
import { getArticleById } from '../../api/users'
import { SmallAvatar } from '../../components/smallAvatar'
import { shortenString } from '../../utils'
import { NotFoundComponent } from '../../components/notfound'

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
  const [status, setStatus] = useState<string>('ok')

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setStatus('pending')
        const data = await getArticleById(articleId as string)
        setArticle(data)
        setStatus('ok')
      } catch (e) {
        setStatus('notfound')
      }
    }
    fetchArticle()
  }, [articleId])

  if (status === 'pending' && !article) {
    return (
      <>
        <Box sx={{ display: 'flex', mb: 2 }}>
          <Skeleton animation="wave" variant="circular" width={150} height={150} sx={{ mr: 2 }} />
          <Box>
            <Skeleton animation="wave" height={50} width={200} sx={{ mt: 4 }} />
            <Skeleton animation="wave" height={50} width={100} />
          </Box>
        </Box>
        <Typography variant="subtitle1" gutterBottom></Typography>
      </>
    )
  }

  if (status === 'notfound') {
    return <NotFoundComponent />
  }

  return (
    <>
      {article && (
        <Container maxWidth="lg" sx={{ pt: 4 }}>
          <SmallAvatar
            to={`/profile/${authorId}`}
            profile={{ name: article.name, avatar: article?.avatar, wallet: shortenString(article.wallet) }}
          />
          {article && <Output data={JSON.parse(article.content as string)} />}
        </Container>
      )}
    </>
  )
}
