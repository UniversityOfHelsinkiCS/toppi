import { create } from 'zustand'
import { Option } from '../types'
import { courseTypeOptions, creditOptions, getPreparationHours, studentCountOptions } from '../calculatorConfig'

interface ContractState {
  teachingHours: number
  setTeachingHours: (teachingHours: number) => void
  courseType: Option
  setCourseType: (courseType: Option) => void
  credits: Option
  setCredits: (credits: Option) => void
  studentCount: Option
  setStudentCount: (studentCount: Option) => void
  hourlyRate: number
  setHourlyRate: (hourlyRate: number) => void
}

const useContractStore = create<ContractState>((set) => ({
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
}))

export const usePreparationHours = () => {
  const credits = useContractStore(state => state.credits)
  const courseType = useContractStore(state => state.courseType)
  const preparationHours = getPreparationHours(credits, courseType)
  return preparationHours
}

export const useTotalHours = () => {
  const teachingHours = useContractStore(state => state.teachingHours)
  const preparationHours = usePreparationHours()
  const studentCountHours = useContractStore(state => state.studentCount.value)
  return teachingHours + preparationHours + studentCountHours
}

export const useWorkHourCalculatorFields = () => ({
  ...useContractStore(state => ({
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

export default useContractStore
