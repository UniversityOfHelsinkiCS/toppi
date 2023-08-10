import { useRouteLoaderData } from 'react-router-dom'
import { UserParams } from '../../shared/types'

export const useCurrentUser = () => {
  const user = useRouteLoaderData('privateRoot') as UserParams | undefined

  return user
}
