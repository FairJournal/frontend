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
import { selectMain, login, changeProfile } from '../../store/slices/mainSlice'
import { useTonConnectUI } from '@tonconnect/ui-react'
import { createUser } from '../../utils/fs'
import { getPublicKey } from '../../utils/ton'
import { getProfileInfo, getUserInfo } from '../../api/users'

const pages = [{ page: 'About Us', route: 'aboutus' }]

export const Header = () => {
  const { publickey } = useAppSelector(selectMain)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [tonConnectUI] = useTonConnectUI()

  useEffect(() => {
    if (publickey) {
      ;(async () => {
        const profile = await getProfileInfo(publickey)
        dispatch(changeProfile(profile))
      })()
    }
  }, [publickey])

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

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
          {publickey ? (
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
