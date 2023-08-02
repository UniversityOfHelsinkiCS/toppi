import { Box, Button, Sheet, Table, Tooltip, Typography } from "@mui/joy";
import { Outlet, useLoaderData, useMatch } from "react-router-dom";
import { ContractRequest } from "../types";
import { Link as RouterLink } from "react-router-dom";
import { Search } from "@mui/icons-material";
import { StatusChip } from "../components/common";
import { useFaculties } from "../hooks/useFaculties";
import { currentLng } from "../util/i18n";

const ContractRequestItem = ({ contractRequest, facultyName }: { contractRequest: ContractRequest, facultyName: string }) => {
  const open = useMatch(`private/contract-requests/${contractRequest.id}`)

  return (
    <tr>
      <td>#{contractRequest.id}</td>
      <td>{contractRequest.data.formData.email}</td>
      <td>
        <div>
          <Tooltip title={facultyName} placement="right">
            <span>{contractRequest.data.formData.faculty ?? 'Puuttuu'}</span>
          </Tooltip>
        </div>
      </td>
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
  const faculties = useFaculties()

  return (
    <Box flex={0.5}>
      <Typography level="h4" sx={{ mb: "1rem" }}>Työsopimuspyynnöt</Typography>
      <Sheet variant="outlined" sx={{ borderRadius: "sm" }}>
        <Table hoverRow sx={{
          '--TableCell-headBackground': (theme) => theme.vars.palette.background.level1,
          '--Table-headerUnderlineThickness': '1px',
          '--TableRow-hoverBackground': (theme) => theme.vars.palette.background.level1,
        }}>
          <thead>
            <tr>
              <th>Nro</th>
              <th>Lähettäjä</th>
              <th>TDK</th>
              <th>Pvm</th>
              <th>Pyynnön tila</th>
              <th />
            </tr>
          </thead>
          {contracts.map(c => (
            <ContractRequestItem 
              contractRequest={c} 
              key={c.id} 
              facultyName={faculties?.find(f => f.code === c.data.formData.faculty)?.name?.[currentLng()] ?? ''}
            />
          ))}
        </Table>
      </Sheet>
    </Box>
  )
}

const ContractRequests = () => {

  return (
    <Box p="2rem">
      <Box display="flex">
        <ContractRequestList />
        <Outlet />
      </Box>
    </Box>
  )
}

export default ContractRequests
