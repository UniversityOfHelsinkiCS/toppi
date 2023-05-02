import { Box, CssBaseline, Option, Select, Sheet, Input, Typography, Divider } from '@mui/joy'
import hyLogo from "./assets/hy_logo.svg"
import { useState } from 'react'

const Header = () => {
  return (
    <Sheet sx={{
      p: "1rem",
      columnGap: "1rem",
      alignItems: "center",
      display: "flex",
    }}>
      <Box width="2rem">
        <img src={hyLogo} alt="hy logo" />
      </Box>
      <Box display="flex" alignItems="center " columnGap="1rem">
        <Typography level="body1">TOPPI</Typography>
        <Typography level="body2">– TYÖKALU ULKOPUOLISTEN TUNTIOPETTAJIEN TYÖAIKOJEN JA PALKKIOIDEN LASKEMISEEN</Typography>
      </Box>
    </Sheet>
  )
}

type Option = { label: string, value: number }

const courseTypeOptions = [
  { label: "Toistuva", value: 0 },
  { label: "Uudistettava", value: 1 },
  { label: "Uusi", value: 2 },
]

const creditOptions = [
  { value: 1, label: "1-3 op." },
  { value: 4, label: "4-6 op." },
  { value: 7, label: "7-9 op." },
  { value: 10, label: "10 op. tai enemmän" },
]

const studentCountOptions = [
  { value: 10, label: "1-30" },
  { value: 20, label: "31-70" },
  { value: 30, label: "71-120" },
  { value: 40, label: "yli 120" },
]

const InputSection = ({ children, title, description, resultHours }: { children: React.ReactNode, title: string, description: string, resultHours?: number, }) => {
  return (
    <Box width="25%" display="flex" flexDirection="column" alignItems="stretch">
      <Sheet sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        rowGap: "1rem",
        mx: "0.5rem"
      }} variant='soft'>
        <Box display="flex" p="1rem" flexDirection="column" rowGap="1rem" flexGrow={1}>
          <Typography level="body1">{title}</Typography>
          <Typography level="body2" sx={{ mb: "auto" }}>{description}</Typography>
          {children}
        </Box>
        <Divider />
        <Box p="1rem">
          <Typography>{resultHours || 0} tuntia</Typography>
        </Box>
      </Sheet>
    </Box>
  )
}

const DropDownMenu = ({ options, value, onChange }: { options: Option[], value: Option, onChange: (opt: Option) => void })=> {
  return (
    <Select value={value} onChange={(e, newValue) => newValue && onChange(newValue)}>
      {options.map((option) => (
        <Option key={option.value} value={option}>
          {option.label}
        </Option>
      ))}
    </Select>
  )
}

const HourInput = ({ value, onChange }: { value?: number, onChange: (value: number) => void }) => {
  return (
    <Input value={String(value)} onChange={e => onChange(e.target.valueAsNumber)} type="number"
      
      placeholder="0"
      endDecorator={<Typography level="body2">{value === 1 ? 'tunti' : 'tuntia'}</Typography>}
    />
  )
}

const WorkHourCalculator = () => {
  const [teachingHours, setTeachingHours] = useState<number|undefined>(0)
  const [courseType, setCourseType] = useState(courseTypeOptions[0])
  const [credits, setCredits] = useState(creditOptions[1])
  const [studentCount, setStudentCount] = useState(studentCountOptions[1])

  return (
    <Box>
      <Box display="flex" mb="1rem">
        <InputSection
          title="Opetustuntien lukumäärä"
          description="Määritetty usein opetusohjelmassa. Tarvittaessa koulutusohjelman johtaja tai johtoryhmä päättää. Esim. 5 op kurssilla tyypillisesti 20-25."
          resultHours={teachingHours}
        >
          <HourInput value={teachingHours} onChange={setTeachingHours} />
        </InputSection>
        <InputSection
          title="Kurssin tyyppi"
          description="Yleensä kurssit uudistettavia. Koulutusohjelman johtaja päättää."
          resultHours={0}
        >
          <DropDownMenu options={courseTypeOptions} value={courseType} onChange={setCourseType} />
        </InputSection>
        <InputSection
          title="Opintopisteiden määrä"
          description="Määräytyy OPS:n mukaan. Tyypillisesti 5 op. kursseja."
          resultHours={credits.value}
        >
          <DropDownMenu options={creditOptions} value={credits} onChange={setCredits} />
        </InputSection>
        <InputSection
          title="Suunniteltu opiskelijoiden määrä"
          description="Määritetty usein opetusohjelmassa. Tarvittaessa koulutusohjelman johtaja tai johtoryhmä päättää."
          resultHours={studentCount.value}
        >
          <DropDownMenu options={studentCountOptions} value={studentCount} onChange={setStudentCount}/>
        </InputSection>
      </Box>

    </Box>
  )
}

const SalaryCalculator = () => {
  return (
    <div></div>
  )
}

const SalaryTable = () => {
  return (
    <div></div>
  )
}

const Calculator = () => {
  return (
    <Box p="2rem">
      <WorkHourCalculator />
    </Box>
  )
}

function App() {

  return (
    <CssBaseline>
      <Header />
      <Calculator />
    </CssBaseline>
  )
}

export default App
