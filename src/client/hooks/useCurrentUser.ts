import { UserParams } from '../../shared/types'
import { useQuery } from '@tanstack/react-query'
import { login } from '../api'

export const useCurrentUser = () => {
  const { data: user, ...rest } = useQuery<UserParams | null>({
    queryKey: ['currentUser'],
    queryFn: login,
    retry: false,
    throwOnError: true,
  })

  return { user, ...rest }
}
