import { useLoaderData } from "react-router-dom"
import { ContractRequest } from "../types"
import { Box, Button, IconButton, Sheet, Table, Typography } from "@mui/joy"
import React from "react"
import { ContentCopy, Explicit, Info, Warning } from "@mui/icons-material"
import { toast } from "sonner"
import { SectionDivider } from "../components/common"

const Raw = ({ data }: { data: ContractRequest }) => {
  return (
    <Box>
      <Typography whiteSpace="pre-wrap" fontFamily="monospace">{JSON.stringify(data, null, 2)}</Typography>
    </Box>
  )
}

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text)
  toast.success("Kopioitu leikepöydälle")
}

const TableItem = ({ label, value }: { label: string, value?: string }) => {
  return (
    <tr onClick={() => value && copyToClipboard(value)} style={{ cursor: value ? 'pointer' : 'inherit' }}>
      <td>{label}</td>
      <td>{value ? value : <Typography level="body3">Puuttuu</Typography>}</td>
    </tr>
  )
}

const FormattedFormData = ({ formData }: { formData: ContractRequest["formData"] }) => {
  return (
    <Sheet variant="outlined" sx={{ borderRadius: "sm" }}>
      <Table hoverRow sx={{
        '--TableCell-headBackground': (theme) => theme.vars.palette.background.level1,
        '--Table-headerUnderlineThickness': '1px',
        '--TableRow-hoverBackground': (theme) => theme.vars.palette.background.level1,
      }}>
        <thead>
          <tr>
            <th scope="col">Kentän nimi</th>
            <th scope="col">Arvo</th>
          </tr>
        </thead>
        <tbody>
          <TableItem label="Etunimi" value={formData.firstName} />
          <TableItem label="Sukunimi" value={formData.lastName} />
          <TableItem label="Sähköposti" value={formData.email} />
          <TableItem label="Syntymäaika" value={formData.birthDate} />
          <TableItem label="Kurssin nimi" value={formData.courseName} />
          <TableItem label="Kurssin alkupäivä" value={formData.courseStartDate} />
          <TableItem label="Kurssin loppupäivä" value={formData.courseEndDate} />
          <TableItem label="Sopimuksen alkupäivä" value={formData.contractStartDate} />
          <TableItem label="Sopimuksen loppupäivä" value={formData.contractEndDate} />
          <TableItem label="Lisätiedot" value={formData.additionalInfo} />
        </tbody>
      </Table>
    </Sheet>
  )
}

const Formatted = ({ contractRequest }: { contractRequest: ContractRequest }) => {
  return (
    <Box>
      <Typography level="body3">Klikkaa riviä kopioidaksesi kentän arvon</Typography>
      <FormattedFormData formData={contractRequest.formData} />
    </Box>
  )
}

const ContractRequestView = () => {
  const contractRequest = useLoaderData() as ContractRequest
  const [viewRaw, setViewRaw] = React.useState(false)

  return (
    <Sheet sx={{ p: "1rem",}}>
      <Typography level="h1" fontSize="xl4">
        Pyynnön #{contractRequest.id} tiedot
      </Typography>
      <Box display="flex">
        <Button sx={{ ml: "auto" }} onClick={() => setViewRaw(!viewRaw)} variant="plain" size="sm">
          {viewRaw ? "Katso muotoiltuna" : "Katso raakadata"}
        </Button>
      </Box>
      {viewRaw ? (
        <Raw data={contractRequest} />
      ) : (
        <Formatted contractRequest={contractRequest} />
      )}
      <SectionDivider />
      <Typography level="h2" fontSize="xl">
        Päivitä pyynnön tila
      </Typography>
      <Typography>
        Jos pyyntö on nyt käsitelty, merkkaa se valmiiksi. Jos tiedoissa on jotain korjattavaa, merkkaa se korjattavaksi.
        Pyynnön lähettäjä saa sähköpostiinsa ilmoituksen pyynnön tilan muutoksesta.
      </Typography>
    </Sheet>
  )
}

export default ContractRequestView