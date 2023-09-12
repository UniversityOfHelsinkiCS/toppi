import { Box, Sheet, Table, Typography } from '@mui/joy'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

const copyToClipboard = (text: string, successText: string) => {
  navigator.clipboard.writeText(text)
  toast.success(successText)
}

export const TableItem = ({ label, value, extra, copy = true }: { label: string; value?: string | number; extra?: string; copy?: boolean }) => {
  const { t } = useTranslation()
  const shownExtra = value ? extra : t('common.missing')

  return (
    <tr onClick={copy ? () => value && copyToClipboard('' + value, t('common.copySuccess')) : undefined} style={{ cursor: value && copy ? 'copy' : 'inherit' }}>
      <td>{label}</td>
      <td>
        <Box display="flex" gap="1rem" alignItems="end">
          {value && value}
          {shownExtra && <Typography level="body-sm">{shownExtra}</Typography>}
        </Box>
      </td>
    </tr>
  )
}

export const DataTable = ({ children, copy = false, hover = false }: { children: React.ReactNode; copy?: boolean; hover?: boolean }) => (
  <Sheet variant="outlined" sx={{ borderRadius: 'sm' }}>
    <Table
      noWrap
      hoverRow={copy || hover}
      sx={{
        '--TableCell-headBackground': (theme) => theme.vars.palette.background.level2,
        '--Table-headerUnderlineThickness': '1px',
        '--TableRow-hoverBackground': (theme) => theme.vars.palette.background.level2,
      }}
    >
      {children}
    </Table>
  </Sheet>
)
