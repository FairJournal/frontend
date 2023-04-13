import * as React from 'react'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
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
import { logout, selectMain } from '../../store/slices/mainSlice'
import { Settings } from '../../components/settings'
import { ArticlCard } from '../../components/articleCard'
import { shortenString } from '../../utils'
import { SmallAvatar } from '../../components/smallAvatar'

const drawerWidth = 240

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window
}

const dataList = [
  { title: 'Articles', id: '1', icon: <InboxIcon /> },
  { title: 'Settings', id: '2', icon: <InboxIcon /> },
]

const articles = [
  {
    id: '1',
    img: '/images/M4.png',
    title: 'How it works',
    description: 'Injected by the documentation to work in an iframe t need it on your project...',
  },
  {
    id: '2',
    img: '/images/M5.png',
    title: 'How it works',
    description: 'Injected by the documentation to work in an iframe t need it on your project...',
  },
  {
    id: '3',
    img: '/images/M3.png',
    title: 'How it works',
    description: 'Injected by the documentation to work in an iframe t need it on your project...',
  },
  {
    id: '4',
    img: '/images/M2.png',
    title: 'How it works',
    description: 'Injected by the documentation to work in an iframe t need it on your project...',
  },
  {
    id: '5',
    img: '/images/M1.png',
    title: 'How it works',
    description: 'Injected by the documentation to work in an iframe t need it on your project...',
  },
]

export const Dashboard = (props: Props) => {
  const { profile, wallet } = useAppSelector(selectMain)
  const { window } = props
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [tab, setTab] = React.useState('1')

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const changeTab = (tab: string) => {
    setTab(tab)
    handleDrawerToggle()
  }

  const logOut = () => {
    dispatch(logout)
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
              <ListItemText primary={el.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={logOut}>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  )

  const container = window !== undefined ? () => window().document.body : undefined
  const shortWallet = shortenString(wallet)

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar sx={{ display: 'flex', justifyContent: { md: 'space-between', xs: 'space-around' } }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <SmallAvatar shortWallet={shortWallet} to="/profile" profile={profile} />
            <Button variant="outlined" color="success" sx={{ m: 1 }} onClick={goWrite}>
              <AddIcon />
              Write
            </Button>
          </Toolbar>
        </AppBar>
        <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            PaperProps={{
              sx: { backgroundColor: 'primary.light' },
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
              sx: { backgroundColor: 'primary.light' },
            }}
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
          <Toolbar />
          {tab === '1' && (
            <Grid container spacing={2} sx={{ pt: 2, mb: 8 }}>
              {articles.map(el => (
                <Grid key={el.id} item lg={4} md={6} xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <ArticlCard img={el.img} title={el.title} text={el.description} isEdit={true} />
                </Grid>
              ))}
            </Grid>
          )}
          {tab === '2' && <Settings />}
        </Box>
      </Box>
    </Container>
  )
}
