import { getHandlerAddresses } from '../api'
import { HandlerAddress } from '../types'
import { useQuery } from '@tanstack/react-query'

export const useHandlerAddresses = (query?: { facultyCode?: string; address?: string }) => {
  const { data: handlerAddresses, ...rest } = useQuery<HandlerAddress[]>({
    queryKey: ['handlerAddresses', query],
    queryFn: () => getHandlerAddresses(query),
  })

  return { handlerAddresses, ...rest }
}
