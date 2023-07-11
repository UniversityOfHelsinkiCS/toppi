import React, { useEffect } from "react"
import { OrganisationData } from "../../shared/types"
import { getOrganisationData } from "../api"

export const useOrganisations = () => {
  const [organisations, setOrganisations] = React.useState<OrganisationData[]>()

  useEffect(() => {
    getOrganisationData().then(data => {
      setOrganisations(data)
    })
  }, [])

  return organisations
}

export const useFaculties = () => {
  const organisations = useOrganisations()

  return organisations?.map(org => ({ code: org.code, name: org.name }))
}

export const useProgrammes = (facultyCode?: string) => {
  const organisations = useOrganisations()
    
  const programmes = organisations?.find(o => o.code === facultyCode)?.programmes

  return programmes
}
