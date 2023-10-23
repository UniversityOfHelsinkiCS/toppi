import { Box, Option as SelectOption, Select, Sheet, Input, Typography, Divider, Table, Tooltip, Chip, Textarea } from '@mui/joy'
import { SxProps } from '@mui/joy/styles/types'
import useContractStore, { ContractState, ContractStateSetters, ExceptionsSetters, ExceptionsState, useTotalHours, useWorkHourCalculatorFields } from '../store/calculatorStore'
import { Option } from '../types'
import { courseTypeOptions, creditOptions, preparationHoursTableData, studentCountOptions, useSalaryTableData } from '../calculatorConfig'
import { SectionDivider } from './common'
import { useTranslation } from 'react-i18next'

const HoursChip = ({ hours }: { hours: number }) => {
  const { t } = useTranslation()
  return <Chip variant="soft" color="primary">{`${hours} ${t('common.hours')}`}</Chip>
}

const SalaryChip = ({ salary, unit = '€/h' }: { salary: number; unit?: string }) => <Chip variant="soft" color="success">{`${salary} ${unit}`}</Chip>

const InputContainer = ({
  children,
  resultName,
  resultChip,
  infoBox,
  sx,
}: {
  children: React.ReactNode
  resultName?: string
  resultChip?: React.ReactNode
  infoBox?: React.ReactNode
  sx?: SxProps
}) => {
  const { t } = useTranslation()

  return (
    <Box display="flex" flexDirection="column" alignItems="stretch" sx={sx}>
      <Sheet
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          rowGap: '1rem',
          mb: 'auto',
        }}
        variant="soft"
      >
        {children}
        {resultChip && (
          <>
            <Divider />
            <Box p="1rem" mt="auto" display="flex" alignItems="center" columnGap="1rem">
              <Typography>{resultName}</Typography>
              <Box mr="auto">{resultChip}</Box>
              {infoBox && (
                <Tooltip arrow title={<Box width="30rem">{infoBox}</Box>} variant="outlined">
                  <Box ml="auto">
                    <Chip variant="outlined">{t('common.additionalInfo')}</Chip>
                  </Box>
                </Tooltip>
              )}
            </Box>
          </>
        )}
      </Sheet>
    </Box>
  )
}

const InputSection = ({ children, title, description, sx }: { children: React.ReactNode; title: string; description: string; resultHours?: number; sx?: SxProps }) => (
  <Box display="flex" p="1rem" flexDirection="column" rowGap="1rem" flexGrow={1} sx={sx}>
    <Typography level="body-md">{title}</Typography>
    <Typography level="body-sm" sx={{ mb: 'auto' }}>
      {description}
    </Typography>
    {children}
  </Box>
)

const DropDownMenu = ({ options, value, onChange }: { options: Option[]; value: Option; onChange: (opt: Option) => void }) => (
  <Select value={value} onChange={(e, newValue) => newValue && onChange(newValue)}>
    {options.map((option) => (
      <SelectOption key={option.value} value={option}>
        {option.label}
      </SelectOption>
    ))}
  </Select>
)

const TeachingHoursInput = () => {
  const { t } = useTranslation()
  const { teachingHours, setTeachingHours } = useContractStore((state) => ({ teachingHours: state.teachingHours, setTeachingHours: state.setTeachingHours }))

  return (
    <Input
      value={teachingHours}
      onChange={(e) => setTeachingHours(e.target.valueAsNumber)}
      type="number"
      placeholder="0"
      slotProps={{ input: { min: 0, max: 1000 } }}
      endDecorator={<Typography level="body-md">{t('common.hours')}</Typography>}
    />
  )
}

const PreparationHoursTable = () => {
  const { t } = useTranslation()

  return (
    <Sheet>
      <Box p="1rem">
        <Typography level="body-md">{t('calculator.preparationTableInfo')}</Typography>
      </Box>
      <Table>
        <thead>
          <tr>
            <th />
            <th>{t('courseType.recurring')}</th>
            <th>{t('courseType.refresh')}</th>
            <th>{t('courseType.new')}</th>
          </tr>
        </thead>
        <tbody>
          {preparationHoursTableData.map((row, i) => (
            <tr key={i}>
              <td>{creditOptions[i].label}</td>
              {row.map((cell, j) => (
                <td key={j}>{cell} h</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </Sheet>
  )
}

const WorkHourCalculator = () => {
  const { t } = useTranslation()
  const { teachingHours, credits, setCredits, courseType, setCourseType, studentCount, setStudentCount, preparationHours, totalHours } = useWorkHourCalculatorFields()

  return (
    <Box>
      <Box
        sx={(theme) => ({
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          [theme.breakpoints.up('md')]: {
            flexDirection: 'row',
          },
          mb: '2rem',
        })}
      >
        <InputContainer resultName={t('calculatorFields.teachingHours')} resultChip={<HoursChip hours={teachingHours || 0} />} sx={{ flex: 1 }}>
          <InputSection title={t('calculator.teachingHoursTitle')} description={t('calculator.teachingHoursDescription')}>
            <TeachingHoursInput />
          </InputSection>
        </InputContainer>
        <InputContainer resultName={t('calculator.preparation')} resultChip={<HoursChip hours={preparationHours} />} infoBox={<PreparationHoursTable />} sx={{ flex: 2 }}>
          <Box display="flex" flexGrow={1}>
            <InputSection title={t('calculatorFields.courseType')} description={t('calculator.courseTypeDescription')} sx={{ flex: 1 }}>
              <DropDownMenu options={courseTypeOptions} value={courseType} onChange={setCourseType} />
            </InputSection>
            <InputSection title={t('calculatorFields.credits')} description={t('calculator.creditsDescription')} sx={{ flex: 1 }}>
              <DropDownMenu options={creditOptions} value={credits} onChange={setCredits} />
            </InputSection>
          </Box>
        </InputContainer>
        <InputContainer resultName={t('calculatorFields.studentCountWorkingHours')} resultChip={<HoursChip hours={studentCount.value} />} sx={{ flex: 1 }}>
          <InputSection title={t('calculator.studentCountTitle')} description={t('calculator.studentCountDescription')}>
            <DropDownMenu options={studentCountOptions} value={studentCount} onChange={setStudentCount} />
          </InputSection>
        </InputContainer>
      </Box>
      <Box display="flex" alignItems="center">
        <Typography level="body-md">{t('calculatorFields.totalWorkingHours')} </Typography>
        <Box ml="1rem">
          <HoursChip hours={totalHours} />
        </Box>
      </Box>
      <Box mt="2rem">
        <ExceptionsField fieldName="workHourExceptions" setterName="setWorkHourExceptions" />
      </Box>
    </Box>
  )
}

const SalaryTable = ({ sx }: { sx: SxProps }) => {
  const { t } = useTranslation()
  const tableData = useSalaryTableData()

  return (
    <Sheet sx={sx}>
      <Box pb="1rem">
        <Typography level="body-md">{t('calculator.salaryTableTitle')}</Typography>
      </Box>
      <Table>
        <thead>
          <tr>
            <th>{t('calculator.qualification')}</th>
            <th>{t('calculator.hourlyRate')}</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, i) => (
            <tr key={i}>
              <td>{row.qualificationInfo}</td>
              <td>{row.salary} €/h</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Sheet>
  )
}

const SalaryInput = () => {
  const { setHourlyRate, hourlyRate } = useContractStore((state) => ({ setHourlyRate: state.setHourlyRate, hourlyRate: state.hourlyRate }))

  return (
    <Input
      value={hourlyRate}
      onChange={(e) => setHourlyRate(e.target.valueAsNumber)}
      type="number"
      placeholder="0"
      slotProps={{ input: { min: 0, max: 1000 } }}
      endDecorator={<Typography level="body-md">€/h</Typography>}
    />
  )
}

const SalaryCalculator = () => {
  const { t } = useTranslation()
  const totalHours = useTotalHours()
  const hourlyRate = useContractStore((state) => state.hourlyRate)

  return (
    <Box>
      <Box
        sx={(theme) => ({
          display: 'flex',
          flexDirection: 'column',
          gap: '3rem',
          [theme.breakpoints.up('md')]: {
            flexDirection: 'row',
          },
          mb: '2rem',
        })}
      >
        <Box flex={1}>
          <InputContainer sx={{ mb: '2rem' }}>
            <InputSection title={t('calculator.hourlyRateTitle')} description={t('calculator.hourlyRateDescription')}>
              <SalaryInput />
            </InputSection>
          </InputContainer>
          <Box display="flex" alignItems="center" gap="1em" flexWrap="wrap">
            <Typography level="body-md">{t('calculator.totalSalary')} </Typography>
            <Box display="flex" columnGap="1rem" alignItems="center">
              <HoursChip hours={totalHours} /> X <SalaryChip salary={hourlyRate} /> = <SalaryChip salary={totalHours * hourlyRate} unit="€" />
            </Box>
          </Box>
          <Box mt="2rem">
            <ExceptionsField fieldName="salaryExceptions" setterName="setSalaryExceptions" />
          </Box>
        </Box>
        <SalaryTable sx={{ flex: 2 }} />
      </Box>
    </Box>
  )
}

const ExceptionsField = ({ fieldName, setterName }: { fieldName: keyof ExceptionsState; setterName: keyof ExceptionsSetters }) => {
  const { t } = useTranslation()
  const { exceptions, setExceptions } = useContractStore((state) => ({ exceptions: state[fieldName], setExceptions: state[setterName] }))

  return (
    <Textarea
      value={exceptions}
      onChange={(e) => setExceptions(e.target.value)}
      placeholder={t(`calculator.${fieldName}`)}
      minRows={3}
      slotProps={{ textarea: { maxLength: 1000 } }}
      endDecorator={
        <Typography level="body-xs" sx={{ ml: 'auto' }}>
          {exceptions.length}/1000 character(s)
        </Typography>
      }
    />
  )
}

const Calculator = () => {
  const { t } = useTranslation()

  return (
    <Sheet
      sx={{
        borderRadius: '1rem',
      }}
    >
      <Box p="2rem">
        <Typography level="h4" sx={{ mb: '2rem' }}>
          {t('calculator.workHourCalculator')}
        </Typography>
        <WorkHourCalculator />
      </Box>
      <SectionDivider />
      <Box p="2rem">
        <Typography level="h4" sx={{ mb: '2rem' }}>
          {t('calculator.salaryCalculator')}
        </Typography>
        <SalaryCalculator />
      </Box>
    </Sheet>
  )
}

export default Calculator
