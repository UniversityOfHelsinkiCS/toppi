import axios, { AxiosInstance } from "axios";
import { PUBLIC_URL, inDevelopment, inE2E, inTesting } from "../config";
import { ContractRequestCreateParams } from "./types";
import { LoaderFunctionArgs } from "react-router-dom";
import { getMockHeaders } from "./util/mockHeaders";
import { UserParams } from "../shared/types";

export const publicClient = axios.create({
  baseURL: `${PUBLIC_URL}/api`,
})

export const privateClient = axios.create({
  baseURL: `${PUBLIC_URL}/private/api`,
})

privateClient.interceptors.request.use(config => {
  let headers = (inDevelopment || inTesting || inE2E) ? getMockHeaders() : undefined
  headers ||= {}

  const adminLoggedInAs = localStorage.getItem('adminLoggedInAs') // id
  if (adminLoggedInAs) headers['x-admin-logged-in-as'] = adminLoggedInAs

  const newHeaders = Object.assign(config.headers, headers)

  const newConfig = { ...config, headers: newHeaders }

  return newConfig
})

export const sendContract = async (client: AxiosInstance, contract: ContractRequestCreateParams) => {
  const { data } = await client.post("/contract-requests", contract)

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

export const logout = async () => {
  const { data } = await privateClient.get('/logout')

  return data as { url: string }
}
