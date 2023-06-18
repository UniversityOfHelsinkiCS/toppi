import { Box, Button, CssBaseline, Link, Sheet, Typography } from "@mui/joy";
import { Toaster } from "sonner";
import { GitHub } from "@mui/icons-material"
import hyLogo from "./assets/hy_logo.svg"
import toskaLogo from "./assets/toska13.png"
import { Link as RouterLink, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FeedbackProvider, useFeedback } from "./feedback/FeedbackProvider";

const Header = () => {
  const { t } = useTranslation()
  const { mode, setMode } = useFeedback()

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
      <Typography level="body2" sx={{ userSelect: "none" }}>{t("navbar.description")}</Typography>
      <Box ml="auto">
        <Button variant={mode === "disabled" ? "plain" : "solid"} onClick={() => setMode(mode === "disabled" ? "edit" : "disabled")}>Palautetila</Button>
      </Box>
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
    <FeedbackProvider>
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Header />
        <Outlet />
        <Footer />
      </Box>
    </FeedbackProvider>
  </CssBaseline>
)

export default Layout