import { Box, Tooltip, Typography, useTheme } from '@mui/joy'
import { Outlet, useLoaderData, useMatch, useNavigate } from 'react-router-dom'
import { ContractRequest } from '../types'
import { StatusChip } from '../components/common'
import { useFaculties } from '../hooks/useFaculties'
import { currentLng } from '../util/i18n'
import { DataTable } from '../components/CustomTable'
import { useTranslation } from 'react-i18next'

const ContractRequestItem = ({ contractRequest, facultyName }: { contractRequest: ContractRequest; facultyName: string }) => {
  const open = useMatch(`private/contract-requests/${contractRequest.id}`)
  const navigate = useNavigate()
  const theme = useTheme()

  return (
    <tr onClick={() => navigate(`/private/contract-requests/${contractRequest.id}`)} style={{ cursor: 'pointer', ...(open ? { background: theme.vars.palette.background.level3 } : {}) }}>
      <td>{contractRequest.data.formData.email}</td>
      <td>{new Date(contractRequest.createdAt).toLocaleDateString()}</td>
      <td>
        <div>
          <Tooltip title={facultyName} placement="right">
            <span>{contractRequest.data.formData.faculty || 'Puuttuu'}</span>
          </Tooltip>
        </div>
      </td>
      <td>
        <StatusChip status={contractRequest.status} isTest={contractRequest.isTest} />
      </td>
    </tr>
  )
}

const ContractRequestList = () => {
  const contracts = useLoaderData() as ContractRequest[]
  const faculties = useFaculties()
  const { t } = useTranslation()

  return (
    <Box width="40%">
      <Typography level="h4" sx={{ mb: '1rem' }}>
        Työsopimuspyynnöt
      </Typography>
      <DataTable hover>
        <thead style={{ height: '3rem' }}>
          <tr>
            <th style={{ width: '14rem' }}>{t('common.sender')}</th>
            <th>{t('common.dateShort')}</th>
            <th>{t('common.facultyShort')}</th>
            <th>{t('common.contractRequestStatus')}</th>
          </tr>
        </thead>
        <tbody>
          {contracts.map((c) => (
            <ContractRequestItem contractRequest={c} key={c.id} facultyName={faculties?.find((f) => f.code === c.data.formData.faculty)?.name?.[currentLng()] ?? ''} />
          ))}
        </tbody>
      </DataTable>
    </Box>
  )
}

const ContractRequests = () => {
  return (
    <Box p="2rem">
      <Box display="flex" gap="2rem">
        <ContractRequestList />
        <Outlet />
      </Box>
    </Box>
  )
}

export default ContractRequests
