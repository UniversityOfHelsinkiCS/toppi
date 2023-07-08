import { Box, Chip, Sheet, Typography, Button, Divider } from "@mui/joy"
import { Link as RouterLink, useMatch } from "react-router-dom"
import { ContractRequest } from "../types"
import { Search } from "@mui/icons-material"

const ContractRequestItem = ({ contractRequest }: { contractRequest: ContractRequest }) => {
  const open = useMatch(`private/contract-requests/${contractRequest.id}`)

  return (
    <Sheet sx={{
      display: "flex",
      p: "0.5rem",
      px: "1.5rem",
      borderRadius: "0.5rem",
      '&:hover': {
        backgroundColor: theme => theme.palette.background.level1,
      },
      ...(open ? {
        backgroundColor: theme => theme.palette.background.level1,
      } : {})
    }}>
      <Typography level="body2" pr="1rem">#{contractRequest.id}</Typography>
      <Box display="flex" flexDirection="column" alignItems="start">
        <Box display="flex" alignItems="center" gap="0.5rem">
          <Typography level="body3">Lähetetty</Typography> 
          <Typography level="body3">{new Date(contractRequest.createdAt).toLocaleString()}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="0.3rem">
          <Typography sx={{ py: "0.3rem"}}>{contractRequest.formData.email}</Typography>
          {contractRequest.User && (
            <Chip variant="soft" color="success" size="sm">
              Verified
            </Chip>
          )}
        </Box>
      </Box>
      <Box ml="auto" pl="1rem" display="flex" alignItems="center">
        <Divider orientation="vertical" />
        <Box px="1rem">
          <Chip variant="outlined">
            {contractRequest.status}
          </Chip>
        </Box>
        <Box>
          <Button size="sm" variant={open ? "solid" : "plain"} component={RouterLink} to={`/private/contract-requests/${contractRequest.id}`} endDecorator={<Search fontSize="small"/>}>
            Käsittele
          </Button>
        </Box>
      </Box>
    </Sheet>
  )
}

export default ContractRequestItem