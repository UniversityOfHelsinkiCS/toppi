import axios from "axios";
import { PUBLIC_URL } from "../config";

const client = axios.create({
  baseURL: `${PUBLIC_URL}/api`,
})

type ContractRequest = {
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

export const sendContract = async (contract: ContractRequest) => {
  const { data } = await client.post("/contracts", contract)

  return data
}