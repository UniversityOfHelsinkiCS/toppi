import axios, { AxiosInstance } from "axios";
import { PUBLIC_URL, inDevelopment, inE2E, inTesting } from "../config";
import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from "react-router-dom";
import { getMockHeaders } from "./util/mockHeaders";
import { ContractRequestParams, OrganisationData, UserParams } from "../shared/types";

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

export const sendContract = async (client: AxiosInstance, contract: ContractRequestParams) => {
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

const updateStatus = async (id: string|undefined, updates: any) => {
  const { data } = await privateClient.put(`/contract-requests/${id}`, updates)

  return data
}

export const updateStatusAction = async ({ request, params }: ActionFunctionArgs) => {
  const formData = await request.formData();
  console.log(formData)
  const updates = Object.fromEntries(formData);
  await updateStatus(params.id, updates);
  return redirect(`/private/contract-requests/${params.id}`);
}

export const login = async () => {
  const { data } = await privateClient.get('/login')

  return data as UserParams
}

export const logout = async () => {
  const { data } = await privateClient.get('/logout')

  return data as { url: string }
}

export const getOrganisationData = async () => {
  const { data } = await publicClient.get('/organisations')

  return data as OrganisationData[]
}
