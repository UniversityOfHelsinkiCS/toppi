import { Form, useLoaderData } from 'react-router-dom'
import { Alert, Box, Button, FormControl, FormLabel, Sheet, Textarea, Typography } from '@mui/joy'
import React from 'react'
import { HandlerAddressChip, SectionDivider, StatusChip } from '../components/common'
import { useFaculties, useProgrammes } from '../hooks/useFaculties'
import { ContractRequest, HandlerAddress } from '../types'
import { ContractDurationOption, ContractRequestFormParams, contractRequestStatuses } from '../../shared/types'
import { useTranslation } from 'react-i18next'
import { TableItem, DataTable } from '../components/CustomTable'
import CalculatorPreview from '../components/CalculatorPreview'
import { useHandlerAddresses } from '../hooks/useHandlerAddresses'
import { Warning } from '@mui/icons-material'

const Raw = ({ data }: { data: ContractRequest }) => {
  return (
    <Box>
      <Typography whiteSpace="pre-wrap" fontFamily="monospace">
        {JSON.stringify(data, null, 2)}
      </Typography>
    </Box>
  )
}

const FormattedFormData = ({ formData }: { formData: ContractRequestFormParams }) => {
  const { t } = useTranslation()
  const faculties = useFaculties()
  const programmes = useProgrammes(formData.faculty)

  const facultyDisplay = (code: string | undefined) => {
    const faculty = faculties?.find((f) => f.code === code)
    return faculty ? faculty.name.fi : undefined
  }
  const programmeDisplay = (code: string | undefined) => {
    const programme = programmes?.find((p) => p.key === code)
    return programme ? programme.name.fi : undefined
  }
  const contractDisplay = (duration: ContractDurationOption) => (duration === 'custom' ? t('formFields.customContractDuration') : t('formFields.recommendedContractDuration'))

  return (
    <DataTable copy>
      <thead style={{ height: '3rem' }}>
        <tr>
          <th scope="col">{t('common.fieldName')}</th>
          <th scope="col">{t('common.fieldValue')}</th>
        </tr>
      </thead>
      <tbody>
        <TableItem label={t('formFields.firstName')} value={formData.firstName} />
        <TableItem label={t('formFields.lastName')} value={formData.lastName} />
        <TableItem label={t('formFields.email')} value={formData.email} />
        <TableItem label={t('formFields.birthDate')} value={formData.birthDate} />
        <TableItem label={t('common.faculty')} value={formData.faculty} extra={facultyDisplay(formData.faculty)} />
        <TableItem label={t('common.faculty')} value={formData.programme} extra={programmeDisplay(formData.programme)} />
        <TableItem label={t('formFields.courseName')} value={formData.courseName} />
        <TableItem label={t('formFields.courseStartDate')} value={formData.courseStartDate} />
        <TableItem label={t('formFields.courseEndDate')} value={formData.courseEndDate} />
        <TableItem label={t('formFields.contractStartDate')} value={formData.contractStartDate} extra={contractDisplay(formData.contractDuration)} />
        <TableItem label={t('formFields.contractEndDate')} value={formData.contractEndDate} extra={contractDisplay(formData.contractDuration)} />
        <TableItem label={t('formFields.additionalInfos')} value={formData.additionalInfo} />
      </tbody>
    </DataTable>
  )
}

const Formatted = ({ contractRequest }: { contractRequest: ContractRequest }) => {
  const { t } = useTranslation()

  return (
    <Box>
      <Typography level="body-sm">{t('common.clickToCopy')}</Typography>
      <FormattedFormData formData={contractRequest.data.formData} />
      <Typography level="body-md" mt="2rem" mb="0.5rem">
        {t('contractRequestView.calculatorFields')}
      </Typography>
      <CalculatorPreview {...contractRequest.data.calculatorData} copy />
    </Box>
  )
}

const HandlerAddresses = ({ handlerAddresses }: { handlerAddresses: HandlerAddress[] }) => {
  const { t } = useTranslation()

  return (
    <Box>
      <Typography level="h4">{t('contractRequestView.contractHandlerAddresses')}</Typography>
      <Box display="flex" pt="0.5rem" flexWrap="wrap" gap="0.5rem">
        {handlerAddresses.length === 0 && (
          <Alert color="warning" startDecorator={<Warning />}>
            {t('contractRequestView.noHandlers')}
          </Alert>
        )}
        {handlerAddresses.map((address) => (
          <Box key={address.id}>
            <HandlerAddressChip address={address} />
          </Box>
        ))}
      </Box>
    </Box>
  )
}

const UpdateStatus = ({ contractRequest }: { contractRequest: ContractRequest }) => {
  const { t } = useTranslation()

  const actions = contractRequestStatuses.map((status) => ({
    status: status,
    buttonProps: {
      key: status,
      name: 'status',
      value: status,
      type: 'submit',
      disabled: status === contractRequest.status,
      color: status === 'rejected' ? 'danger' : ('primary' as 'danger' | 'primary'),
      variant: 'solid' as 'plain' | 'solid',
    },
  }))

  return (
    <Form method="put" id="contract-request-status">
      <Box display="flex" flexDirection="column" gap="1rem">
        <Typography level="h4">
          {t('contractRequestView.updateStatus')}: <StatusChip status={contractRequest.status} />
        </Typography>
        <Typography>{t('contractRequestView.updateStatusInstructions')}</Typography>
        <Box py="1rem" display="flex" flexDirection="column" gap="1rem">
          <FormControl>
            <FormLabel>{t('common.message')}</FormLabel>
            <Textarea placeholder={t('contractRequestView.messageDescription')} />
          </FormControl>
          <Box display="flex" gap="1rem">
            {actions.map((action) => (
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
  const handlerAddresses = useHandlerAddresses({ facultyCode: contractRequest.data.formData.faculty || 'missing' })
  const [viewRaw, setViewRaw] = React.useState(false)

  return (
    <Sheet sx={{ px: '3rem', flex: 0.5 }}>
      <Typography level="h4">Pyynnön #{contractRequest.id} tiedot</Typography>
      <Box display="flex">
        <Button sx={{ ml: 'auto' }} onClick={() => setViewRaw(!viewRaw)} variant="plain" size="sm">
          {viewRaw ? 'Katso muotoiltuna' : 'Katso raakadata'}
        </Button>
      </Box>
      {viewRaw ? <Raw data={contractRequest} /> : <Formatted contractRequest={contractRequest} />}
      <SectionDivider />
      <UpdateStatus contractRequest={contractRequest} />
      <SectionDivider />
      {handlerAddresses && <HandlerAddresses handlerAddresses={handlerAddresses} />}
    </Sheet>
  )
}

export default ContractRequestView
