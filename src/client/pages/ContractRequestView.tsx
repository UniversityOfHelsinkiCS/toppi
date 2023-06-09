import { Form, useLoaderData } from "react-router-dom"
import { Box, Button, FormControl, FormLabel, Sheet, Table, Textarea, Typography } from "@mui/joy"
import React from "react"
import { toast } from "sonner"
import { SectionDivider, StatusChip } from "../components/common"
import { useFaculties, useProgrammes } from "../hooks/useFaculties"
import { ContractRequest } from "../types"
import { ContractDurationOption, contractRequestStatuses } from "../../shared/types"
import { useTranslation } from "react-i18next"

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

const TableItem = ({ label, value, extra }: { label: string, value?: string, extra?: string }) => {
  const shownExtra = value ? extra : "Puuttuu"

  return (
    <tr onClick={() => value && copyToClipboard(value)} style={{ cursor: value ? 'copy' : 'inherit' }}>
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

const FormattedFormData = ({ contractRequest }: { contractRequest: ContractRequest }) => {
  const { formData } = contractRequest.data
  const faculties = useFaculties()
  const programmes = useProgrammes(formData.faculty)

  const facultyDisplay = (code: string|undefined) => {
    const faculty = faculties?.find(f => f.code === code)
    return faculty ? faculty.name.fi : undefined
  }
  const programmeDisplay = (code: string|undefined) => {
    const programme = programmes?.find(p => p.key === code)
    return programme ? programme.name.fi : undefined
  }
  const contractDisplay = (duration: ContractDurationOption) => 
    duration === "custom" ? "Itse merkattu" : "Suositeltu"

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
          <TableItem label="Tiedekunta" value={formData.faculty} extra={facultyDisplay(formData.faculty)} />
          <TableItem label="Koulutusohjelma" value={formData.programme} extra={programmeDisplay(formData.programme)} />
          <TableItem label="Kurssin nimi" value={formData.courseName} />
          <TableItem label="Kurssin alkupäivä" value={formData.courseStartDate} />
          <TableItem label="Kurssin loppupäivä" value={formData.courseEndDate} />
          <TableItem label="Sopimuksen alkupäivä" value={formData.contractStartDate} extra={contractDisplay(formData.contractDuration)} />
          <TableItem label="Sopimuksen loppupäivä" value={formData.contractEndDate} extra={contractDisplay(formData.contractDuration)} />
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
      <FormattedFormData contractRequest={contractRequest} />
    </Box>
  )
}

const UpdateStatus = ({ contractRequest }: { contractRequest: ContractRequest }) => {
  const { t } = useTranslation()

  const actions = contractRequestStatuses.map(status => ({
    status: status,
    buttonProps: {
      key: status,
      name: "status",
      value: status,
      type: "submit",
      disabled: status === contractRequest.status,
      color: status === "rejected" ? "danger" : "primary" as "danger"|"primary",
      variant: status === "handled" ? "solid" : "plain" as "solid"|"plain",
    },
  }))

  return (
    <Form method="put" id="contract-request-status">
      <Box display="flex" flexDirection="column" gap="1rem">
        <Typography level="h4">
          Päivitä pyynnön tila: <StatusChip status={contractRequest.status} />
        </Typography>
        <Typography>
          Jos pyyntö on nyt käsitelty, merkkaa se valmiiksi. Jos tiedoissa on jotain korjattavaa, merkkaa se korjattavaksi.
          Pyynnön lähettäjä saa sähköpostiinsa ilmoituksen pyynnön tilan muutoksesta.
        </Typography>
        <Box py="1rem" display="flex" flexDirection="column" gap="1rem">
          <FormControl>
            <FormLabel>Viesti</FormLabel>
            <Textarea placeholder="Vapaamuotoinen lisätieto tilan päivitykselle"/>
          </FormControl>
          <Box display="flex" gap="1rem">
            {actions.map(action => (
              <Button {...action.buttonProps}>{t(`setStatusAction.${action.status}`)}</Button>
            ))}
          </Box>
        </Box>
      </Box>
    </Form>
  )
}

const ContractRequestView = () => {
  const contractRequest = useLoaderData() as ContractRequest
  const [viewRaw, setViewRaw] = React.useState(false)

  return (
    <Sheet sx={{ px: "2rem", flex: 0.5 }}>
      <Typography level="h4">
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
      <UpdateStatus contractRequest={contractRequest} />
    </Sheet>
  )
}

export default ContractRequestView
