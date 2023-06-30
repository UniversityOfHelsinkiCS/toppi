import { privateClient, publicClient, sendContract } from "../api"
import { ContractRequestCreateParams } from "../types"
import { useCurrentUser } from "./useCurrentUser"

export const useSendContract = () => {
  const user = useCurrentUser()
  const client = user ? privateClient : publicClient
  return (contractRequest: ContractRequestCreateParams) => sendContract(client, contractRequest)
}
