import { Box, Button, FormControl, FormLabel, Input, Typography } from "@mui/joy";

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

const ContractForm = () => {
  return (
    <Box p="2rem" mt="2rem">
      <Typography level="h4">Työsopimusta varten tarvittavat muut tiedot</Typography>
      <Box display="flex" justifyContent="center" mt="1rem">
        <form
          onSubmit={(event: React.FormEvent<SignInFormElement>) => {
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

            alert(JSON.stringify(data, null, 2));
          }}
        >
          <Box display="flex" flexDirection="column" gap="2rem">
            <Box display="flex" columnGap="1rem">
              <FormControl required>
                <FormLabel>Etunimi</FormLabel>
                <Input type="text" name="firstname" slotProps={{ input: { maxLength: 50 }}}/>
              </FormControl>
              <FormControl required>
                <FormLabel>Sukunimi</FormLabel>
                <Input type="text" name="lastname" slotProps={{ input: { maxLength: 50 }}}/>
              </FormControl>
            </Box>
            <FormControl required>
              <FormLabel>Sähköposti</FormLabel>
              <Input placeholder="Anna sähköpostisi" type="email" name="email" slotProps={{ input: { maxLength: 50 }}}/>
            </FormControl>
            <FormControl required>
              <FormLabel>Kurssin nimi</FormLabel>
              <Input placeholder="Anna kurssin nimi" type="text" name="courseName"  slotProps={{ input: { maxLength: 100 }}}/>
            </FormControl>
            <Box display="flex" columnGap="1rem">
              <FormControl required sx={{ flex: 1 }}>
                <FormLabel>Ensimmäinen luento</FormLabel>
                <Input type="date" name="courseStartDate" />
              </FormControl>
              <FormControl required sx={{ flex: 1 }}>
                <FormLabel>Viimeinen luento/tentti</FormLabel>
                <Input type="date" name="courseEndDate" />
              </FormControl>
            </Box>
            <Box display="flex" columnGap="1rem">
              <FormControl required sx={{ flex: 1 }}>
                <FormLabel>Alkupäivä</FormLabel>
                <Input type="date" name="contractStartDate" />
              </FormControl>
              <FormControl required sx={{ flex: 1 }}>
                <FormLabel>Loppupäivä</FormLabel>
                <Input type="date" name="contractEndDate" />
              </FormControl>
            </Box>
            <Button type="submit" fullWidth>
              Lähetä tarkistettavaksi
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  )
}

export default ContractForm