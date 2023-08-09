import { OrganisationUnit } from "../../shared/types"
import { getOrganisationData } from "../util/jami"

const doctoralOrganisation: OrganisationUnit = {
  code: 'doctoral',
  name: {
    fi: 'Tohtoriohjelmat',
    en: 'Doctoral programmes',
  }
}

export const getOrganisations = async () => {
  const faculties = await getOrganisationData()

  // Add Toppi's "virtual" organisations to jami data
  const organisations = [...faculties, doctoralOrganisation]

  return organisations
}

export const getProgrammes = async () => {
  const faculties = await getOrganisationData()

  return faculties.flatMap(f => f.programmes)
}

export const isDoctoralProgramme = async (programmeCode: string) => {
  const programmes = await getProgrammes()

  const theProgramme = programmes.find(p => p.key === programmeCode)

  return theProgramme?.level === 'doctoral'
}
