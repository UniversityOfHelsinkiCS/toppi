import { Box, Option, Select, Sheet, Input, Typography, Divider, Table, Tooltip, Chip } from '@mui/joy'
import { useEffect, useState } from 'react'
import { SxProps } from '@mui/joy/styles/types'
import useContractStore from './store'

type Option = { label: string, value: number }

const courseTypeOptions = [
  { label: "Toistuva", value: 0 },
  { label: "Uudistettava", value: 1 },
  { label: "Uusi", value: 2 },
]

const creditOptions = [
  { value: 0, label: "1-3 op." },
  { value: 1, label: "4-6 op." },
  { value: 2, label: "7-9 op." },
  { value: 3, label: "10 op. tai enemmän" },
]

const studentCountOptions = [
  { value: 10, label: "1-30" },
  { value: 20, label: "31-70" },
  { value: 30, label: "71-120" },
  { value: 40, label: "yli 120" },
]

const HoursChip = ({ hours }: { hours: number }) => (
  <Chip variant="soft">{`${hours} tuntia`}</Chip>
)


const SalaryChip = ({ salary, unit='€/h' }: { salary: number, unit?: string }) => (
  <Chip variant="soft" color="success">{`${salary} ${unit}`}</Chip>
)


const InputContainer = ({ children, resultName, resultChip, infoBox, sx }: { children: React.ReactNode, resultName?: string, resultChip?: React.ReactNode, infoBox?: React.ReactNode, sx?: SxProps }) => (
  <Box display="flex" flexDirection="column" alignItems="stretch" sx={sx} >
    <Sheet sx={{
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      rowGap: "1rem",
      mb: "auto",
    }} variant='soft'>
      {children}
      {resultChip && <>
        <Divider />
        <Box p="1rem" mt="auto" display="flex" alignItems="center" columnGap="1rem">
          <Typography>{resultName}</Typography>
          <Box mr="auto">{resultChip}</Box>
          {infoBox && 
            <Tooltip arrow title={
              <Box width="30rem">{infoBox}</Box>
            } variant="outlined">
              <Box ml="auto"><Chip variant="outlined">Lisätietoa</Chip></Box>
            </Tooltip>
          }
        </Box></>
      }
      
    </Sheet>
  </Box>
)


const InputSection = ({ children, title, description, sx }: { children: React.ReactNode, title: string, description: string, resultHours?: number, sx?: SxProps }) => (
  <Box display="flex" p="1rem" flexDirection="column" rowGap="1rem" flexGrow={1} sx={sx}>
    <Typography level="body1">{title}</Typography>
    <Typography level="body2" sx={{ mb: "auto" }}>{description}</Typography>
    {children}
  </Box>
)


const DropDownMenu = ({ options, value, onChange }: { options: Option[], value: Option, onChange: (opt: Option) => void }) => (
  <Select value={value} onChange={(e, newValue) => newValue && onChange(newValue)}>
    {options.map((option) => (
      <Option key={option.value} value={option}>
        {option.label}
      </Option>
    ))}
  </Select>
)


const HourInput = ({ value, onChange }: { value?: number, onChange: (value: number) => void }) => (
  <Input value={String(value)} onChange={e => onChange(e.target.valueAsNumber)} type="number"
    placeholder="0" slotProps={{ input: { min: 0, max: 1000 } }}
    endDecorator={<Typography level="body2">{value === 1 ? 'tunti' : 'tuntia'}</Typography>}
  />
)

const preparationHoursTableData = [
  [5, 15, 30],
  [10, 30, 50],
  [15, 45, 70],
  [20, 60, 90],
]

const getPreparationHours = ({ credits, courseType }: { credits: Option, courseType: Option }) => {
  return preparationHoursTableData[credits.value][courseType.value]
}

const PreparationHoursTable = () => (
  <Sheet >
    <Box p="1rem">
      <Typography level="body2">Kurssiin valmistautumiseen käytettävä työaika lasketaan seuraavan taulukon mukaisesti:</Typography>
    </Box>
    <Table>
      <thead>
        <tr>
          <th />
          <th>Toistuva</th>
          <th>Uudistettava</th>
          <th>Uusi</th>
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

const WorkHourCalculator = () => {
  const [teachingHours, setTeachingHours] = useState<number|undefined>(0)
  const [courseType, setCourseType] = useState(courseTypeOptions[0])
  const [credits, setCredits] = useState(creditOptions[1])
  const [studentCount, setStudentCount] = useState(studentCountOptions[1])

  const prepHours = getPreparationHours({ credits, courseType })

  const workHours = useContractStore(state => state.workHours)
  const setWorkHours = useContractStore(state => state.setWorkHours)

  useEffect(() => {
    setWorkHours((teachingHours || 0) + prepHours + studentCount.value)
  }, [teachingHours, prepHours, studentCount.value, setWorkHours])

  return (
    <Box>
      <Box sx={theme => ({
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        [theme.breakpoints.up('md')]: {
          flexDirection: 'row',
        },
        mb: "2rem",
       })}>
        <InputContainer
          resultName='Opetustunnit'
          resultChip={<HoursChip hours={teachingHours || 0} />}
          sx={{ flex: 1 }}
        >
          <InputSection
            title="Opetustuntien lukumäärä"
            description="Määritetty usein opetusohjelmassa. Tarvittaessa koulutusohjelman johtaja tai johtoryhmä päättää. Esim. 5 op kurssilla tyypillisesti 20-25."
          >
            <HourInput value={teachingHours} onChange={setTeachingHours} />
          </InputSection>
        </InputContainer>
        <InputContainer
          resultName="Kurssin valmistelu"
          resultChip={<HoursChip hours={prepHours} />}
          infoBox={<PreparationHoursTable />}
          sx={{ flex: 2 }}
        >
          <Box display="flex" flexGrow={1}>
            <InputSection
              title="Kurssin tyyppi"
              description="Yleensä kurssit uudistettavia. Koulutusohjelman johtaja päättää."
              sx={{ flex: 1 }}
            >
              <DropDownMenu options={courseTypeOptions} value={courseType} onChange={setCourseType} />
            </InputSection>
            <InputSection
              title="Opintopisteiden määrä"
              description="Määräytyy OPS:n mukaan. Tyypillisesti 5 op. kursseja."
              sx={{ flex: 1 }}
            >
              <DropDownMenu options={creditOptions} value={credits} onChange={setCredits} />
            </InputSection>
          </Box>
        </InputContainer>
        <InputContainer
          resultName="Opiskelijoiden määrään perustuva lisätyöaika"
          resultChip={<HoursChip hours={studentCount.value} />}
          sx={{ flex: 1 }}
        >
          <InputSection
            title="Suunniteltu opiskelijoiden määrä"
            description="Määritetty usein opetusohjelmassa. Tarvittaessa koulutusohjelman johtaja tai johtoryhmä päättää."
          >
            <DropDownMenu options={studentCountOptions} value={studentCount} onChange={setStudentCount}/>
          </InputSection>
        </InputContainer>
      </Box>
      <Box display="flex" alignItems="center">
        <Typography level="h5">Työaika yhteensä </Typography>
        <Box ml="1rem">
          <HoursChip hours={workHours} />
        </Box>
      </Box>
    </Box>
  )
}

const salaryTableData = [
  { qualificationInfo: 'Taso A. Vaativuustaso 8-11 (esim. professori)', salary: 55 },
  { qualificationInfo: 'Taso B. Vaativuustaso 7 (esim. dosentti)', salary: 40 },
  { qualificationInfo: 'Taso C. Vaativuustaso 5-6 (esim. tohtori)', salary: 30 },
  { qualificationInfo: 'Taso D. Vaativuustaso 4 (esim. lisensiaatti tai ylempi korkeakoulututkinto)', salary: 24 },
  { qualificationInfo: 'Taso E. Alempi korkeakoulututkinto (esim. opetusavustajana toimiva henkilö)', salary: 20 },
  { qualificationInfo: 'Taso F. Muut', salary: 19 },
]

const SalaryTable = ({ sx }: { sx: SxProps }) => (
  <Sheet sx={sx}>
    <Box pb="1rem">
      <Typography level="body2">Helsingin yliopiston yleisen taulukon mukaiset palkkiot ulkopuolisille opettajille:</Typography>
    </Box>
    <Table>
      <thead>
        <tr>
          <th>Vaativuus / Pätevyys</th>
          <th>Palkkio</th>
        </tr>
      </thead>
      <tbody>
          {salaryTableData.map((row, i) => (
            <tr key={i}>
              <td>{row.qualificationInfo}</td>
              <td>{row.salary} €/h</td>
            </tr>
          ))}
        </tbody>
    </Table>
  </Sheet>
)

const SalaryInput = () => {
  const setHourlyRate = useContractStore(state => state.setHourlyRate)

  return (
    <Input onChange={e => setHourlyRate(e.target.valueAsNumber)} type="number"
      placeholder="0" slotProps={{ input: { min: 0, max: 1000 } }}
      endDecorator={<Typography level="body2">€/h</Typography>}
    />
  )
}

const SalaryCalculator = () => {
  const workHours = useContractStore(state => state.workHours)
  const hourlyRate = useContractStore(state => state.hourlyRate)

  return (
    <Box>
      <Box sx={theme => ({
        display: 'flex',
        flexDirection: 'column',
        gap: '3rem',
        [theme.breakpoints.up('md')]: {
          flexDirection: 'row',
        },
        mb: "2rem",
      })}>
        <Box flex={1}>
          <InputContainer sx={{ mb: "2rem" }}>
            <InputSection title="Palkka" description="Merkitse vaatimustason mukainen tuntipalkkasi">
              <SalaryInput />
            </InputSection>
          </InputContainer>
          <Box display="flex" alignItems="center" columnGap="1em">
            <Typography level="h5">Palkkio yhteensä </Typography>
            <HoursChip hours={workHours} /> X <SalaryChip salary={hourlyRate} /> = <SalaryChip salary={workHours * hourlyRate} unit="€" />
          </Box>
        </Box>
        <SalaryTable sx={{ flex: 2 }}/>
      </Box>
    </Box>
  )
}

const Calculator = () => (
  <Sheet sx={{
    borderRadius: "1rem",
    py: "2rem",
  }}>
    <Box p="2rem">
      <Typography level="h4" sx={{ mb: "2rem"}}>Työaikalaskuri</Typography>
      <WorkHourCalculator />
    </Box>
    <Divider sx={{ my: "1rem" }}/>
    <Box p="2rem">
      <Typography level="h4" sx={{ mb: "2rem"}}>Palkkalaskuri</Typography>
      <SalaryCalculator />
    </Box>
  </Sheet>
)

export default Calculator