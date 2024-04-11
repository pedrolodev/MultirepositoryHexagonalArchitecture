import { AggregateMapper } from '../../../shared/domain/AggregateMapper'
import MapperEquipo from '../../Equipos/domain/MapperEquipo'
import MapperJugador from '../../Jugadores/domain/MapperJugador'
import { EquipoId } from '../../shared/domain/Equipos/EquipoId'
import { JugadorOutput } from '../../types/Jugadores/jugador'
import { PartidoOutput } from '../../types/Partidos/partido'
import { Partido, PartidoPrimitives } from './Partido'
import { PartidoCompeticion } from './PartidoCompeticion'
import { PartidoListaEstadisticas } from './partidoEstadistica/PartidoListaEstadisticas'
import { PartidoListaEventos } from './partidoEvento/PartidoListaEventos'
import { PartidoFecha } from './PartidoFecha'
import { PartidoId } from './PartidoId'
import { PartidoJornada } from './PartidoJornada'
import { PartidoSuplentes } from './PartidoSuplentes'
import { PartidoTemporada } from './PartidoTemporada'
import { PartidoTitulares } from './PartidoTitulares'

const mapperJugador = new MapperJugador()
const mapperEquipo = new MapperEquipo()

export default class MapperPartido implements AggregateMapper {
      fromPrimitives(plainData: PartidoPrimitives): Partido {
            return new Partido(
                  new PartidoId(plainData.id),
                  new EquipoId(plainData.local),
                  new EquipoId(plainData.visitante),
                  new PartidoCompeticion(plainData.competicion),
                  new PartidoTemporada(plainData.temporada),
                  new PartidoJornada(plainData.jornada),
                  new PartidoFecha(plainData.fecha),
                  new PartidoTitulares(plainData.equipoLocalTitulares),
                  new PartidoSuplentes(plainData.equipoLocalSuplentes),
                  new PartidoTitulares(plainData.equipoVisitanteTitulares),
                  new PartidoSuplentes(plainData.equipoVisitanteSuplentes),
                  new PartidoListaEventos(plainData.eventos),
                  new PartidoListaEstadisticas(plainData.estadisticas)
            )
      }

      // REFACTORIZAR, ESTE ES PARA MONGO
      toOutput(data: PartidoOutput): any {
            const {
                  id,
                  local,
                  visitante,
                  jornada,
                  temporada,
                  competicion,
                  equipoLocalSuplentes,
                  equipoLocalTitulares,
                  equipoVisitanteSuplentes,
                  equipoVisitanteTitulares,
                  estadisticas,
                  eventos,
                  fecha
            } = data

            const output: Partial<PartidoOutput> = {}

            if (id !== undefined) output.id = id
            if (typeof local === 'object')
                  output.local = mapperEquipo.toOutput(local)
            if (typeof visitante === 'object')
                  output.visitante = mapperEquipo.toOutput(visitante)

            if (temporada !== undefined) output.temporada = temporada
            if (jornada !== undefined) output.jornada = jornada
            if (competicion !== undefined) output.competicion = competicion
            if (fecha !== undefined) output.fecha = fecha

            if (equipoLocalTitulares !== undefined) {
                  output.equipoLocalTitulares =
                        this.jugadoresToOutput(equipoLocalTitulares)
            }

            if (equipoLocalSuplentes !== undefined) {
                  output.equipoLocalSuplentes =
                        this.jugadoresToOutput(equipoLocalSuplentes)
            }

            if (equipoVisitanteTitulares !== undefined) {
                  output.equipoVisitanteTitulares = this.jugadoresToOutput(
                        equipoVisitanteTitulares
                  )
            }

            if (equipoVisitanteSuplentes !== undefined) {
                  output.equipoVisitanteSuplentes = this.jugadoresToOutput(
                        equipoVisitanteSuplentes
                  )
            }

            if (eventos !== undefined) output.eventos = eventos
            if (estadisticas !== undefined) output.estadisticas = estadisticas

            return output
      }

      jugadoresToOutput(jugadores: Array<JugadorOutput>): any {
            if (jugadores !== undefined) {
                  return jugadores.map((jugador) => {
                        if (typeof jugador === 'object') {
                              return mapperJugador.toOutput(jugador)
                        }
                        return jugador
                  }) as any
            }
      }
}
