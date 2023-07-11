import { Box, Button, Sheet, Table, Typography } from "@mui/joy";
import { Outlet, useLoaderData, useMatch } from "react-router-dom";
import { ContractRequest } from "../types";
import { Link as RouterLink } from "react-router-dom";
import { Search } from "@mui/icons-material";
import { StatusChip } from "../components/common";

const ContractRequestItem = ({ contractRequest }: { contractRequest: ContractRequest }) => {
  const open = useMatch(`private/contract-requests/${contractRequest.id}`)

  return (
    <tr>
      <td scope="row">#{contractRequest.id}</td>
      <td>{contractRequest.formData.formData.email}</td>
      <td>{new Date(contractRequest.createdAt).toLocaleDateString()}</td>
      <td><StatusChip status={contractRequest.status} /></td>
      <td>
        <Button size="sm" variant={open ? "solid" : "plain"} component={RouterLink} to={`/private/contract-requests/${contractRequest.id}`} endDecorator={<Search fontSize="small"/>}>
          Käsittele
        </Button>
      </td>
    </tr>
  )
}

const ContractRequestList = () => {
  const contracts = useLoaderData() as ContractRequest[]

  return (
    <Sheet variant="outlined" sx={{ borderRadius: "sm", flex: 0.5 }}>
      <Table hoverRow sx={{
        '--TableCell-headBackground': (theme) => theme.vars.palette.background.level1,
        '--Table-headerUnderlineThickness': '1px',
        '--TableRow-hoverBackground': (theme) => theme.vars.palette.background.level1,
      }}>
        <thead>
          <tr>
            <th>Nro</th>
            <th>Lähettäjä</th>
            <th>Pvm</th>
            <th>Pyynnön tila</th>
            <th />
          </tr>
        </thead>
        {contracts.map(c => (
          <ContractRequestItem contractRequest={c} key={c.id}/>
        ))}
      </Table>
    </Sheet>
  )
}

const ContractRequests = () => {

  return (
    <Box p="2rem">
      <Typography level="h4" sx={{ mb: "1rem" }}>Työsopimuspyynnöt</Typography>
      <Box display="flex">
        <ContractRequestList />
        <Outlet />
      </Box>
    </Box>
  )
}

export default ContractRequests