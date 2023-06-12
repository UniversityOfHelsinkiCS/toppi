import { Alert, Box, Button, FormControl, FormLabel, Input, Radio, RadioGroup, Sheet, Typography } from "@mui/joy";
import { sendContract } from "./api";
import CalculatorPreview from "./CalculatorPreview";
import { toast } from "sonner";
import React from "react";
import dayjs from "dayjs"

interface FormElements extends HTMLFormControlsCollection {
  firstname: HTMLInputElement;
  lastname: HTMLInputElement;
  birthDate: HTMLInputElement;
  email: HTMLInputElement;
  courseName: HTMLInputElement;
  courseStartDate: HTMLInputElement;
  courseEndDate: HTMLInputElement;
  contractDuration: HTMLInputElement;
  contractStartDate?: HTMLInputElement;
  contractEndDate?: HTMLInputElement;
}

interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

const InputSection = ({ label, endAdornment, children, orientation = "horizontal" }: { label?: string, endAdornment?: React.ReactNode, children: React.ReactNode, orientation?: "vertical"|"horizontal" }) => {
  return (
    <Box py="0.5rem">
      {label && <Typography level="body2" sx={{ mb: "1rem" }} endDecorator={endAdornment}>{label}</Typography>}
      <Box display="flex" gap="1rem" sx={theme => ({ 
        flexDirection: orientation === "horizontal" ? "row" : "column", 
        [theme.breakpoints.down("md")]: { flexDirection: "column" }
      })}>
        {children}
      </Box>
    </Box>
  )
}

const ContractForm = () => {
  const [courseStartDate, setCourseStartDate] = React.useState<string>("")
  const [courseEndDate, setCourseEndDate] = React.useState<string>("")
  const [isCustomContractDates, setIsCustomContractDates] = React.useState(false)
  const [contractStartDate, setContractStartDate] = React.useState<string>("")
  const [contractEndDate, setContractEndDate] = React.useState<string>("")

  const handleSubmit = async (event: React.FormEvent<SignInFormElement>) => {
    event.preventDefault()
    const formElements = event.currentTarget.elements
    const data = {
      firstname: formElements.firstname.value,
      lastname: formElements.lastname.value,
      email: formElements.email.value,
      birthDate: formElements.birthDate.value,
      courseName: formElements.courseName.value,
      courseStartDate: formElements.courseStartDate.value,
      courseEndDate: formElements.courseEndDate.value,
      contractDuration: formElements.contractDuration.value,
      contractStartDate: formElements.contractStartDate?.value,
      contractEndDate: formElements.contractEndDate?.value,
    }

    const req = sendContract(data)

    toast.promise(req, {
      loading: "Lähetetään työsopimuspyyntöä",
      success: "Työsopimuspyyntö lähetetty",
      error: "Työsopimuspyynnön lähettäminen epäonnistui"
    })
  }

  const currentContractStartDate = isCustomContractDates 
    ? contractStartDate 
    : (courseStartDate ? dayjs(courseStartDate).subtract(7, "days").format("YYYY-MM-DD") : "")
  const currentContractEndDate = isCustomContractDates 
    ? contractEndDate 
    : (courseEndDate ? dayjs(courseEndDate).add(14, "days").format("YYYY-MM-DD") : "")

  return (
    <Sheet sx={{
      borderRadius: "1rem",
    }}>
      <Box>
        <Typography level="h5">Työsopimusta varten tarvittavat muut tiedot</Typography>
        <Box mt="2rem">
          <form
            onSubmit={handleSubmit}
          >
            <Box display="flex" flexDirection="column" gap="3rem">
              <InputSection>
                <FormControl required>
                  <FormLabel>Etunimi</FormLabel>
                  <Input type="text" name="firstname" slotProps={{ input: { maxLength: 50 }}}/>
                </FormControl>
                <FormControl required>
                  <FormLabel>Sukunimi</FormLabel>
                  <Input type="text" name="lastname" slotProps={{ input: { maxLength: 50 }}}/>
                </FormControl>
              </InputSection>
              <FormControl required>
                <FormLabel>Syntymäaika</FormLabel>
                <Input type="date" name="birthDate"/>
              </FormControl>
              <FormControl required>
                <FormLabel>Sähköposti</FormLabel>
                <Input placeholder="Anna sähköpostisi" type="email" name="email" slotProps={{ input: { maxLength: 50 }}}/>
              </FormControl>
              <FormControl required>
                <FormLabel>Kurssin nimi</FormLabel>
                <Input placeholder="Anna kurssin nimi" type="text" name="courseName"  slotProps={{ input: { maxLength: 100 }}}/>
              </FormControl>
              <InputSection label="Kurssin aikataulu">
                <FormControl required sx={{ flex: 1 }}>
                  <FormLabel>Ensimmäinen luento</FormLabel>
                  <Input type="date" name="courseStartDate" value={courseStartDate} onChange={e => setCourseStartDate(e.target.value)} />
                </FormControl>
                <FormControl required sx={{ flex: 1 }}>
                  <FormLabel>Viimeinen luento/tentti</FormLabel>
                  <Input type="date" name="courseEndDate" value={courseEndDate} onChange={e => setCourseEndDate(e.target.value)} />
                </FormControl>
              </InputSection>
              <InputSection label="Sopimuksen kesto" orientation="vertical">
                <RadioGroup name="contractDuration"
                  value={isCustomContractDates ? "custom" : "recommended"} 
                  onChange={e => setIsCustomContractDates(e.target.value === "custom")}
                >
                  <Radio value="recommended" label="Suositeltu: alkaa viikkoa ennen kurssin alkua ja jatkuu kaksi viikkoa sen loputtua" />
                  <Radio value="custom" label="Muu aikaväli" />
                </RadioGroup>
                <InputSection>
                  <FormControl sx={{ flex: 1 }} required={isCustomContractDates}>
                    <FormLabel>{isCustomContractDates ? "Valitse" : "Suositeltu"} alkupäivä</FormLabel>
                    <Input type="date" name="contractStartDate" readOnly={!isCustomContractDates} value={currentContractStartDate} onChange={e => setContractStartDate(e.target.value)} />
                  </FormControl>
                  <FormControl sx={{ flex: 1 }} required={isCustomContractDates}>
                    <FormLabel>{isCustomContractDates ? "Valitse" : "Suositeltu"} loppupäivä</FormLabel>
                    <Input type="date" name="contractEndDate" readOnly={!isCustomContractDates} value={currentContractEndDate} onChange={e => setContractEndDate(e.target.value)} />
                  </FormControl>
                </InputSection>
              </InputSection>
              <Button type="submit" fullWidth>
                Lähetä tarkistettavaksi
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Sheet>
  )
}

const ContractRequest = () => (
  <Box p="2rem">
    <Typography level="h4">Työsopimuspyyntö</Typography>
    <Box sx={theme => ({ display: "flex", gap: "4rem", py: "4rem", [theme.breakpoints.down('md')]: { flexDirection: 'column-reverse', } })}>
      <Box flex={1}>
        <ContractForm />
      </Box>
      <Box flex={1}>
        <CalculatorPreview />
      </Box>
    </Box>
    <Alert>Toppi on vielä testi- ja esittelykäytössä, joten lomakkeesta lähetettyjä työsopimuspyyntöjä ei käsitellä.</Alert>
  </Box>
)

export default ContractRequest