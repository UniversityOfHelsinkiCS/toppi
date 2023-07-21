import { Box, Sheet, Table, Typography } from "@mui/joy"
import { toast } from "sonner"

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text)
  toast.success("Kopioitu leikepöydälle")
}

export const TableItem = ({ label, value, extra, copy = true }: { label: string, value?: string|number, extra?: string, copy?: boolean }) => {
  const shownExtra = value ? extra : "Puuttuu"

  return (
    <tr 
      onClick={copy ? () => value && copyToClipboard("" + value) : undefined} 
      style={{ cursor: value && copy ? 'copy' : 'inherit' 
    }}>
      <td>{label}</td>
      <td>
        <Box display="flex" gap="1rem" alignItems="end">
          {value && value}
          {shownExtra && <Typography level="body3">{shownExtra}</Typography>}
        </Box>
      </td>
    </tr>
  )
}

export const DataTable = ({ children, copy = false }: { children: React.ReactNode, copy: boolean }) => (
  <Sheet variant="outlined" sx={{ borderRadius: "sm" }}>
    <Table hoverRow={copy} sx={{
      '--TableCell-headBackground': (theme) => theme.vars.palette.background.level1,
      '--Table-headerUnderlineThickness': '1px',
      '--TableRow-hoverBackground': (theme) => theme.vars.palette.background.level1,
    }}>
      {children}
    </Table>
  </Sheet>
)
