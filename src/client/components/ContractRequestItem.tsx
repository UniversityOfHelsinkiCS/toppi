import { Box, Chip, Sheet, Typography, Button } from "@mui/joy"
import { Link as RouterLink, useMatch } from "react-router-dom"
import { ContractRequest } from "../types"
import { Search } from "@mui/icons-material"

const ContractRequestItem = ({ contractRequest }: { contractRequest: ContractRequest }) => {
  const open = useMatch(`/contract-requests/${contractRequest.id}`)

  return (
    <Sheet sx={{
      display: "flex",
      alignItems: "center",
      columnGap: "0.5rem",
      my: "1rem",
      p: "0.5rem",
    }} variant={open ? "soft" : "plain"}>
      <Typography level="body2" pr="1rem">#{contractRequest.id}</Typography>
      <Typography level="body2">Lähetetty:</Typography> 
      <Typography level="body1">{contractRequest.createdAt}</Typography>
      <Box pl="2rem">
        <Chip variant="outlined">
          {contractRequest.status}
        </Chip>
      </Box>
      <Button sx={{ ml: "auto" }} size="sm" variant="soft" component={RouterLink} to={`/contract-requests/${contractRequest.id}`} endDecorator={<Search fontSize="small"/>}>
        Käsittele
      </Button>
    </Sheet>
  )
}

export default ContractRequestItem