import { Estadisticas } from '../../Partidos/domain/partidoEstadistica/TipoEstadistica'
import { EquipoOutput } from '../Equipos/equipo'
import { JugadorOutput } from '../Jugadores/jugador'

export type PartidoFields =
      | 'id'
      | 'local'
      | 'visitante'
      | 'competicion'
      | 'temporada'
      | 'jornada'
      | 'fecha'
      | 'equipoLocalTitulares'
      | 'equipoLocalSuplentes'
      | 'equipoVisitanteTitulares'
      | 'equipoVisitanteSuplentes'
      | 'eventos'
      | 'estadisticas'

export type PartidoPrimitives = {
      [Key in PartidoFields]: Key extends
            | 'id'
            | 'local'
            | 'visitante'
            | 'competicion'
            | 'fecha'
            ? string
            : Key extends 'temporada' | 'jornada'
            ? number
            : Key extends 'eventos' | 'estadisticas'
            ? object[]
            : string[]
}

type Evento = {
      tipoEvento: string
      minuto: number
      jugador: string
      equipo: string
}

type Estadistica = {
      tipoEstadistica: string
      local: string
      visitante: string
}

export type ValuesEstadisticas = `${Estadisticas}`

export type PartidoOutput = {
      [Key in PartidoFields]: Key extends 'id' | 'competicion' | 'fecha'
            ? string
            : Key extends 'temporada' | 'jornada'
            ? number
            : Key extends 'eventos'
            ? Evento[]
            : Key extends 'estadisticas'
            ? Estadistica[]
            : Key extends 'local' | 'visitante'
            ? EquipoOutput
            : JugadorOutput[]
}
