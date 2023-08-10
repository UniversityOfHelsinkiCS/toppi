import { privateClient, publicClient, sendContract } from '../api'
import { useCalculatorParams } from '../store/calculatorStore'
import { ContractRequestCreateParams } from '../types'
import { useCurrentUser } from './useCurrentUser'

export const useSendContract = () => {
  const user = useCurrentUser()
  const calculatorParams = useCalculatorParams()
  const client = user ? privateClient : publicClient

  return (contractRequest: ContractRequestCreateParams) =>
    sendContract(client, {
      formData: contractRequest,
      calculatorData: calculatorParams,
    })
}
