import { ColumnDef } from '@tanstack/react-table'
import { EventoLabels } from '../../../../../../../../Contexts/EstadisticasFutbol/Partidos/domain/partidoEvento/TipoEvento'
import { EquipoOutput } from '../../../../../../../../Contexts/EstadisticasFutbol/types/Equipos/equipo'
import {
  Evento,
  PartidoOutput,
} from '../../../../../../../../Contexts/EstadisticasFutbol/types/Partidos/partido'

export default function eventoToTableColumn(
  tipoEvento: EventoLabels[],
  columnName: string,
  separador: '/' | '-' = '/'
): ColumnDef<PartidoOutput> {
  return {
    accessorFn: (row) => {
      const eventos = row.eventos.filter((evento) =>
        tipoEvento.includes(evento.tipoEvento as EventoLabels)
      )
      return {
        local: row.local,
        visitante: row.visitante,
        eventos,
      }
    },
    id: columnName,
    cell: (values) => {
      const valueEventos = values.getValue() as {
        local: EquipoOutput
        visitante: EquipoOutput
        eventos: Evento[]
      }
      let localEvento = 0
      let visitanteEvento = 0
      valueEventos.eventos.forEach((evento) => {
        if (evento.equipo === valueEventos.local.id) localEvento += 1
        if (evento.equipo === valueEventos.visitante.id) visitanteEvento += 1
      })
      return localEvento + separador + visitanteEvento
      // return valueEvento ? valueEvento.local + separador + valueEvento.visitante : '0/0'
    },
    header: () => columnName,
  }
}
