import { Box, Typography } from '@mui/joy'
import CalculatorPreview from './CalculatorPreview'
import FormPreviewTable from './FormPreviewTable'
import { useTranslation } from 'react-i18next'
import { ContractRequestFormParams } from '../../shared/types'
import { useCalculatorParams } from '../store/calculatorStore'

const FormPreview = ({ formData }: { formData: ContractRequestFormParams }) => {
  const { t } = useTranslation()
  const previewData = useCalculatorParams()

  return (
    <Box>
      <Typography level="h2" sx={{ mb: '1rem' }}>
        {t('contractRequestPreview.title')}
      </Typography>
      <Typography sx={{ mb: '3rem' }}>{t('contractRequestPreview.description')}</Typography>
      <Typography level="h3" mt="2rem" mb="0.5rem">
        {t('contractRequestView.calculatorFields')}
      </Typography>
      <CalculatorPreview {...previewData} copy={false} />
      <Typography level="h3" mt="2rem" mb="0.5rem">
        {t('contractRequestPreview.formFieldsSection')}
      </Typography>
      <FormPreviewTable formData={formData} copy={false} />
    </Box>
  )
}

export default FormPreview
