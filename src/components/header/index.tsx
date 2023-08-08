/* eslint-disable no-console */
import React, { useEffect } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { selectMain, login } from '../../store/slices/mainSlice'
import { useTonConnectUI, useTonWallet } from '@tonconnect/ui-react'
import { createAddDirectoryAction, createAddUserAction, Update } from '@fairjournal/file-system'
import { DEFAULT_DIRECTORY, PROJECT_NAME, updateApply } from '../../utils/fs'
import { getPublicKey, personalSignString } from '../../utils/ton'
import { getUserInfo } from '../../api/users'

const pages = [{ page: 'About Us', route: 'aboutus' }]

export const Header = () => {
  const { wallet } = useAppSelector(selectMain)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [tonConnectUI] = useTonConnectUI()
  const walletTon = useTonWallet()

  useEffect(() => {
    // if (walletTon) {
    //   ;(async () => {
    //     const user = await loginUser(walletTon.account.address)
    //     dispatch(login(user))
    //   })()
    // }
    // todo use new login method
  }, [walletTon])

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    // eslint-disable-next-line no-console
    setAnchorElNav(event.currentTarget)
  }

  const connectWallet = async () => {
    try {
      if (tonConnectUI.connected) {
        await tonConnectUI.disconnect()
      }
      await tonConnectUI.connectWallet()
      const publicKey = await getPublicKey()
      const userInfo = await getUserInfo(publicKey)

      if (!userInfo.isUserExists) {
        const update = new Update(PROJECT_NAME, publicKey, 1)
        update.addAction(createAddUserAction(publicKey))
        update.addAction(createAddDirectoryAction(`/${DEFAULT_DIRECTORY}`))
        const signData = update.getSignData()
        const signature = await personalSignString(signData)
        update.setSignature(signature)
        const signedData = update.getUpdateDataSigned()
        await updateApply(signedData)
      }

      // todo don't use this login http method
      // const user = await loginUser(result.account.address)
      dispatch(
        login({
          id: 0,
          wallet: publicKey,
          avatar: '',
          name: 'No User Name',
          description: 'No User Description',
          articles: [0],
        }),
      )
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)

      return
    }
  }

  const handleCloseNavMenu = (route: string) => {
    const page = pages.find(page => page.route === route)

    if (page) {
      setAnchorElNav(null)
      navigate(`/${route}`)
    } else {
      setAnchorElNav(null)
    }
  }

  return (
    <AppBar position="fixed" color="secondary" sx={{ mb: 6, opacity: [0.9, 0.8, 0.8] }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/">
            <Avatar sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} alt="FJ" src="/images/logo1.png" />
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map(page => (
                <MenuItem key={page.route} onClick={() => handleCloseNavMenu(page.route)}>
                  <Typography textAlign="center">{page.page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <Link to="/">
              <Avatar alt="FJ" src="/images/logo1.png" />
            </Link>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end', mr: 2 }}>
            {pages.map(page => (
              <Button
                key={page.route}
                onClick={() => handleCloseNavMenu(page.route)}
                sx={{ my: 2, color: 'inherit', display: 'block' }}
              >
                {page.page}
              </Button>
            ))}
          </Box>
          {wallet ? (
            <Button variant="contained" color="primary" onClick={() => navigate('/dashboard')}>
              Dashboard
            </Button>
          ) : (
            <>
              <Button variant="contained" color="primary" onClick={connectWallet}>
                Connect wallet
              </Button>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}
