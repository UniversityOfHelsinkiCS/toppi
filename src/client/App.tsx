import { Box, CssBaseline, Divider, Link, Sheet, Typography } from "@mui/joy"
import Calculator from "./Calculator"
import { GitHub } from "@mui/icons-material"
import hyLogo from "./assets/hy_logo.svg"
import toskaLogo from "./assets/toska13.png"
import ContractForm from "./ContractForm"

const Header = () => {
  return (
    <Sheet sx={{
      p: "1rem",
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
}

const Footer = () => {
  return (
    <Sheet sx={{
      p: "1rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      columnGap: "5rem",
      mt: "10rem",
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
}

function App() {

  return (
    <CssBaseline>
      <Header />
      <Calculator />
      <Divider />
      <ContractForm />
      <Footer />
    </CssBaseline>
  )
}

export default App
