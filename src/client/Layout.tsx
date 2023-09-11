import { Box, CssBaseline, Link, Sheet, Typography } from '@mui/joy'
import { Toaster } from 'sonner'
import { GitHub } from '@mui/icons-material'
import toskaLogo from './assets/toska13.png'
import { Outlet } from 'react-router-dom'
import { Navbar } from './components/Navbar'

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

const Layout = () => (
  <CssBaseline>
    <Toaster />
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar />
      <Outlet />
      <Footer />
    </Box>
  </CssBaseline>
)

export default Layout
