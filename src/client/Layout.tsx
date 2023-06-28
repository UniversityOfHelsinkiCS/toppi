import { Box, Button, CssBaseline, Link, Sheet, Typography } from "@mui/joy";
import { Toaster } from "sonner";
import { GitHub, Login, Logout } from "@mui/icons-material"
import hyLogo from "./assets/hy_logo.svg"
import toskaLogo from "./assets/toska13.png"
import { Link as RouterLink, Outlet, useLoaderData } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { inStaging } from "../config";
import { UserParams } from "../shared/types";
import { handleLogout } from "./util/logout";

const Header = () => {
  const { t } = useTranslation()
  const user = useLoaderData() as UserParams|undefined

  return (
    <Sheet sx={{
      p: "1rem",
      mb: "4rem",
      columnGap: "1rem",
      alignItems: "center",
      display: "flex",
      borderRadius: "1rem",
    }}>
      <RouterLink to="/" style={{ textDecoration: "none" }}>
        <Box display="flex" alignItems="center" columnGap="1rem">
          <Box width="2rem">
            <img src={hyLogo} alt="hy logo" />
          </Box>
          <Typography>TOPPI</Typography>
        </Box>
      </RouterLink>
      <Typography level="body2" sx={{ userSelect: "none", mr: "auto" }}>{t("navbar.description")}</Typography>
      {inStaging && <Typography sx={{ ml: "1rem" }}>STAGING</Typography>}
      {user 
      ? <Box display="flex" gap="1rem">
          <Typography variant="soft">kirjautunut: {user.email}</Typography>
          <Button onClick={handleLogout} variant="soft" size="sm" endDecorator={<Logout />}>Kirjaudu ulos</Button>
        </Box>
      : <Link component={RouterLink} to="/private"><Typography endDecorator={<Login />}>Kirjaudu</Typography></Link>
      }
    </Sheet>
  )
}
const Footer = () => (
  <Sheet sx={{
    mt: "auto",
    p: "1rem",
    pt: "10rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    columnGap: "5rem",
    borderRadius: "1rem",
  }}>
    <Box>
      <Link href="https://toska.dev" ><img src={toskaLogo} alt="Toska" width={70}/></Link>
    </Box>
    <Typography level="body2">© Toska, Helsingin yliopisto</Typography>
    <Box>
      <Link href="https://github.com/UniversityOfHelsinkiCS/toppi" target="_blank"><GitHub fontSize='large'/></Link>
    </Box>
  </Sheet>
)

const Layout = () => (
  <CssBaseline>
    <Toaster />
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Header />
      <Outlet />
      <Footer />
    </Box>
  </CssBaseline>
)

export default Layout