import { ContractDurationOption, ContractRequestParams, ContractRequestStatus, UserParams } from "../shared/types";

export type Option = { label: string, value: number }

export type ContractRequestCreateParams = {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  faculty?: string;
  programme?: string;
  courseName: string;
  courseStartDate: string;
  courseEndDate: string;
  contractDuration: ContractDurationOption;
  contractStartDate?: string;
  contractEndDate?: string;
  additionalInfo?: string;
}

export type ContractRequest = {
  id: number;
  status: ContractRequestStatus;
  data: ContractRequestParams;
  User?: UserParams
  createdAt: string;
  updatedAt: string;
}