import { Box, Button, Option, Radio, RadioGroup, Select, Sheet, Textarea, Typography } from '@mui/joy'
import CalculatorPreview from './CalculatorPreview'
import { toast } from 'sonner'
import React from 'react'
import dayjs from 'dayjs'
import { Controller, useForm } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ContractRequestFormParams, ContractRequestFormParamsValidator } from '../../shared/types'
import { useCurrentUser } from '../hooks/useCurrentUser'
import { useSendContract } from '../hooks/useSendContract'
import { useFaculties, useProgrammes } from '../hooks/useFaculties'
import { useCalculatorParams } from '../store/calculatorStore'
import { useTranslation } from 'react-i18next'
import { FormField, FormInputField } from './formComponents'
import { TFunction } from 'i18next'

const InputSection = ({
  label,
  endAdornment,
  children,
  orientation = 'horizontal',
}: {
  label?: string
  endAdornment?: React.ReactNode
  children: React.ReactNode
  orientation?: 'vertical' | 'horizontal'
}) => {
  return (
    <Box py="0.5rem">
      {label && (
        <Typography level="body-md" sx={{ mb: '1rem' }} endDecorator={endAdornment}>
          {label}
        </Typography>
      )}
      <Box
        display="flex"
        gap="1rem"
        sx={(theme) => ({
          flexDirection: orientation === 'horizontal' ? 'row' : 'column',
          [theme.breakpoints.down('md')]: { flexDirection: 'column' },
        })}
      >
        {children}
      </Box>
    </Box>
  )
}

const getRecommendedStartDate = (courseStartDate?: string) => {
  return courseStartDate ? dayjs(courseStartDate).subtract(7, 'days').format('YYYY-MM-DD') : ''
}

const getRecommendedEndDate = (courseEndDate?: string) => {
  return courseEndDate ? dayjs(courseEndDate).add(14, 'days').format('YYYY-MM-DD') : ''
}

const getDateError = (t: TFunction, errorMessage?: string) => {
  if (errorMessage === 'mustBeAfter') return t('errors.mustBeAfter')
  if (errorMessage === 'mustBeBefore') return t('errors.mustBeBefore')
  else if (errorMessage) return t('errors.required')
  else return undefined
}

const useDefaultValues = () => {
  const user = useCurrentUser()

  const defaultValues: ContractRequestFormParams = React.useMemo(
    () => ({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      birthDate: user?.birthDate || '',
      faculty: '',
      courseName: '',
      courseStartDate: '',
      courseEndDate: '',
      contractDuration: 'recommended',
      contractStartDate: '',
      contractEndDate: '',
      additionalInfo: '',
    }),
    [user]
  )

  return defaultValues
}

const ContractForm = () => {
  const { t } = useTranslation()

  const { control, handleSubmit, setValue, clearErrors, getValues, watch, formState } = useForm({
    resolver: zodResolver(ContractRequestFormParamsValidator),
    defaultValues: useDefaultValues(),
    mode: 'onChange',
  })

  const sendContract = useSendContract()

  const faculty = watch('faculty')
  const faculties = useFaculties()
  const programmes = useProgrammes(faculty)

  const onSubmit: SubmitHandler<typeof ContractRequestFormParamsValidator._type> = (formData) => {
    const req = sendContract(formData)

    toast.promise(req, {
      loading: t('contractRequestForm.submitLoading'),
      success: t('contractRequestForm.submitSuccess'),
      error: t('contractRequestForm.submitError'),
    })
  }

  const isRecommendedContractDates = watch('contractDuration') === 'recommended'

  return (
    <Sheet
      sx={{
        borderRadius: '1rem',
        p: '1rem',
      }}
    >
      <Box>
        <Typography level="body-md">{t('contractRequestForm.formTitle')}</Typography>
        <Box mt="2rem">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box display="flex" flexDirection="column" gap="3rem">
              <InputSection>
                <FormInputField required error={formState.errors.firstName ? t('errors.required') : undefined} label={t('formFields.firstName')} name="firstName" control={control} sx={{ flex: 1 }} />
                <FormInputField required error={formState.errors.lastName ? t('errors.required') : undefined} label={t('formFields.lastName')} name="lastName" control={control} sx={{ flex: 1 }} />
              </InputSection>
              <FormInputField required error={formState.errors.birthDate ? t('errors.required') : undefined} label={t('formFields.birthDate')} name="birthDate" type="date" control={control} />
              <FormInputField required error={formState.errors.email ? t('errors.required') : undefined} label={t('formFields.email')} name="email" type="email" control={control} />
              <InputSection label={t('contractRequestForm.courseOrganiser')}>
                <FormField
                  required
                  error={formState.errors.faculty ? t('errors.required') : ''}
                  sx={{ flex: 1 }}
                  name="faculty"
                  label={t('common.faculty')}
                  control={control}
                  render={(field) => (
                    <Select
                      {...field}
                      placeholder={t('contractRequestForm.chooseFaculty')}
                      onChange={(_, val) => {
                        if (!val) return
                        setValue('faculty', val)
                        clearErrors('faculty')
                      }}
                    >
                      {faculties ? (
                        faculties.map((f) => (
                          <Option key={f.code} value={f.code}>
                            {f.name.fi}
                          </Option>
                        ))
                      ) : (
                        <Option value="">{t('common.loading')}</Option>
                      )}
                    </Select>
                  )}
                />
                <FormField
                  sx={{ flex: 1 }}
                  name="programme"
                  label={t('common.programme')}
                  disabled={!faculty}
                  control={control}
                  render={(field) => (
                    <Select {...field} placeholder={t('contractRequestForm.chooseProgramme')} onChange={(e, val) => val && setValue('programme', val)}>
                      {programmes ? (
                        programmes.map((f) => (
                          <Option key={f.key} value={f.key}>
                            {f.name.fi}
                          </Option>
                        ))
                      ) : (
                        <Option value="">{t('common.loading')}</Option>
                      )}
                      <Option value="">{t('common.dontKnow')}</Option>
                    </Select>
                  )}
                />
              </InputSection>
              <FormInputField required error={formState.errors.courseName ? t('errors.required') : undefined} label={t('formFields.courseName')} name="courseName" control={control} sx={{ flex: 1 }} />
              <InputSection label={t('contractRequestForm.courseSchedule')}>
                <FormInputField
                  required
                  error={getDateError(t, formState.errors.courseStartDate?.message)}
                  label={t('contractRequestForm.startDatelabel')}
                  name="courseStartDate"
                  control={control}
                  sx={{ flex: 1 }}
                  type="date"
                  onChange={(ev) => {
                    clearErrors('courseEndDate')
                    if (isRecommendedContractDates) {
                      const v = ev.target.value
                      setValue('contractStartDate', getRecommendedStartDate(v))
                    }
                  }}
                />
                <FormInputField
                  required
                  error={getDateError(t, formState.errors.courseEndDate?.message)}
                  label={t('contractRequestForm.endDatelabel')}
                  name="courseEndDate"
                  control={control}
                  sx={{ flex: 1 }}
                  type="date"
                  onChange={(ev) => {
                    clearErrors('courseStartDate')
                    if (isRecommendedContractDates) {
                      const v = ev.target.value
                      setValue('contractEndDate', getRecommendedEndDate(v))
                    }
                  }}
                />
              </InputSection>
              <InputSection label={t('contractRequestForm.contractDates')} orientation="vertical">
                <Controller
                  name="contractDuration"
                  control={control}
                  rules={{
                    onChange: (ev) => {
                      if (ev.target.value === 'recommended') {
                        const { courseStartDate, courseEndDate } = getValues()
                        setValue('contractStartDate', getRecommendedStartDate(courseStartDate))
                        setValue('contractEndDate', getRecommendedEndDate(courseEndDate))
                      }
                    },
                  }}
                  render={({ field }) => (
                    <RadioGroup {...field}>
                      <Radio value="recommended" label={t('contractRequestForm.contractDatesRecommended')} />
                      <Radio value="custom" label={t('contractRequestForm.contractDatesCustom')} />
                    </RadioGroup>
                  )}
                />
                <InputSection>
                  <FormInputField
                    sx={{ flex: 1 }}
                    required={!isRecommendedContractDates}
                    name="contractStartDate"
                    control={control}
                    error={getDateError(t, formState.errors.contractStartDate?.message)}
                    type="date"
                    label={!isRecommendedContractDates ? t('contractRequestForm.chooseStartDate') : t('contractRequestForm.recommendedStartDate')}
                    readOnly={isRecommendedContractDates}
                  />
                  <FormInputField
                    sx={{ flex: 1 }}
                    required={!isRecommendedContractDates}
                    name="contractEndDate"
                    control={control}
                    error={getDateError(t, formState.errors.contractEndDate?.message)}
                    type="date"
                    label={!isRecommendedContractDates ? t('contractRequestForm.chooseEndDate') : t('contractRequestForm.recommendedEndDate')}
                    readOnly={isRecommendedContractDates}
                  />
                </InputSection>
              </InputSection>
              <FormField
                label={t('common.additionalInfo')}
                name="additionalInfo"
                render={(field) => <Textarea {...field} />}
                control={control}
                pretext={t('contractRequestForm.additionalInfoPretext')}
              />
              <Button type="submit">{t('contractRequestForm.submit')}</Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Sheet>
  )
}

const CalculatorPreviewContainer = () => {
  const previewData = useCalculatorParams()

  return <CalculatorPreview {...previewData} copy={false} />
}

const ContractRequestForm = () => {
  const { t } = useTranslation()

  return (
    <Box p="1rem">
      <Typography level="h4">{t('common.contractRequest')}</Typography>
      <Box sx={(theme) => ({ display: 'flex', gap: '2rem', py: '4rem', [theme.breakpoints.down('md')]: { flexDirection: 'column-reverse' } })}>
        <Box flex={3}>
          <ContractForm />
        </Box>
        <Box flex={2}>
          <Box mb="2rem">
            <Typography level="body-md">{t('contractRequestForm.calculatorPreviewTitle')}</Typography>
            <Typography level="body-sm">{t('contractRequestForm.calculatorPreviewDescription')}</Typography>
          </Box>
          <CalculatorPreviewContainer />
        </Box>
      </Box>
    </Box>
  )
}

export default ContractRequestForm
