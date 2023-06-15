import { Box } from "@mui/joy";
import { useLoaderData } from "react-router-dom";
import { ContractRequest } from "../types";

const ContractRequests = () => {
  const contracts = useLoaderData() as ContractRequest[]

  return (
    <>
      <Box m="1rem">
        {contracts.map(c => (
          <Box key={c.id} m="0.5rem">
            # {c.id}, status: {c.status}, createdAt: {c.createdAt}
          </Box>
        ))}
      </Box>
    </>
  )
}

export default ContractRequests