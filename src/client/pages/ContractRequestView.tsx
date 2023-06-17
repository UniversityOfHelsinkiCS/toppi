import { useLoaderData } from "react-router-dom"
import { ContractRequest } from "../types"
import { Box, Sheet, Typography } from "@mui/joy"

const ContractRequestView = () => {
  const contractRequest = useLoaderData() as ContractRequest

  return (
    <Sheet variant="soft" sx={{ p: "1rem",}}>
      <Typography whiteSpace="pre-wrap" fontFamily="monospace">
        {JSON.stringify(contractRequest, null, 2)}
      </Typography>
    </Sheet>
  )
}

export default ContractRequestView