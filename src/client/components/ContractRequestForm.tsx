import { Alert, Box, Button, FormControl, FormLabel, Input, Radio, RadioGroup, Sheet, Typography } from "@mui/joy";
import { sendContract } from "../api";
import CalculatorPreview from "./CalculatorPreview";
import { toast } from "sonner";
import React from "react";
import dayjs from "dayjs"
import { Controller, useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { ContractRequestFormParams } from "../../shared/types";
import { useCurrentUser } from "../hooks/useCurrentUser";

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

  const defaultValues: typeof ContractRequestFormParams._type = React.useMemo(() => ({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    birthDate: user?.birthDate || "",
    courseName: "",
    courseStartDate: "",
    courseEndDate: "",
    contractDuration: "recommended",
    contractStartDate: "",
    contractEndDate: "",
  }), [user])

  return defaultValues
}

const onSubmit: SubmitHandler<typeof ContractRequestFormParams._type> = (formData) => {
  const req = sendContract(formData)

  toast.promise(req, {
    loading: "Lähetetään työsopimuspyyntöä",
    success: "Työsopimuspyyntö lähetetty",
    error: "Työsopimuspyynnön lähettäminen epäonnistui"
  })
}

const ContractForm = () => {
  const { control, handleSubmit, setValue, getValues, watch, formState: { errors } } = useForm({
    resolver: zodResolver(ContractRequestFormParams),
    defaultValues: useDefaultValues(),
  })

  const isRecommendedContractDates = watch("contractDuration") === "recommended"

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
                <FormControl required>
                  <FormLabel>Etunimi</FormLabel>
                  <Controller
                    name="firstName"
                    control={control}
                    render={({ field }) => <Input {...field} />}
                  />
                </FormControl>
                <FormControl required>
                  <FormLabel>Sukunimi</FormLabel>
                  <Controller
                    name="lastName"
                    control={control}
                    render={({ field }) => <Input {...field} />}
                  />
                </FormControl>
              </InputSection>
              <FormControl required>
                <FormLabel>Syntymäaika</FormLabel>
                <Controller
                  name="birthDate"
                  control={control}
                  render={({ field }) => <Input {...field} type="date"/>}
                />
              </FormControl>
              <FormControl required error={!!errors.email}>  
                <FormLabel>Sähköposti</FormLabel>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => <Input {...field} type="email"/>}
                />
              </FormControl>
              <FormControl required error={!!errors.courseName}>
                <FormLabel>Kurssin nimi</FormLabel>
                <Controller
                  name="courseName"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
              </FormControl>
              <InputSection label="Kurssin aikataulu">
                <FormControl required sx={{ flex: 1 }}>
                  <FormLabel>Ensimmäinen luento</FormLabel>
                  <Controller
                    name="courseStartDate"
                    control={control}
                    rules={{
                      onChange: (ev) => {
                        if (isRecommendedContractDates) {
                          const v = ev.target.value
                          setValue("contractStartDate", getRecommendedStartDate(v))
                        }
                      }
                    }}
                    render={({ field }) => <Input {...field} type="date"/>}
                  />
                </FormControl>
                <FormControl required sx={{ flex: 1 }} error={!!errors.courseEndDate}>
                  <FormLabel>Viimeinen luento/tentti</FormLabel>
                  <Controller
                    name="courseEndDate"
                    control={control}
                    rules={{
                      onChange: (ev) => {
                        if (isRecommendedContractDates) {
                          const v = ev.target.value
                          setValue("contractEndDate", getRecommendedEndDate(v))
                        }
                      }
                    }}
                    render={({ field }) => <Input {...field} type="date"/>}
                  />
                </FormControl>
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
                  <FormControl sx={{ flex: 1 }} required={!isRecommendedContractDates}>
                    <FormLabel>{!isRecommendedContractDates ? "Valitse" : "Suositeltu"} alkupäivä</FormLabel>
                    <Controller
                      name="contractStartDate"
                      control={control}
                      render={({ field }) => <Input {...field} type="date" readOnly={isRecommendedContractDates} />}
                    />
                  </FormControl>
                  <FormControl sx={{ flex: 1 }} required={!isRecommendedContractDates}>
                    <FormLabel>{!isRecommendedContractDates ? "Valitse" : "Suositeltu"} loppupäivä</FormLabel>
                    <Controller
                      name="contractEndDate"
                      control={control}
                      render={({ field }) => <Input {...field} type="date" readOnly={isRecommendedContractDates} />}
                    />
                  </FormControl>
                </InputSection>
              </InputSection>
              <Button type="submit">Lähetä käsiteltäväksi</Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Sheet>
  )
}

const ContractRequestForm = () => (
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

export default ContractRequestForm