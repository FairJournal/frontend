import React, { useEffect, useState } from 'react'
import { Box, Container, Grid, LinearProgress, Typography } from '@mui/material'
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
import { useTonAddress } from '@tonconnect/ui-react'

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
  const userFriendlyAddress = useTonAddress()
  const shortWallet = shortenString(userFriendlyAddress)

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
                const res = (await geArticleBySlug({ userAddress: address, slug })).article.data
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
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
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
            <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
              <Grid item xs={6}>
                {profile && (
                  <SmallAvatar
                    to={`/profile/${address}`}
                    profile={{ name: profile.name, avatar: profile.avatar, wallet: shortWallet }}
                  />
                )}
              </Grid>
              <Grid item xs={6}>
                <ShareButtons link={`https://fairjournal.net/${address}/${slug}`} />
              </Grid>
            </Grid>
            <Typography variant="caption" display="block" gutterBottom sx={{ color: '#728a96' }}>
              {formatDate(article.time ?? 0)}
            </Typography>
            <Output data={article} renderers={{ code: CustomCode }} />
          </Container>
        </Box>
      )}
    </>
  )
}
