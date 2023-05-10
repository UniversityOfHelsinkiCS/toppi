import { create } from 'zustand'

interface ContractState {
  workHours: number
  setWorkHours: (workHours: number) => void
  hourlyRate: number
  setHourlyRate: (hourlyRate: number) => void
}

const useContractStore = create<ContractState>((set) => ({
  workHours: 0,
  setWorkHours: (workHours: number) => set({ workHours }),
  hourlyRate: 0,
  setHourlyRate: (hourlyRate: number) => set({ hourlyRate }),
}))

export default useContractStore