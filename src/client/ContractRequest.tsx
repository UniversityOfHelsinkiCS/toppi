import { Box, Button, Checkbox, FormControl, FormLabel, Input, Radio, RadioGroup, Sheet, Typography } from "@mui/joy";
import { sendContract } from "./api";
import CalculatorPreview from "./CalculatorPreview";
import { toast } from "sonner";
import React from "react";

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
    <Box>
      {label && <Typography sx={{ mb: "1rem" }} endDecorator={endAdornment}>{label}</Typography>}
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
  const [isSeparateContractDates, setIsSeparateContractDates] = React.useState(false)
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
                  value={isSeparateContractDates ? "separate" : "same"} 
                  onChange={e => setIsSeparateContractDates(e.target.value === "separate")}
                >
                  <Radio value="same" label="Sama kuin kurssin aikataulu" />
                  <Radio value="separate" label="Eri kuin kurssin aikataulu" />
                </RadioGroup>
                {isSeparateContractDates && <InputSection>
                  <FormControl sx={{ flex: 1 }} disabled={!isSeparateContractDates} required={isSeparateContractDates}>
                    <FormLabel>Alkupäivä</FormLabel>
                    <Input type="date" name="contractStartDate" value={isSeparateContractDates ? contractStartDate : courseStartDate} onChange={e => setContractStartDate(e.target.value)} />
                  </FormControl>
                  <FormControl sx={{ flex: 1 }} disabled={!isSeparateContractDates} required={isSeparateContractDates}>
                    <FormLabel>Loppupäivä</FormLabel>
                    <Input type="date" name="contractEndDate" value={isSeparateContractDates ? contractEndDate : courseEndDate} onChange={e => setContractEndDate(e.target.value)} />
                  </FormControl>
                </InputSection>}
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
  </Box>
)

export default ContractRequest