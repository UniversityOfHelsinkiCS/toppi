import { Box, Typography } from "@mui/joy";
import { Outlet, useLoaderData } from "react-router-dom";
import { ContractRequest } from "../types";
import ContractRequestItem from "../components/ContractRequestItem";

const ContractRequestList = () => {
  const contracts = useLoaderData() as ContractRequest[]

  return (
    <Box>
      {contracts.map(c => (
        <ContractRequestItem contractRequest={c} key={c.id}/>
      ))}
    </Box>
  )
}

const ContractRequests = () => {

  return (
    <Box p="2rem">
      <Typography level="h4" sx={{ mb: "1rem" }}>Työsopimuspyynnöt</Typography>
      <Box display="flex" columnGap="2rem">
        <ContractRequestList />
        <Outlet />
      </Box>
    </Box>
  )
}

export default ContractRequests