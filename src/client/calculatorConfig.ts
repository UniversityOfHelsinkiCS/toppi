import { Option } from './types'
import { useTranslation } from 'react-i18next'
import React from 'react'

export const courseTypeOptions = [
  { label: 'Toistuva', value: 0 },
  { label: 'Uudistettava', value: 1 },
  { label: 'Uusi', value: 2 },
]

export const creditOptions = [
  { value: 0, label: '1-3 op.' },
  { value: 1, label: '4-6 op.' },
  { value: 2, label: '7-9 op.' },
  { value: 3, label: '10 op. tai enemmän' },
]

export const studentCountOptions = [
  { value: 10, label: '1-30' },
  { value: 20, label: '31-70' },
  { value: 30, label: '71-120' },
  { value: 40, label: 'yli 120' },
]

export const preparationHoursTableData = [
  [5, 15, 30],
  [10, 30, 50],
  [15, 45, 70],
  [20, 60, 90],
]

export const useSalaryTableData = () => {
  const { t } = useTranslation()

  return React.useMemo(
    () => [
      { qualificationInfo: t('salaryTableData.levelA'), salary: 55 },
      { qualificationInfo: t('salaryTableData.levelB'), salary: 40 },
      { qualificationInfo: t('salaryTableData.levelC'), salary: 30 },
      { qualificationInfo: t('salaryTableData.levelD'), salary: 24 },
      { qualificationInfo: t('salaryTableData.levelE'), salary: 20 },
      { qualificationInfo: t('salaryTableData.levelF'), salary: 19 },
    ],
    [t]
  )
}

export const getPreparationHours = (credits: Option, courseType: Option) => {
  return preparationHoursTableData[credits.value][courseType.value]
}
