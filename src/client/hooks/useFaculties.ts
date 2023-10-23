import { Faculty, OrganisationUnit, specialOrganisationCodes } from '../../shared/types'
import { getOrganisationData } from '../api'
import { useQuery } from '@tanstack/react-query'

export const useOrganisations = () => {
  const { data: organisations, ...rest } = useQuery<OrganisationUnit[]>({
    queryKey: ['organisations'],
    queryFn: getOrganisationData,
  })

  return { organisations, ...rest }
}

export const useFaculties = () => {
  const { organisations } = useOrganisations()

  return organisations?.filter((org) => !specialOrganisationCodes.some((c) => c === org.code))?.map((org) => ({ code: org.code, name: org.name })) as Faculty[] | undefined
}

export const useOrganisationUnits = () => {
  const { organisations } = useOrganisations()

  return organisations?.map((org) => ({ code: org.code, name: org.name })) as OrganisationUnit[] | undefined
}

export const useProgrammes = (facultyCode?: string) => {
  const { organisations } = useOrganisations()

  const programmes = organisations?.find((o) => o.code === facultyCode)?.programmes

  return programmes
}
