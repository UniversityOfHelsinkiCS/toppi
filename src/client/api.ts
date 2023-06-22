import axios from "axios";
import { PUBLIC_URL, inProduction, inTesting } from "../config";
import { ContractRequestCreateParams } from "./types";
import { LoaderFunctionArgs } from "react-router-dom";
import { getHeaders } from "./util/mockHeaders";

const client = axios.create({
  baseURL: `${PUBLIC_URL}/api`,
})

client.interceptors.request.use(config => {
  const headers = inProduction && !inTesting ? {} : getHeaders()

  const adminLoggedInAs = localStorage.getItem('adminLoggedInAs') // id
  if (adminLoggedInAs) headers['x-admin-logged-in-as'] = adminLoggedInAs

  const newConfig = { ...config, headers }

  return newConfig
})

export const sendContract = async (contract: ContractRequestCreateParams) => {
  const { data } = await client.post("/contract-requests", contract)

  return data
}

export const getContractRequests = async () => {
  const { data } = await client.get("/contract-requests")

  return data
}

export const getContractRequest = async ({ params }: LoaderFunctionArgs) => {
  const { data } = await client.get(`/contract-requests/${params.id}`)

  return data
}