import { useTranslation } from 'react-i18next'
import { CalculatorParams } from '../../shared/types'
import { DataTable, TableItem } from './CustomTable'
import { Box } from '@mui/joy'

const CalculatorPreview = ({
  teachingHours,
  courseType,
  credits,
  preparationHours,
  studentCount,
  hourlyRate,
  totalHours,
  workHourExceptions,
  salary,
  salaryExceptions,
  copy,
}: CalculatorParams & { copy: boolean }) => {
  const { t } = useTranslation()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <DataTable copy={copy}>
        <tbody>
          <TableItem label={t('calculatorFields.teachingHours')} value={teachingHours} extra="h" copy={copy} />
          <TableItem label={t('calculatorFields.courseType')} value={courseType?.label} copy={copy} />
          <TableItem label={t('calculatorFields.credits')} value={credits?.label} copy={copy} />
          <TableItem label={t('calculatorFields.preparationHours')} value={preparationHours} extra="h" copy={copy} />
          <TableItem label={t('calculatorFields.studentCount')} value={studentCount?.label} copy={copy} />
          <TableItem label={t('calculatorFields.studentCountWorkingHours')} value={studentCount?.value} extra="h" copy={copy} />
          <TableItem label={t('calculatorFields.totalWorkingHours')} value={totalHours} extra="h" copy={copy} />
          <TableItem label={t('calculatorFields.hourlyRate')} value={hourlyRate} extra="€/h" copy={copy} />
        </tbody>
        <tfoot>
          <TableItem label={t('calculatorFields.totalSalary')} value={salary} extra="€" copy={copy} />
        </tfoot>
      </DataTable>
      <DataTable>
        <tbody>
          <TableItem label={t('calculatorFields.workHourExceptions')} value={workHourExceptions} copy={false} />
          <TableItem label={t('calculatorFields.salaryExceptions')} value={salaryExceptions} copy={false} />
        </tbody>
      </DataTable>
    </Box>
  )
}

export default CalculatorPreview
