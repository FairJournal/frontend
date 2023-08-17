import React, { useEffect, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import AddIcon from '@mui/icons-material/Add'
import {
  Container,
  Typography,
  Toolbar,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  ListItem,
  List,
  IconButton,
  Drawer,
  Divider,
  Box,
  AppBar,
  CssBaseline,
  Button,
  Grid,
} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { getAllArticles, login, logout, selectMain } from '../../store/slices/mainSlice'
import { Settings } from '../../components/settings'
import { ArticlCard } from '../../components/articleCard'
import { SmallAvatar } from '../../components/smallAvatar'
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react'
import { Header } from '../../components/header'
import UpdateRoundedIcon from '@mui/icons-material/UpdateRounded'
import ArticleIcon from '@mui/icons-material/Article'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import LogoutIcon from '@mui/icons-material/Logout'
import { getUserArticles } from '../../api/article'
import { getUserInfo } from '../../api/users'
import { getPublicKey } from '../../utils/ton'
import { createUser } from '../../utils/fs'

const drawerWidth = 240

interface Props {
  window?: () => Window
}

const dataList = [
  { title: 'Articles', id: '1', icon: <ArticleIcon /> },
  { title: 'Settings', id: '2', icon: <ManageAccountsIcon /> },
]

export const Dashboard = (props: Props) => {
  const { window } = props
  const { profile, articles, publickey } = useAppSelector(selectMain)
  const [mobileOpen, setMobileOpen] = useState<boolean>(false)
  const [tab, setTab] = useState<string>('1')
  const [status, setStatus] = useState<'pending' | 'error' | 'ok'>('ok')
  const [tonConnectUI] = useTonConnectUI()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const userFriendlyAddress = useTonAddress()

  const getArticle = async () => {
    if (profile) {
      try {
        setStatus('pending')
        const articles = await (await getUserArticles(publickey)).articles
        const arr = articles.map(el => el.previewData)
        dispatch(getAllArticles(arr))
        setStatus('ok')
      } catch {
        setStatus('error')
      }
    }
  }

  useEffect(() => {
    getArticle()
  }, [profile])

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const changeTab = (tab: string) => {
    setTab(tab)
    handleDrawerToggle()
  }

  const logOut = async () => {
    await tonConnectUI.disconnect()
    dispatch(logout())
    navigate('/')
  }

  const goWrite = () => {
    navigate('/write')
  }

  const drawer = (
    <div>
      <Link to="/" style={{ textDecoration: 'none', color: '#000000' }}>
        <Typography variant="h5" sx={{ textAlign: 'center', mb: 2, mt: 2 }}>
          Fair Journal
        </Typography>
      </Link>
      <Divider />
      <List>
        {dataList.map(el => (
          <ListItem key={el.id} disablePadding>
            <ListItemButton onClick={() => changeTab(el.id)}>
              <ListItemIcon>{el.icon}</ListItemIcon>
              <ListItemText primary={el.title} sx={{ fontSize: '1.2rem' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={logOut}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  )

  const container = window !== undefined ? () => window().document.body : undefined

  const connectWallet = async () => {
    try {
      if (tonConnectUI.connected) {
        await tonConnectUI.disconnect()
      }
      await tonConnectUI.connectWallet()
      const { publicKey, address } = await getPublicKey()
      const userInfo = await getUserInfo(publicKey)

      if (!userInfo.isUserExists) {
        await createUser(publicKey)
      }

      dispatch(
        login({
          wallet: address,
          publickey: publicKey,
        }),
      )
    } catch (e) {
      console.error(e)

      return
    }
  }

  return (
    <>
      {profile === null ? (
        <>
          <Header />
          <Container maxWidth="lg">
            <Box
              sx={{
                minHeight: '80vh',
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                justifyContent: 'center',
              }}
            >
              <Box sx={{ textAlign: 'center' }}>
                <Typography align="center" variant="h5" sx={{ mb: 2, mt: 2 }}>
                  To create articles, you need to connect a wallet.
                </Typography>
                <Box>
                  <Button variant="outlined" color="inherit" onClick={connectWallet}>
                    Connect wallet
                  </Button>
                </Box>
              </Box>
            </Box>
          </Container>
        </>
      ) : (
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
              position="fixed"
              sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
                backgroundColor: '#fff',
              }}
            >
              <Toolbar
                sx={{
                  display: 'flex',
                  backgroundColor: '#fff',
                  justifyContent: { md: 'space-between', xs: 'space-around' },
                }}
              >
                <IconButton
                  color="primary"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2, display: { sm: 'none' } }}
                >
                  <MenuIcon />
                </IconButton>
                <SmallAvatar
                  to={`/profile/${publickey}`}
                  profile={{ name: profile.name, avatar: profile.avatar, wallet: userFriendlyAddress }}
                />
                <Button variant="outlined" color="success" sx={{ m: 1 }} onClick={goWrite}>
                  <AddIcon sx={{ fontSize: 19 }} />
                  Write
                </Button>
              </Toolbar>
            </AppBar>
            <Box
              component="nav"
              sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
              aria-label="mailbox folders"
            />
            <Drawer
              container={container}
              PaperProps={{
                sx: { backgroundColor: 'secondary' },
              }}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
              }}
            >
              {drawer}
            </Drawer>
            <Drawer
              variant="permanent"
              PaperProps={{
                sx: { backgroundColor: 'secondary' },
              }}
              sx={{
                display: { xs: 'none', sm: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
              }}
              open
            >
              {drawer}
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
              <Toolbar />
              {tab === '1' && (
                <>
                  {status === 'pending' && (
                    <ArticlCard
                      time={1}
                      slug={''}
                      isEdit={false}
                      publickey={''}
                      isloading={true}
                      img={''}
                      shortText={''}
                      title={''}
                    />
                  )}
                  {status === 'error' && (
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        minHeight: '80vh',
                        textAlign: 'center',
                      }}
                    >
                      <Typography variant="h6">Something went wrong, try again.</Typography>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={getArticle}
                        sx={{ color: '#ffffff', mt: 2, mb: 2 }}
                      >
                        <UpdateRoundedIcon sx={{ fontSize: 19 }} />
                        Update
                      </Button>
                    </Box>
                  )}
                  {status === 'ok' && (
                    <>
                      {articles.length > 0 ? (
                        <Grid container spacing={2} sx={{ pt: 2, mb: 8, textAlign: 'center' }}>
                          {articles.map(el => (
                            <Grid
                              key={el.slug}
                              item
                              lg={4}
                              md={6}
                              xs={12}
                              sx={{ display: 'flex', justifyContent: 'center' }}
                            >
                              <ArticlCard {...el} isEdit={true} isloading={false} publickey={publickey} />
                            </Grid>
                          ))}
                        </Grid>
                      ) : (
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            minHeight: '80vh',
                          }}
                        >
                          <Typography variant="h6">You don't have any articles yet, let's create!</Typography>
                          <Button variant="outlined" color="success" sx={{ m: 1 }} onClick={goWrite}>
                            <AddIcon sx={{ fontSize: 19 }} />
                            Write
                          </Button>
                        </Box>
                      )}
                    </>
                  )}
                </>
              )}
              {tab === '2' && <Settings />}
            </Box>
          </Box>
        </Container>
      )}
    </>
  )
}
