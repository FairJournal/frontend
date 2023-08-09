import React, { useEffect, useState } from 'react'
import { Header } from '../../components/header'
import { Avatar, Box, Chip, Container, Typography, Divider, Grid, Toolbar, Skeleton } from '@mui/material'
import { isValidAddress, shortenString } from '../../utils'
import { getProfileInfo, getUserInfo } from '../../api/users'
import { useParams } from 'react-router-dom'
import { Article } from '../../types'
import { NotFoundComponent } from '../../components/notfound'
import { Footer } from '../../components/footer'
import { ProfileInfo } from '../../utils/fs'

export const Profile = () => {
  const { address } = useParams()
  const [profile, setProfile] = useState<ProfileInfo | null>(null)
  const [articles, setArticles] = useState<Article[] | null>(null)
  const [status, setStatus] = useState<string>('ok')

  useEffect(() => {
    const checkAddressAndFetchData = async () => {
      setStatus('pending')
      console.log(address)

      if (!address || !isValidAddress(address)) {
        setStatus('notfound')

        return
      }

      try {
        const { isUserExists } = await getUserInfo(address)
        console.log(isUserExists)

        if (isUserExists) {
          const res = await getProfileInfo(address)
          setProfile(res)
          setStatus('ok')
        } else {
          setStatus('notfound')
        }
      } catch (error) {
        setStatus('notfound')
      }
    }

    checkAddressAndFetchData()
  }, [address])

  // useEffect(() => {
  //   const fetchArticle = async () => {
  //     try {
  //       setArticles(await getArticlesByUserId(Number(id)))
  //     } catch (e) {
  //       // eslint-disable-next-line no-console
  //       console.log(e)
  //     }
  //   }

  //   if (id && status !== 'notfound') {
  //     fetchArticle()
  //   }
  // }, [id])

  const shortWallet = address ? shortenString(address) : ''

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 7, pb: { lg: 20, md: 18, xs: 6 } }}>
        {status === 'notfound' && <NotFoundComponent />}
        {status === 'pending' && (
          <>
            <Box sx={{ display: 'flex', mt: 10, mb: 2 }}>
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
            <Box sx={{ display: 'flex', mt: 10, mb: 2 }}>
              <Avatar
                alt="Avatar"
                src={`https://api.fairjournal.net/ton/${profile.avatar.toUpperCase()}/blob`}
                sx={{ width: 150, height: 150, mr: 2 }}
              />
              <Box>
                <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
                  {profile?.name}
                </Typography>
                <Chip label={shortWallet} onClick={() => window.open(`https://tonviewer.com/${address}`, '_blank')} />
              </Box>
            </Box>
            <Typography variant="subtitle1" gutterBottom>
              {profile?.description}
            </Typography>
            <Divider sx={{ mt: 2 }} />
            <Grid container spacing={2} sx={{ pt: 2, pb: 4 }}>
              {/* {articles &&
                articles.map(el => (
                  // <Grid key={el.id} item lg={4} md={6} xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                  //   <ArticlCard
                  //     blocks={el.blocks}
                  //     time={el.time}
                  //     id={el.id}
                  //     isEdit={false}
                  //     idAuthor={profile.id}
                  //     isloading={false}
                  //   />
                  // </Grid>
                ))} */}
            </Grid>
          </>
        )}
      </Container>
      <Toolbar />
      <Footer />
    </>
  )
}
