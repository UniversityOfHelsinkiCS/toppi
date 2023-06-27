import axios from "axios";
import { PUBLIC_URL, inDevelopment, inTesting } from "../config";
import { ContractRequestCreateParams } from "./types";
import { LoaderFunctionArgs } from "react-router-dom";
import { getHeaders } from "./util/mockHeaders";
import { UserParams } from "../shared/types";

const publicClient = axios.create({
  baseURL: `${PUBLIC_URL}/api`,
})

const privateClient = axios.create({
  baseURL: `${PUBLIC_URL}/private/api`,
})

privateClient.interceptors.request.use(config => {
  const headers = (inDevelopment || inTesting) ? getHeaders() : {}

  const adminLoggedInAs = localStorage.getItem('adminLoggedInAs') // id
  if (adminLoggedInAs) headers['x-admin-logged-in-as'] = adminLoggedInAs

  const newConfig = { ...config, headers }

  return newConfig
})

export const sendContract = async (contract: ContractRequestCreateParams) => {
  const { data } = await publicClient.post("/contract-requests", contract)

  return data
}

export const getContractRequests = async () => {
  const { data } = await privateClient.get("/contract-requests")

  return data
}

export const getContractRequest = async ({ params }: LoaderFunctionArgs) => {
  const { data } = await privateClient.get(`/contract-requests/${params.id}`)

  return data
}

export const login = async () => {
  const { data } = await privateClient.get('/login')

  return data as UserParams
}
