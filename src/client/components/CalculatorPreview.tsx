import { Box, Sheet, Table, Typography } from "@mui/joy"
import useContractStore, { useTotalHours } from "../store/calculatorStore"
import { getPreparationHours } from "../calculatorConfig"

const CalculatorPreview = () => {
  const teachingHours = useContractStore(state => state.teachingHours)
  const courseType = useContractStore(state => state.courseType)
  const credits = useContractStore(state => state.credits)
  const preparationHours = getPreparationHours(credits, courseType)
  const studentCount = useContractStore(state => state.studentCount)
  const hourlyRate = useContractStore(state => state.hourlyRate)
  const totalHours = useTotalHours()
  const salary = hourlyRate * totalHours

  return (
    <Sheet>
      <Box mb="2rem">
        <Typography level="h5">Työaika ja palkka</Typography>
        <Typography>Täyttämäsi laskurin tiedot lähetetään työsopimuspyynnön mukana. Tarkistathan vielä niiden oikeellisuuden.</Typography>
      </Box>
      <Table>
        <tbody>
        <tr>
          <th scope="row">Opetustunnit</th>
          <td>{teachingHours} h</td>
        </tr>
          <tr>
            <th scope="row">Kurssin tyyppi</th>
            <td>{courseType.label}</td>
          </tr>
          <tr>
            <th scope="row">Opintopisteet</th>
            <td>{credits.label}</td>
          </tr>
          <tr>
            <th scope="row">Valmistelutunnit</th>
            <td>{preparationHours} h</td>
          </tr>
          <tr>
            <th scope="row">Opiskelijoiden määrä</th>
            <td>{studentCount.label}</td>
          </tr>
          <tr>
            <th scope="row">Opiskelijoiden määrään perustuva lisätyöaika</th>
            <td>{studentCount.value} h</td>
          </tr>
          <tr>
            <th scope="row">Työaika yhteensä </th>
            <td>{totalHours} h</td>
          </tr>
          <tr>
            <th scope="row">Tuntipalkka</th>
            <td>{hourlyRate} €/h</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th scope="row">Palkkio yhteensä</th>
            <td>{salary} €</td>
          </tr>
        </tfoot>
      </Table>
    </Sheet>
  )
}

export default CalculatorPreview