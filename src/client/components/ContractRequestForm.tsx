import { Box, Button, Modal, ModalClose, ModalDialog, ModalOverflow, Option, Radio, RadioGroup, Select, Sheet, Textarea, Typography } from '@mui/joy'
import { toast } from 'sonner'
import React from 'react'
import dayjs from 'dayjs'
import { Controller, useForm } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ContractRequestFormParams, ContractRequestFormParamsValidator, UserRoles } from '../../shared/types'
import { useCurrentUser } from '../hooks/useCurrentUser'
import { useSendContract } from '../hooks/useSendContract'
import { useFaculties, useProgrammes } from '../hooks/useFaculties'
import { useTranslation } from 'react-i18next'
import { FormField, FormInputField } from './formComponents'
import { TFunction } from 'i18next'
import { hasRight } from '../../shared/authorizationUtils'
import FormPreview from './FormPreview'

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
        <Typography level="body-md" sx={{ mb: '0.5rem' }} endDecorator={endAdornment}>
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
  const { user } = useCurrentUser()

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

const PreviewModal = ({
  formData,
  isStaff,
  isOpen,
  setIsOpen,
  onSubmit,
}: {
  formData: ContractRequestFormParams
  isStaff: boolean
  isOpen: boolean
  setIsOpen: (o: boolean) => void
  onSubmit: () => void
}) => {
  const { t } = useTranslation()
  const onClick = () => {
    onSubmit()
    setIsOpen(false)
  }

  return (
    <Modal open={isOpen} onClose={() => setIsOpen(false)}>
      <ModalOverflow>
        <ModalDialog sx={(theme) => ({ pb: '10rem', [theme.breakpoints.up('md')]: { width: '80vw' }, [theme.breakpoints.up('lg')]: { width: '60vw' } })}>
          <ModalClose />
          <FormPreview formData={formData} />
          <Button sx={{ mt: '4rem' }} type="submit" onClick={onClick}>
            {t('contractRequestForm.submit')}
          </Button>
          {isStaff && <Typography level="body-sm">{t('contractRequestForm.testInfo')}</Typography>}
        </ModalDialog>
      </ModalOverflow>
    </Modal>
  )
}

const ContractForm = () => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = React.useState(false)
  const { user } = useCurrentUser()
  const isStaff = (user && hasRight(user, UserRoles.Faculty)) || false

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

  const isValid = formState.isValid

  const submit = handleSubmit(onSubmit)

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
          <form onSubmit={submit}>
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
                <Typography level="body-sm" sx={{ mb: '0.5rem' }}>
                  {t('contractRequestForm.contractDatesInfo')}
                </Typography>
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
              <Button type="button" onClick={() => setIsOpen(true)} disabled={!isValid}>
                {t('contractRequestForm.beginSubmission')}
              </Button>
            </Box>
            <PreviewModal isOpen={isOpen} setIsOpen={setIsOpen} isStaff={isStaff} formData={getValues()} onSubmit={submit} />
          </form>
        </Box>
      </Box>
    </Sheet>
  )
}

const ContractRequestForm = () => {
  const { t } = useTranslation()

  return (
    <Box p="1rem">
      <Typography level="h4">{t('common.contractRequest')}</Typography>
      <ContractForm />
    </Box>
  )
}

export default ContractRequestForm
