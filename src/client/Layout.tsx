import { Box, CssVarsProvider, Link, Sheet, Typography, extendTheme } from '@mui/joy'
import { Toaster } from 'sonner'
import { GitHub } from '@mui/icons-material'
import toskaLogo from './assets/toska13.png'
import { Outlet } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import AdminLoggedInAsBanner from './components/AdminLoggedInAsBanner'

const Footer = () => (
  <Sheet
    sx={{
      mt: 'auto',
      p: '1rem',
      pt: '10rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      columnGap: '5rem',
      borderRadius: '1rem',
    }}
  >
    <Box>
      <Link href="https://toska.dev">
        <img src={toskaLogo} alt="Toska" width={70} />
      </Link>
    </Box>
    <Typography level="body-md">© Toska, Helsingin yliopisto</Typography>
    <Box>
      <Link href="https://github.com/UniversityOfHelsinkiCS/toppi" target="_blank">
        <GitHub fontSize="large" />
      </Link>
    </Box>
  </Sheet>
)

const theme = extendTheme({
  components: {
    JoySheet: {
      styleOverrides: {
        root: {
          boxShadow: '1px 4px 8px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.15)',
        },
      },
    },
  },
})

const Layout = () => (
  <CssVarsProvider theme={theme}>
    <Toaster />
    <AdminLoggedInAsBanner />
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar />
      <Outlet />
      <Footer />
    </Box>
  </CssVarsProvider>
)

export default Layout
