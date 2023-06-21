/* eslint-disable no-console */
import React, { useEffect, useState } from 'react'
import { Header } from '../../components/header'
import { Avatar, Box, Chip, Container, Typography, Divider, Grid, Toolbar, Skeleton } from '@mui/material'
import { ArticlCard } from '../../components/articleCard'
import { shortenString } from '../../utils'
import { getArticlesByUserId, getUserById } from '../../api/users'
import { useParams } from 'react-router-dom'
import { Article, User } from '../../types'
import { NotFoundComponent } from '../../components/notfound'

export const Profile = () => {
  const { id } = useParams()
  const [profile, setProfile] = useState<User | null>(null)
  const [articles, setArticles] = useState<Article[] | null>(null)
  const [status, setStatus] = useState<string>('ok')

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setStatus('pending')
        setProfile(await getUserById(id as string))
        setStatus('ok')
      } catch (e) {
        setStatus('notfound')
      }
    }

    if (id) {
      fetchUser()
    }
  }, [id])

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setArticles(await getArticlesByUserId(Number(id)))
      } catch (e) {
        console.log(e)
      }
    }

    if (id && status !== 'notfound') {
      fetchArticle()
    }
  }, [id])

  const shortWallet = profile ? shortenString(profile.wallet) : ''

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        {status === 'notfound' && <NotFoundComponent />}
        {status === 'pending' && (
          <>
            <Box sx={{ display: 'flex', mt: 4, mb: 2 }}>
              <Skeleton animation="wave" variant="circular" width={150} height={150} sx={{ mr: 2 }} />
              <Box>
                <Skeleton animation="wave" height={50} width={200} sx={{ mt: 4 }} />
                <Skeleton animation="wave" height={50} width={100} />
              </Box>
            </Box>
            <Typography variant="subtitle1" gutterBottom></Typography>
          </>
        )}
        {profile && status === 'ok' && (
          <>
            <Box sx={{ display: 'flex', mt: 4, mb: 2 }}>
              <Avatar
                alt="Avatar"
                src={`${process.env.REACT_APP_URL_API}${profile.avatar}`}
                sx={{ width: 150, height: 150, mr: 2 }}
              />
              <Box>
                <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
                  {profile?.name}
                </Typography>
                <Chip
                  label={shortWallet}
                  onClick={() => window.open(`https://tonviewer.com/${profile.wallet}`, '_blank')}
                />
              </Box>
            </Box>
            <Typography variant="subtitle1" gutterBottom>
              {profile?.description}
            </Typography>
            <Divider sx={{ mt: 2 }} />
            <Grid container spacing={2} sx={{ pt: 2, pb: 4 }}>
              {articles &&
                articles.map(el => (
                  <Grid key={el.id} item lg={4} md={6} xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <ArticlCard
                      blocks={el.blocks}
                      time={el.time}
                      id={el.id}
                      isEdit={false}
                      idAuthor={profile.id}
                      isloading={false}
                    />
                  </Grid>
                ))}
            </Grid>
          </>
        )}
      </Container>
      <Toolbar />
    </>
  )
}
