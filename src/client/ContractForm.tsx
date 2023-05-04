import { Box, Button, FormControl, FormLabel, Input, Sheet, Typography } from "@mui/joy";
import { sendContract } from "./api";

interface FormElements extends HTMLFormControlsCollection {
  firstname: HTMLInputElement;
  lastname: HTMLInputElement;
  email: HTMLInputElement;
  courseName: HTMLInputElement;
  courseStartDate: HTMLInputElement;
  courseEndDate: HTMLInputElement;
  contractStartDate: HTMLInputElement;
  contractEndDate: HTMLInputElement;
}

interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

const InputRow = ({ label, children }: { label?: string, children: React.ReactNode }) => {
  return (
    <Box>
      {label && <Typography sx={{ mb: "1rem" }}>{label}</Typography>}
      <Box display="flex" gap="1rem" sx={theme => ({ [theme.breakpoints.down("md")]: { flexDirection: "column" }})}>
        {children}
      </Box>
    </Box>
  )
}

const ContractForm = () => {
  return (
    <Sheet sx={{
      borderRadius: "1rem",
      py: "2rem",
    }}>
      <Box p="2rem">
        <Typography level="h4">Työsopimusta varten tarvittavat muut tiedot</Typography>
        <Box display="flex" justifyContent="center" mt="2rem">
          <form
            onSubmit={async (event: React.FormEvent<SignInFormElement>) => {
              event.preventDefault()
              const formElements = event.currentTarget.elements
              const data = {
                firstname: formElements.firstname.value,
                lastname: formElements.lastname.value,
                email: formElements.email.value,
                courseName: formElements.courseName.value,
                courseStartDate: formElements.courseStartDate.value,
                courseEndDate: formElements.courseEndDate.value,
                contractStartDate: formElements.contractStartDate.value,
                contractEndDate: formElements.contractEndDate.value,
              }

              await sendContract(data)
            }}
          >
            <Box display="flex" flexDirection="column" gap="3rem">
              <InputRow>
                <FormControl required>
                  <FormLabel>Etunimi</FormLabel>
                  <Input type="text" name="firstname" slotProps={{ input: { maxLength: 50 }}}/>
                </FormControl>
                <FormControl required>
                  <FormLabel>Sukunimi</FormLabel>
                  <Input type="text" name="lastname" slotProps={{ input: { maxLength: 50 }}}/>
                </FormControl>
              </InputRow>
              <FormControl required>
                <FormLabel>Sähköposti</FormLabel>
                <Input placeholder="Anna sähköpostisi" type="email" name="email" slotProps={{ input: { maxLength: 50 }}}/>
              </FormControl>
              <FormControl required>
                <FormLabel>Kurssin nimi</FormLabel>
                <Input placeholder="Anna kurssin nimi" type="text" name="courseName"  slotProps={{ input: { maxLength: 100 }}}/>
              </FormControl>
              <InputRow label="Kurssin aikataulu">
                <FormControl required sx={{ flex: 1 }}>
                  <FormLabel>Ensimmäinen luento</FormLabel>
                  <Input type="date" name="courseStartDate" />
                </FormControl>
                <FormControl required sx={{ flex: 1 }}>
                  <FormLabel>Viimeinen luento/tentti</FormLabel>
                  <Input type="date" name="courseEndDate" />
                </FormControl>
              </InputRow>
              <InputRow label="Sopimuksen kesto">
                <FormControl required sx={{ flex: 1 }}>
                  <FormLabel>Alkupäivä</FormLabel>
                  <Input type="date" name="contractStartDate" />
                </FormControl>
                <FormControl required sx={{ flex: 1 }}>
                  <FormLabel>Loppupäivä</FormLabel>
                  <Input type="date" name="contractEndDate" />
                </FormControl>
              </InputRow>
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

export default ContractForm