import { Chip, Divider } from '@mui/joy'
import { useTranslation } from 'react-i18next'
import { ContractRequest } from '../types'

export const SectionDivider = () => <Divider sx={{ my: '4rem' }} />

export const StatusChip = ({ status }: { status: ContractRequest["status"] }) => {
  const { t } = useTranslation()

  return (
    <Chip variant={status === "waiting" ? "solid" : "outlined"} size="sm" color={status === "rejected" ? "danger" : "primary"}>
      {t(`status.${status}`)}
    </Chip>
  )
}