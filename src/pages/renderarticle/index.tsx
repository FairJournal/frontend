/* eslint-disable no-console */
import React, { useEffect, useState } from 'react'
import { Box, Container, Grid, Skeleton, Typography } from '@mui/material'
import Output from 'editorjs-react-renderer'
import { useParams } from 'react-router-dom'
import { getArticleById } from '../../api/users'
import { SmallAvatar } from '../../components/smallAvatar'
import { shortenString } from '../../utils'
import { NotFoundComponent } from '../../components/notfound'
import { ShareButtons } from '../../components/shareButtons'

interface Article {
  author_id: number
  avatar: string
  content: string
  hash: string
  id: number
  name: string
  wallet: string
}
interface CodeBlockData {
  code: string
}

const CustomCode = ({ data }: { data: CodeBlockData }) => {
  return <div className="custom-code">{data.code}</div>
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
        <Box sx={{ backgroundColor: '#fff', minHeight: '90vh', minWidth: '90vw', pb: 10 }}>
          <Container maxWidth="md" sx={{ pt: 4 }}>
            <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
              <Grid item xs={6}>
                <SmallAvatar
                  to={`/profile/${authorId}`}
                  profile={{ name: article.name, avatar: article?.avatar, wallet: shortenString(article.wallet) }}
                />
              </Grid>
              <Grid item xs={6}>
                <ShareButtons link={`https://fairjournal.net/${authorId}/${articleId}`} />
              </Grid>
            </Grid>
            {article && <Output data={JSON.parse(article.content as string)} renderers={{ code: CustomCode }} />}
          </Container>
        </Box>
      )}
    </>
  )
}
