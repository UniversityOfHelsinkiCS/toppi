import { Box, CssBaseline, Link, Sheet, Typography } from "@mui/joy";
import React from "react";
import { Toaster } from "sonner";
import { GitHub } from "@mui/icons-material"
import hyLogo from "./assets/hy_logo.svg"
import toskaLogo from "./assets/toska13.png"
import { Outlet } from "react-router-dom";

const Header = () => (
  <Sheet sx={{
    p: "1rem",
    mb: "4rem",
    columnGap: "1rem",
    alignItems: "center",
    display: "flex",
    borderRadius: "1rem",
  }}>
    <Box width="2rem">
      <img src={hyLogo} alt="hy logo" />
    </Box>
    <Box display="flex" alignItems="center" columnGap="1rem">
      <Typography level="body1">TOPPI</Typography>
      <Typography level="body2">– TYÖKALU ULKOPUOLISTEN TUNTIOPETTAJIEN TYÖAIKOJEN JA PALKKIOIDEN LASKEMISEEN</Typography>
    </Box>
  </Sheet>
)

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
      <a href="https://toska.dev" ><img src={toskaLogo} alt="Toska" width={70}/></a>
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