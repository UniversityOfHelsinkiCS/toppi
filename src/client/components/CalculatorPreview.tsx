import { CalculatorParams } from '../../shared/types'
import { DataTable, TableItem } from './CustomTable'

const CalculatorPreview = ({ teachingHours, courseType, credits, preparationHours, studentCount, hourlyRate, totalHours, salary, copy }: CalculatorParams & { copy: boolean }) => {
  return (
    <DataTable copy={copy}>
      <tbody>
        <TableItem label="Opetustunnit" value={teachingHours} extra="h" copy={copy} />
        <TableItem label="Kurssin tyyppi" value={courseType?.label} copy={copy} />
        <TableItem label="Opintopisteet" value={credits?.label} copy={copy} />
        <TableItem label="Valmistelutunnit" value={preparationHours} extra="h" copy={copy} />
        <TableItem label="Opiskelijoiden määrä" value={studentCount?.label} copy={copy} />
        <TableItem label="Opiskelijoiden määrään perustuva lisätyöaika" value={studentCount?.value} extra="h" copy={copy} />
        <TableItem label="Työaika yhteensä" value={totalHours} extra="h" copy={copy} />
        <TableItem label="Tuntipalkka" value={hourlyRate} extra="€/h" copy={copy} />
      </tbody>
      <tfoot>
        <TableItem label="Palkkio yhteensä" value={salary} extra="€" copy={copy} />
      </tfoot>
    </DataTable>
  )
}

export default CalculatorPreview
