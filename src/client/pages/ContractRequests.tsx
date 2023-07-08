import { Box, Button, Chip, Sheet, Table, Typography } from "@mui/joy";
import { Outlet, useLoaderData, useMatch } from "react-router-dom";
import { ContractRequest } from "../types";
import { Link as RouterLink } from "react-router-dom";
import { Search } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

const Sender = ({ contractRequest }: { contractRequest: ContractRequest }) => {
  return (
    <Box>
      <Typography level="body2">{contractRequest.formData.firstName} {contractRequest.formData.lastName}</Typography>
      <Typography level="body2">{contractRequest.formData.email}</Typography>
    </Box>
  )
}

const StatusChip = ({ status }: { status: ContractRequest["status"] }) => {
  const { t } = useTranslation()

  return (
    <Chip variant={status === "waiting" ? "solid" : "outlined"} size="sm">
      {t(`status.${status}`)}
    </Chip>
  )
}

const ContractRequestItem = ({ contractRequest }: { contractRequest: ContractRequest }) => {
  const open = useMatch(`private/contract-requests/${contractRequest.id}`)

  return (
    <tr>
      <td scope="row">#{contractRequest.id}</td>
      <td>{contractRequest.formData.email}</td>
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