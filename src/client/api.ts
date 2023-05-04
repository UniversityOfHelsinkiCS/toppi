import axios from "axios";

const PUBLIC_URL = process.env.PUBLIC_URL || "http://localhost:8000";

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
  contractStartDate: string;
  contractEndDate: string;
}

export const sendContract = async (contract: ContractRequest) => {
  const { data } = await client.post("/contract", contract)

  return data
}