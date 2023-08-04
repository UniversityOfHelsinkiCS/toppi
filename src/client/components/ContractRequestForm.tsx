import { Alert, Box, Button, Option, Radio, RadioGroup, Select, Sheet, Textarea, Typography } from "@mui/joy";
import CalculatorPreview from "./CalculatorPreview";
import { toast } from "sonner";
import React from "react";
import dayjs from "dayjs"
import { Controller, useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { ContractRequestFormParams, ContractRequestFormParamsValidator } from "../../shared/types";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useSendContract } from "../hooks/useSendContract";
import { useFaculties, useProgrammes } from "../hooks/useFaculties";
import { useCalculatorParams } from "../store/calculatorStore";
import { useTranslation } from "react-i18next";
import { FormField, FormInputField } from "./formComponents";

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

const getRecommendedStartDate = (courseStartDate?: string) => {
  return courseStartDate ? dayjs(courseStartDate).subtract(7, "days").format("YYYY-MM-DD") : ""
}

const getRecommendedEndDate = (courseEndDate?: string) => {
  return courseEndDate ? dayjs(courseEndDate).add(14, "days").format("YYYY-MM-DD") : ""
}

const useDefaultValues = () => {
  const user = useCurrentUser()

  const defaultValues: ContractRequestFormParams = React.useMemo(() => ({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    birthDate: user?.birthDate || "",
    faculty: "",
    courseName: "",
    courseStartDate: "",
    courseEndDate: "",
    contractDuration: "recommended",
    contractStartDate: "",
    contractEndDate: "",
    additionalInfo: "",
  }), [user])

  return defaultValues
}

const ContractForm = () => {
  const { t } = useTranslation()

  const { control, handleSubmit, setValue, clearErrors, getValues, watch, formState } = useForm({
    resolver: zodResolver(ContractRequestFormParamsValidator),
    defaultValues: useDefaultValues(),
    mode: "onChange",
  })

  const sendContract = useSendContract()

  const faculty = watch("faculty")
  const faculties = useFaculties()
  const programmes = useProgrammes(faculty)

  const onSubmit: SubmitHandler<typeof ContractRequestFormParamsValidator._type> = (formData) => {
    const req = sendContract(formData)
  
    toast.promise(req, {
      loading: "Lähetetään työsopimuspyyntöä",
      success: "Työsopimuspyyntö lähetetty",
      error: "Työsopimuspyynnön lähettäminen epäonnistui"
    })
  }

  const isRecommendedContractDates = watch("contractDuration") === "recommended"

  console.log(faculty, formState.errors.faculty)

  return (
    <Sheet sx={{
      borderRadius: "1rem",
    }}>
      <Box>
        <Typography level="h5">Työsopimusta varten tarvittavat muut tiedot</Typography>
        <Box mt="2rem">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box display="flex" flexDirection="column" gap="3rem">
              <InputSection>
                <FormInputField required error={formState.errors.firstName ? t('errors.required') : undefined} label="Etunimi" name="firstName" control={control} sx={{ flex: 1 }}/>
                <FormInputField required error={formState.errors.lastName ? t('errors.required') : undefined} label="Sukunimi" name="lastName" control={control} sx={{ flex: 1 }}/>
              </InputSection>
              <FormInputField required error={formState.errors.birthDate ? t('errors.required') : undefined} label="Syntymäaika" name="birthDate" control={control} />
              <FormInputField required error={formState.errors.email ? t('errors.required') : undefined} label="Sähköposti" name="email" type="email" control={control} />
              <InputSection label="Kurssin järjestäjä">
                <FormField 
                  required
                  error={formState.errors.faculty ? t('errors.required') : ''}
                  sx={{ flex: 1}}
                  name="faculty"
                  label="Tiedekunta"
                  control={control}
                  render={(field) => (
                    <Select 
                      {...field}
                      placeholder="Valitse tiedekunta"
                      onChange={(_, val) => {
                        if (!val) return
                        setValue("faculty", val)
                        clearErrors("faculty")
                      }}
                    >
                      {faculties ? (
                        faculties.map(f => (
                          <Option key={f.code} value={f.code}>{f.name.fi}</Option>
                        ))
                      ) : (
                        <Option value="">
                          Ladataan...
                        </Option>
                      )}
                    </Select>
                  )}
                />
                <FormField 
                  sx={{ flex: 1}}
                  name="programme"
                  label="Koulutusohjelma"
                  disabled={!faculty}
                  control={control}
                  render={(field) => (
                    <Select 
                      {...field}
                      placeholder="Valitse koulutusohjelma"
                      onChange={(e, val) => val && setValue("programme", val)}
                    >
                      {programmes ? (
                        programmes.map(f => (
                          <Option key={f.key} value={f.key}>{f.name.fi}</Option>
                        ))
                      ) : (
                        <Option value="">
                          Ladataan...
                        </Option>
                      )}
                      <Option value="">En tiedä</Option>
                    </Select>
                  )}
                />
              </InputSection>
              <FormInputField required error={formState.errors.courseName ? t('errors.required') : undefined} label="Kurssin nimi" name="courseName" control={control} sx={{ flex: 1 }}/>
              <InputSection label="Kurssin aikataulu">
                <FormInputField required error={formState.errors.courseStartDate ? t('errors.required') : undefined} label="Ensimmäinen luento" name="courseStartDate" control={control} sx={{ flex: 1 }}
                  type="date"
                  onChange={(ev) => {
                    if (isRecommendedContractDates) {
                      const v = ev.target.value
                      setValue("contractStartDate", getRecommendedStartDate(v))
                    }
                  }}
                />
                <FormInputField required error={formState.errors.courseEndDate ? t('errors.required') : undefined} label="Viimeinen luento/tentti" name="courseEndDate" control={control} sx={{ flex: 1 }}
                  type="date"
                  onChange={(ev) => {
                    if (isRecommendedContractDates) {
                      const v = ev.target.value
                      setValue("contractEndDate", getRecommendedEndDate(v))
                    }
                  }}
                />
              </InputSection>
              <InputSection label="Sopimuksen kesto" orientation="vertical">
                <Controller
                  name="contractDuration"
                  control={control}
                  rules={{
                    onChange: (ev) => {
                      if (ev.target.value === "recommended") {
                        const { courseStartDate, courseEndDate } = getValues()
                        setValue("contractStartDate", getRecommendedStartDate(courseStartDate))
                        setValue("contractEndDate", getRecommendedEndDate(courseEndDate))
                      } 
                    }
                  }}
                  render={({ field }) => (
                    <RadioGroup {...field}>
                      <Radio value="recommended" label="Suositeltu: alkaa viikkoa ennen kurssin alkua ja jatkuu kaksi viikkoa sen loputtua" />
                      <Radio value="custom" label="Muu aikaväli" />
                    </RadioGroup>
                  )}
                />
                <InputSection>
                  <FormInputField 
                    sx={{ flex: 1 }} required={!isRecommendedContractDates}
                    name="contractStartDate" control={control}
                    type="date"
                    label={`${!isRecommendedContractDates ? "Valitse" : "Suositeltu"} alkupäivä`}
                    readOnly={isRecommendedContractDates}
                  />
                  <FormInputField 
                    sx={{ flex: 1 }} required={!isRecommendedContractDates}
                    name="contractEndDate" control={control}
                    type="date"
                    label={`${!isRecommendedContractDates ? "Valitse" : "Suositeltu"} loppupäivä`}
                    readOnly={isRecommendedContractDates}
                  />
                </InputSection>
              </InputSection>
              <FormField 
                label="Lisätietoja"
                name="additionalInfo"
                render={( field ) => <Textarea {...field} />}
                control={control}
                pretext="Kerro tässä esimerkiksi sovituista poikkeuksista"
              />
              <Button type="submit">Lähetä käsiteltäväksi</Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Sheet>
  )
}

const CalculatorPreviewContainer = () => {

  const previewData = useCalculatorParams()

  return <CalculatorPreview {...previewData} copy={false}/>
}

const ContractRequestForm = () => (
  <Box p="2rem">
    <Typography level="h4">Työsopimuspyyntö</Typography>
    <Box sx={theme => ({ display: "flex", gap: "4rem", py: "4rem", [theme.breakpoints.down('md')]: { flexDirection: 'column-reverse', } })}>
      <Box flex={1}>
        <ContractForm />
      </Box>
      <Box flex={1}>
        <Box mb="2rem">
          <Typography level="h5">Työaika ja palkka</Typography>
          <Typography>Täyttämäsi laskurin tiedot lähetetään työsopimuspyynnön mukana. Tarkistathan vielä niiden oikeellisuuden.</Typography>
        </Box>
        <CalculatorPreviewContainer />
      </Box>
    </Box>
    <Alert>Toppi on vielä testi- ja esittelykäytössä, joten lomakkeesta lähetettyjä työsopimuspyyntöjä ei käsitellä.</Alert>
  </Box>
)

export default ContractRequestForm