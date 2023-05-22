/* eslint-disable no-console */
import React, { useEffect, useState } from 'react'
import { Header } from '../../components/header'
import { Avatar, Box, Chip, Container, Typography, Divider, Grid, Toolbar } from '@mui/material'
import { ArticlCard } from '../../components/articleCard'
import { shortenString } from '../../utils'
import { getArticlesByUserId, getUserById } from '../../api/users'
import { useParams } from 'react-router-dom'
import { Article, User } from '../../types'

export const Profile = () => {
  const { id } = useParams()
  const [profile, setProfile] = useState<User | null>(null)
  const [articles, setArticles] = useState<Article[] | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setProfile(await getUserById(id as string))
      } catch (e) {
        console.log(e)
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

    if (id) {
      fetchArticle()
    }
  }, [id])

  const shortWallet = profile ? shortenString(profile.wallet) : ''

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        {profile && (
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
                <Chip label={shortWallet} />
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
                    <ArticlCard blocks={el.blocks} time={el.time} id={el.id} isEdit={false} idAuthor={profile.id} />
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
