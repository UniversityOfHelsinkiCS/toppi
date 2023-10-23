import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Option } from '../types'
import { courseTypeOptions, creditOptions, getPreparationHours, studentCountOptions } from '../calculatorConfig'
import { CalculatorParams } from '../../shared/types'

export type ExceptionsState = {
  workHourExceptions: string
  salaryExceptions: string
}

export type ExceptionsSetters = {
  setWorkHourExceptions: (workHourExceptions: string) => void
  setSalaryExceptions: (salaryExceptions: string) => void
}

export type ContractState = {
  teachingHours: number
  courseType: Option
  credits: Option
  studentCount: Option
  hourlyRate: number
} & ExceptionsState

export type ContractStateSetters = {
  setTeachingHours: (teachingHours: number) => void
  setCourseType: (courseType: Option) => void
  setCredits: (credits: Option) => void
  setStudentCount: (studentCount: Option) => void
  setHourlyRate: (hourlyRate: number) => void
} & ExceptionsSetters

const useContractStore = create<ContractState & ContractStateSetters>()(
  persist(
    (set) => ({
      teachingHours: 0,
      setTeachingHours: (teachingHours: number) => set({ teachingHours }),
      courseType: courseTypeOptions[0],
      setCourseType: (courseType: Option) => set({ courseType }),
      credits: creditOptions[0],
      setCredits: (credits: Option) => set({ credits }),
      studentCount: studentCountOptions[0],
      setStudentCount: (studentCount: Option) => set({ studentCount }),
      hourlyRate: 0,
      setHourlyRate: (hourlyRate: number) => set({ hourlyRate }),
      workHourExceptions: '',
      setWorkHourExceptions: (workHourExceptions: string) => set({ workHourExceptions }),
      salaryExceptions: '',
      setSalaryExceptions: (salaryExceptions: string) => set({ salaryExceptions }),
    }),
    {
      name: 'calculator-state',
    }
  )
)

export const usePreparationHours = () => {
  const credits = useContractStore((state) => state.credits)
  const courseType = useContractStore((state) => state.courseType)
  const preparationHours = getPreparationHours(credits, courseType)
  return preparationHours
}

export const useTotalHours = () => {
  const teachingHours = useContractStore((state) => state.teachingHours)
  const preparationHours = usePreparationHours()
  const studentCountHours = useContractStore((state) => state.studentCount.value)
  return teachingHours + preparationHours + studentCountHours
}

export const useWorkHourCalculatorFields = () => ({
  ...useContractStore((state) => ({
    teachingHours: state.teachingHours,
    courseType: state.courseType,
    setCourseType: state.setCourseType,
    credits: state.credits,
    setCredits: state.setCredits,
    studentCount: state.studentCount,
    setStudentCount: state.setStudentCount,
  })),
  preparationHours: usePreparationHours(),
  totalHours: useTotalHours(),
})

export const useCalculatorParams: () => CalculatorParams = () => {
  const calculatorState = useContractStore((state) => ({
    teachingHours: state.teachingHours,
    courseType: state.courseType,
    credits: state.credits,
    studentCount: state.studentCount,
    hourlyRate: state.hourlyRate,
    workHourExceptions: state.workHourExceptions,
    salaryExceptions: state.salaryExceptions,
  }))

  const totalHours = useTotalHours()

  return {
    teachingHours: calculatorState.teachingHours,
    courseType: calculatorState.courseType,
    credits: calculatorState.credits,
    studentCount: calculatorState.studentCount,
    hourlyRate: calculatorState.hourlyRate,
    preparationHours: usePreparationHours(),
    totalHours,
    workHourExceptions: calculatorState.workHourExceptions,
    salary: totalHours * calculatorState.hourlyRate,
    salaryExceptions: calculatorState.salaryExceptions,
  }
}

export default useContractStore
