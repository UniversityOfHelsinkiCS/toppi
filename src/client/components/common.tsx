import { Box, Chip, ChipDelete, Divider, Typography } from '@mui/joy'
import { useTranslation } from 'react-i18next'
import { ContractRequest, HandlerAddress } from '../types'

export const SectionDivider = () => <Divider sx={{ my: '4rem' }} />

export const StatusChip = ({ status }: { status: ContractRequest["status"] }) => {
  const { t } = useTranslation()

  return (
    <Chip variant={status === "waiting" ? "solid" : "outlined"} size="sm" color={status === "rejected" ? "danger" : "primary"}>
      {t(`status.${status}`)}
    </Chip>
  )
}

export const SmallHelsinkiFi = () => <Typography sx={{ userSelect: 'none', color: 'inherit' }} fontSize={10}>@helsinki.fi</Typography>

export const HandlerAddressChip = ({ 
  address, 
  onDelete
}: { 
  address: HandlerAddress, 
  onDelete?: (a: HandlerAddress) => Promise<void> 
}) => (
  <Chip
    variant="soft"
    endDecorator={onDelete && <ChipDelete onDelete={() => onDelete(address)} />}
  >
    <Box display="flex" alignItems="center">{address.address}<SmallHelsinkiFi /></Box>
  </Chip>
)