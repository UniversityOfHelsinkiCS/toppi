export type Option = { label: string, value: number }

export type ContractRequestCreateParams = {
  firstname: string;
  lastname: string;
  email: string;
  courseName: string;
  courseStartDate: string;
  courseEndDate: string;
  contractDuration: string;
  contractStartDate?: string;
  contractEndDate?: string;
}

export type ContractRequest = {
  id: number;
  status: string;
  formData: ContractRequestCreateParams;
  createdAt: string;
  updatedAt: string;
}