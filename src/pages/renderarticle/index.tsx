import React, { useEffect, useState } from 'react'
import { Box, Button, Container, Divider, Grid, LinearProgress, ThemeProvider, Typography } from '@mui/material'
import Output from 'editorjs-react-renderer'
import { useParams } from 'react-router-dom'
import { getProfileInfo, getUserInfo } from '../../api/users'
import { formatDate, isValidAddress, restoreImageData } from '../../utils'
import { NotFoundComponent } from '../../components/notfound'
import { ShareButtons } from '../../components/shareButtons'
import { geArticleBySlug } from '../../api/article'
import { OutputData } from '@editorjs/editorjs'
import { SmallAvatar } from '../../components/smallAvatar'
import { ProfileInfo } from '../../types'
import { theme } from '../../App'
import { Footer } from '../../components/footer'
import { Verification } from '../../components/verification'
import { SendTransactionRequest, useTonConnectUI, useTonWallet } from '@tonconnect/ui-react'

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
  const [bagid, setBagid] = useState<string>('')

  const transaction: SendTransactionRequest = {
    validUntil: Math.floor(Date.now() / 1000) + 60, // 60 sec
    messages: [
      {
        address: profile?.wallet || '',
        amount: '1000000000',
      },
    ],
  }
  const wallet = useTonWallet()
  const [tonConnectUi] = useTonConnectUI()
  const [tx, setTx] = useState(transaction)

  console.log(transaction)

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
              const res = await geArticleBySlug({ userAddress: address, slug })
              const updatedArticle = restoreImageData(res.article.data)
              setBagid(res.reference)
              setArticle(updatedArticle)
              setStatus('ok')
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
        <>
          <Container maxWidth="md" sx={{ pt: 4, px: 0, pb: { lg: 16, md: 25, xs: 10 }, minHeight: '90vh' }}>
            <Grid container spacing={2} justifyContent="space-between" alignItems="space-between" sx={{ mb: 3 }}>
              <Grid item xs="auto">
                {profile && (
                  <SmallAvatar
                    to={`/profile/${address}`}
                    profile={{ name: profile.name, avatar: profile.avatar, wallet: profile.wallet }}
                  />
                )}
              </Grid>
              <Grid item xs="auto">
                <ShareButtons link={`https://fairjournal.net/${address}/${slug}`} />
              </Grid>
              <Grid item xs="auto">
                <Button
                  variant="outlined"
                  endIcon={<img src="/images/ton.png" style={{ width: '20px', height: '20px' }} alt="My Icon" />}
                  size="small"
                  color="success"
                  onClick={async () => (wallet ? tonConnectUi.sendTransaction(tx) : tonConnectUi.openModal())}
                >
                  Donate
                </Button>
              </Grid>
            </Grid>
            <Typography variant="caption" display="block" gutterBottom sx={{ color: '#728a96' }}>
              {formatDate(article.time ?? 0)}
            </Typography>
            <ThemeProvider theme={theme}>
              <Output data={article} renderers={{ code: CustomCode }} />
            </ThemeProvider>
            <Divider sx={{ mb: 2 }} />
            <Verification bagid={bagid} address={profile?.wallet ?? ''} sub={address} />
          </Container>
          <Footer />
        </>
      )}
    </>
  )
}
