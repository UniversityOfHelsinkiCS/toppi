import { Form, useLoaderData } from 'react-router-dom'
import { Alert, Box, Button, FormControl, FormLabel, Textarea, Typography } from '@mui/joy'
import React from 'react'
import { HandlerAddressChip, SectionDivider, StatusChip } from '../components/common'
import { ContractRequest, HandlerAddress } from '../types'
import { contractRequestStatuses } from '../../shared/types'
import { useTranslation } from 'react-i18next'
import CalculatorPreview from '../components/CalculatorPreview'
import { useHandlerAddresses } from '../hooks/useHandlerAddresses'
import { Warning } from '@mui/icons-material'
import FormPreviewTable from '../components/FormPreviewTable'

const Raw = ({ data }: { data: ContractRequest }) => {
  return (
    <Box>
      <Typography whiteSpace="pre-wrap" fontFamily="monospace">
        {JSON.stringify(data, null, 2)}
      </Typography>
    </Box>
  )
}

const Formatted = ({ contractRequest }: { contractRequest: ContractRequest }) => {
  const { t } = useTranslation()

  return (
    <Box>
      <Typography level="body-sm">{t('common.clickToCopy')}</Typography>
      <FormPreviewTable formData={contractRequest.data.formData} copy />
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
  const { t } = useTranslation()
  const contractRequest = useLoaderData() as ContractRequest
  const { handlerAddresses } = useHandlerAddresses({ facultyCode: contractRequest.data.formData.faculty || 'missing' })
  const [viewRaw, setViewRaw] = React.useState(false)

  return (
    <Box width="50%">
      <Typography level="h4">Pyynnön #{contractRequest.id} tiedot</Typography>
      {contractRequest.isTest && <Alert sx={{ my: '1rem' }}>{t('contractRequestView.testInfo')}</Alert>}
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
    </Box>
  )
}

export default ContractRequestView
