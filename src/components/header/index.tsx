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
// eslint-disable-next-line unused-imports/no-unused-imports
import { logout, selectMain, login } from '../../store/slices/mainSlice'
import { useTonConnectUI, useTonWallet } from '@tonconnect/ui-react'

const pages = [
  { page: 'About Us', route: 'aboutus' },
  { page: 'How it works', route: 'howitworks' },
  { page: 'Blog', route: 'blog' },
  { page: 'Community', route: 'community' },
]

export const Header = () => {
  const { wallet } = useAppSelector(selectMain)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [tonConnectUI] = useTonConnectUI()
  const walletTon = useTonWallet()

  useEffect(() => {
    if (walletTon) {
      dispatch(login(walletTon?.account.address))
    } else {
      dispatch(login(''))
    }
  }, [walletTon])

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const connectWallet = async () => {
    const result = await tonConnectUI.connectWallet()
    dispatch(login(result.account.address))
  }

  const handleCloseNavMenu = (route: string) => {
    setAnchorElNav(null)
    navigate(`/${route}`)
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/">
            <Avatar sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} alt="FJ" src="/images/F1.png" />
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
              <Avatar alt="FJ" src="/images/F1.png" />
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
            <Button variant="outlined" color="inherit" onClick={() => navigate('/dashboard')}>
              Dashboard
            </Button>
          ) : (
            <>
              <Button variant="outlined" color="inherit" onClick={connectWallet}>
                Connect wallet
              </Button>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}
