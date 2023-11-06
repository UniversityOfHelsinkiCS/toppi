import { UserParams } from '../../shared/types'
import { useQuery } from '@tanstack/react-query'
import { login } from '../api'
import { AxiosError } from 'axios'

export const useCurrentUser = () => {
  const { data: user, ...rest } = useQuery<UserParams>({
    queryKey: ['currentUser'],
    queryFn: login,
    retry: false,
    throwOnError: (error) => {
      if (error instanceof AxiosError && error.response?.status === 401) return false
      return true
    },
  })

  return { user, ...rest }
}
