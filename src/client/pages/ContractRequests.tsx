import { Box, Typography } from "@mui/joy";
import { useLoaderData } from "react-router-dom";
import { ContractRequest } from "../types";
import ContractRequestItem from "../components/ContractRequestItem";

const ContractRequests = () => {
  const contracts = useLoaderData() as ContractRequest[]

  return (
    <>
      <Box p="2rem">
        <Typography level="h4" sx={{ mb: "1rem" }}>Työsopimuspyynnöt</Typography>
        {contracts.map(c => (
          <ContractRequestItem contractRequest={c} key={c.id}/>
        ))}
      </Box>
    </>
  )
}

export default ContractRequests