import { useTranslation } from 'react-i18next'
import { useFaculties, useProgrammes } from '../hooks/useFaculties'
import { ContractDurationOption, ContractRequestFormParams } from '../../shared/types'
import { DataTable, TableItem } from './CustomTable'

const FormPreviewTable = ({ formData, copy }: { formData: ContractRequestFormParams; copy: boolean }) => {
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
    <DataTable copy={copy}>
      <thead style={{ height: '3rem' }}>
        <tr>
          <th scope="col" style={{ width: '40%' }}>
            {t('common.fieldName')}
          </th>
          <th scope="col">{t('common.fieldValue')}</th>
        </tr>
      </thead>
      <tbody>
        <TableItem copy={copy} label={t('formFields.firstName')} value={formData.firstName} />
        <TableItem copy={copy} label={t('formFields.lastName')} value={formData.lastName} />
        <TableItem copy={copy} label={t('formFields.email')} value={formData.email} />
        <TableItem copy={copy} label={t('formFields.birthDate')} value={formData.birthDate} />
        <TableItem copy={copy} label={t('common.faculty')} value={formData.faculty} extra={facultyDisplay(formData.faculty)} />
        <TableItem copy={copy} label={t('common.faculty')} value={formData.programme} extra={programmeDisplay(formData.programme)} />
        <TableItem copy={copy} label={t('formFields.courseName')} value={formData.courseName} />
        <TableItem copy={copy} label={t('formFields.courseStartDate')} value={formData.courseStartDate} />
        <TableItem copy={copy} label={t('formFields.courseEndDate')} value={formData.courseEndDate} />
        <TableItem copy={copy} label={t('formFields.contractStartDate')} value={formData.contractStartDate} extra={contractDisplay(formData.contractDuration)} />
        <TableItem copy={copy} label={t('formFields.contractEndDate')} value={formData.contractEndDate} extra={contractDisplay(formData.contractDuration)} />
        <TableItem copy={copy} label={t('formFields.additionalInfos')} value={formData.additionalInfo} missingText={t('common.notPresent')} />
      </tbody>
    </DataTable>
  )
}

export default FormPreviewTable
