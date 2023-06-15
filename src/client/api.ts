import axios from "axios";
import { PUBLIC_URL } from "../config";
import { ContractRequestCreateParams } from "./types";

const client = axios.create({
  baseURL: `${PUBLIC_URL}/api`,
})

export const sendContract = async (contract: ContractRequestCreateParams) => {
  const { data } = await client.post("/contract-requests", contract)

  return data
}

export const getContractRequests = async () => {
  const { data } = await client.get("/contract-requests")

  return data
}
