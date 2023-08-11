import React, { useEffect, useState } from 'react'
import { Box, Container, Grid, Skeleton, Typography } from '@mui/material'
import Output from 'editorjs-react-renderer'
import { useParams } from 'react-router-dom'
import { getProfileInfo, getUserInfo } from '../../api/users'
import { formatDate, isValidAddress, shortenString } from '../../utils'
import { NotFoundComponent } from '../../components/notfound'
import { ShareButtons } from '../../components/shareButtons'
import { geArticleBySlug } from '../../api/article'
import { OutputData } from '@editorjs/editorjs'
import { SmallAvatar } from '../../components/smallAvatar'
import { ProfileInfo } from '../../types'

interface CodeBlockData {
  code: string
}

const CustomCode = ({ data }: { data: CodeBlockData }) => {
  return <div className="custom-code">{data.code}</div>
}

export const RenderArticle = () => {
  const { address, slug } = useParams()
  const [article, setArticle] = useState<OutputData | null>(null)
  const [profile, setProfile] = useState<ProfileInfo | null>(null)
  const [status, setStatus] = useState<string>('ok')

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
          try {
            const info = await getProfileInfo(address)

            if (slug) {
              // eslint-disable-next-line max-depth
              try {
                const res = (await geArticleBySlug({ userAddress: address, slug })).article.data.data
                setArticle(res)
                setStatus('ok')
              } catch {
                setStatus('notfound')
              }
            } else {
              setStatus('notfound')
            }

            setProfile(info)
          } catch {
            setStatus('notfound')
          }
        } else {
          setStatus('notfound')
        }
      } catch {
        setStatus('notfound')
      }
    }

    checkAddressAndFetchData()
  }, [address, slug])

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
      {article && address && (
        <Box sx={{ backgroundColor: '#fff', minHeight: '90vh', minWidth: '90vw', pb: 10 }}>
          <Container maxWidth="md" sx={{ pt: 4 }}>
            <Typography variant="caption" display="block" gutterBottom>
              {formatDate(article.time ?? 0)}
            </Typography>
            <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
              <Grid item xs={6}>
                {profile && (
                  <SmallAvatar
                    to={`/profile/${address}`}
                    profile={{ name: profile.name, avatar: profile.avatar, wallet: shortenString(address) }}
                  />
                )}
              </Grid>
              <Grid item xs={6}>
                <ShareButtons link={`https://fairjournal.net/${address}/${slug}`} />
              </Grid>
            </Grid>
            <Output data={article} renderers={{ code: CustomCode }} />
          </Container>
        </Box>
      )}
    </>
  )
}
