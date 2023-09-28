import { Box, Chip, ChipDelete, Divider, Typography } from '@mui/joy'
import { useTranslation } from 'react-i18next'
import { ContractRequest, HandlerAddress } from '../types'

export const SectionDivider = () => <Divider sx={{ my: '4rem' }} />

export const StatusChip = ({ status, isTest = false }: { status: ContractRequest['status']; isTest?: boolean }) => {
  const { t } = useTranslation()
  const variant = isTest ? 'outlined' : status === 'waiting' ? 'solid' : 'outlined'
  const color = isTest ? 'neutral' : status === 'rejected' ? 'danger' : 'primary'

  return (
    <Chip variant={variant} size="sm" color={color}>
      {t(`status.${status}`)}
      {isTest && ` (${t('common.test')})`}
    </Chip>
  )
}

export const SmallHelsinkiFi = () => (
  <Typography sx={{ userSelect: 'none', color: 'inherit' }} fontSize={10}>
    @helsinki.fi
  </Typography>
)

export const HandlerAddressChip = ({ address, onDelete }: { address: HandlerAddress; onDelete?: (a: HandlerAddress) => Promise<void> }) => (
  <Chip variant="soft" endDecorator={onDelete && <ChipDelete onDelete={() => onDelete(address)} />}>
    <Box display="flex" alignItems="center">
      {address.address}
      <SmallHelsinkiFi />
    </Box>
  </Chip>
)
