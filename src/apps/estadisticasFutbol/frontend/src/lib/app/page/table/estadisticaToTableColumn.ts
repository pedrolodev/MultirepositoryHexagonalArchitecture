import { ColumnDef } from '@tanstack/react-table'
import {
  Estadistica,
  PartidoOutput,
  ValuesEstadisticas,
} from '../../../../../../../../Contexts/EstadisticasFutbol/types/Partidos/partido'

export default function estadisticaToTableColumn(
  tipoEstadistica: ValuesEstadisticas,
  columnName: string,
  separador: '/' | '-' = '/'
): ColumnDef<PartidoOutput> {
  return {
    accessorFn: (row) =>
      row.estadisticas.find(
        (estadistica) => estadistica.tipoEstadistica === tipoEstadistica
      ),
    id: columnName,
    cell: (value) => {
      const valueEst = value.getValue() as Estadistica
      return valueEst ? valueEst.local + separador + valueEst.visitante : '0/0'
    },
    header: () => columnName,
  }
}
