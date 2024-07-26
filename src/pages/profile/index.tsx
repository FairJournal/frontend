import React, { useEffect, useState } from 'react'
import { Header } from '../../components/header'
import { Avatar, Box, Chip, Container, Typography, Divider, Grid, Toolbar, Skeleton } from '@mui/material'
import { hashToUrl, isValidAddress, shortenString } from '../../utils'
import { getProfileInfo, getUserInfo } from '../../api/users'
import { useParams } from 'react-router-dom'
import { Preview, ProfileInfo } from '../../types'
import { NotFoundComponent } from '../../components/notfound'
import { Footer } from '../../components/footer'
import { getUserArticles } from '../../api/article'
import { ArticlCard } from '../../components/articleCard'

export const Profile = () => {
  const { address } = useParams()
  const [profile, setProfile] = useState<ProfileInfo | null>(null)
  const [articles, setArticles] = useState<Preview[] | null>(null)
  const [status, setStatus] = useState<string>('ok')

  const extractLinks = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g

    return text.match(urlRegex) || []
  }

  const renderTextWithLinksAndLineBreaks = (text: string) => {
    const links = extractLinks(text)
    let lastIndex = 0
    const components = []

    links.forEach((link, index) => {
      const parts = text.split(link)

      if (parts[0]) {
        components.push(
          parts[0],
          <a key={`link${index}`} href={link} target="_blank" rel="noopener noreferrer">
            {link}
          </a>,
        )
      }
      lastIndex = parts[0].length + link.length
    })

    components.push(text.slice(lastIndex))

    const finalComponents: JSX.Element[] = []
    components.forEach((component, index) => {
      if (typeof component === 'string') {
        finalComponents.push(
          ...component.split('\n').map((line, i) => (
            <React.Fragment key={`${index}-${i}`}>
              {line}
              <br />
            </React.Fragment>
          )),
        )
      } else {
        finalComponents.push(component)
      }
    })

    return finalComponents
  }

  useEffect(() => {
    const checkAddressAndFetchData = async () => {
      setStatus('pending')

      if (!address || !isValidAddress(address)) {
        setStatus('notfound')

        return
      }

      try {
        const { isUserExists } = await getUserInfo(address)

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

  useEffect(() => {
    const getArticle = async () => {
      if (profile && address) {
        try {
          const articles = await (await getUserArticles(address)).articles
          const arr = articles.map(el => el.previewData)
          setArticles(arr)
        } catch (e) {
          console.log(e)
        }
      }
    }
    getArticle()
  }, [profile])

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
            <Divider sx={{ mt: 2 }} />
            <Grid container spacing={2} sx={{ pt: 2, pb: 4 }}>
              <Grid item lg={4} md={6} xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <ArticlCard
                  title={''}
                  time={1}
                  slug={''}
                  isEdit={false}
                  publickey={''}
                  isloading={true}
                  img={''}
                  shortText={''}
                />
              </Grid>
            </Grid>
          </>
        )}

        {profile && status === 'ok' && (
          <>
            <Box sx={{ display: 'flex', mt: 10, mb: 2 }}>
              <Avatar alt="Avatar" src={hashToUrl(profile.avatar)} sx={{ width: 150, height: 150, mr: 2 }} />
              <Box>
                <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
                  {profile?.name}
                </Typography>
                <Chip
                  title={profile.wallet}
                  label={shortenString({ str: profile.wallet })}
                  onClick={() => window.open(`https://tonviewer.com/${profile.wallet}`, '_blank')}
                />
              </Box>
            </Box>
            <Typography variant="subtitle1" gutterBottom>
              {renderTextWithLinksAndLineBreaks(profile?.description)}
            </Typography>
            <Divider sx={{ mt: 2 }} />
            <Grid container spacing={2} sx={{ pt: 2, pb: 4 }}>
              {articles &&
                address &&
                articles.map(el => (
                  <Grid key={el.slug} item lg={4} md={6} xs={12} sx={{ display: 'flex' }}>
                    <ArticlCard {...el} isEdit={false} isloading={false} publickey={address} />
                  </Grid>
                ))}
            </Grid>
          </>
        )}
      </Container>
      <Toolbar />
      <Footer />
    </>
  )
}
