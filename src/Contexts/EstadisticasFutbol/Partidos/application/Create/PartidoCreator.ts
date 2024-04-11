import { Criteria } from '../../../../shared/domain/criteria/Criteria'
import { Filters } from '../../../../shared/domain/criteria/filter/Filters'
import { EquipoNotExist } from '../../../Equipos/domain/errors/EquipoNotExist.error'
import TeamFinder from '../../../Equipos/domain/services/TeamFinder'
import { JugadorNotExist } from '../../../Jugadores/domain/errors/JugadorNotExist.error'
import JugadorFinder from '../../../Jugadores/domain/services/JugadorFinder'
import { PartidoId } from '../../../Partidos/domain/PartidoId'
import { PartidoJornada } from '../../../Partidos/domain/PartidoJornada'
import { EquipoId } from '../../../shared/domain/Equipos/EquipoId'
import { Repository } from '../../../../shared/domain/Repository'
import { PartidoAlreadyExist } from '../../domain/errors/PartidoAlreadyExist'
import { Partido, PartidoPrimitives } from '../../domain/Partido'
import { PartidoCompeticion } from '../../domain/PartidoCompeticion'
import { PartidoListaEstadisticas } from '../../domain/partidoEstadistica/PartidoListaEstadisticas'
import { PartidoEventoType } from '../../domain/partidoEvento/PartidoEvento'
import { PartidoListaEventos } from '../../domain/partidoEvento/PartidoListaEventos'
import { PartidoFecha } from '../../domain/PartidoFecha'
import { PartidoSuplentes } from '../../domain/PartidoSuplentes'
import { PartidoTemporada } from '../../domain/PartidoTemporada'
import { PartidoTitulares } from '../../domain/PartidoTitulares'

export class PartidoCreator {
      constructor(
            private repository: Repository<Partido>,
            private jugadorFinder: JugadorFinder,
            private teamFinder: TeamFinder
      ) {}

      async run(params: PartidoPrimitives): Promise<void> {
            const {
                  id,
                  local,
                  visitante,
                  competicion,
                  temporada,
                  jornada,
                  fecha,
                  equipoLocalTitulares,
                  equipoLocalSuplentes,
                  equipoVisitanteTitulares,
                  equipoVisitanteSuplentes,
                  eventos,
                  estadisticas
            } = params
            // CHECK IF PLAYERS EXIST, llega el nombre y devuelve el id del jugador que existe en db
            const localTitulares = await this.obtenerIdsJugadores(
                  equipoLocalTitulares
            )
            const localSuplentes = await this.obtenerIdsJugadores(
                  equipoLocalSuplentes
            )
            const visitanteTitulares = await this.obtenerIdsJugadores(
                  equipoVisitanteTitulares
            )
            const visitanteSuplentes = await this.obtenerIdsJugadores(
                  equipoVisitanteSuplentes
            )

            // CHECK IF TEAMS EXIST, llega el nombre y devuelve el id
            const localEquipoId = await this.obtainIdTeamsWithNames(local)
            const visitanteEquipoId = await this.obtainIdTeamsWithNames(
                  visitante
            )

            // mapear el nombre y equipo en los eventos al id
            const eventosMapeadosPromesas = await this.mappingNamesToIds(
                  eventos as PartidoEventoType[]
            )
            const eventosMapeados = await Promise.all(eventosMapeadosPromesas)

            const partidoId = new PartidoId(id)
            const partidoEquipoLocal = new EquipoId(localEquipoId)
            const partidoEquipoVisitante = new EquipoId(visitanteEquipoId)
            const partidoCompeticion = new PartidoCompeticion(competicion)
            const partidoTemporada = new PartidoTemporada(temporada)
            const partidoJornada = new PartidoJornada(jornada)
            const partidoFecha = new PartidoFecha(fecha)
            const partidoEquipoLocalTitulares = new PartidoTitulares(
                  localTitulares
            )
            const partidoEquipoLocalSuplentes = new PartidoSuplentes(
                  localSuplentes
            )
            const partidoEquipoVisitanteTitulares = new PartidoTitulares(
                  visitanteTitulares
            )
            const partidoEquipoVisitanteSuplentes = new PartidoSuplentes(
                  visitanteSuplentes
            )
            const partidoEventos = new PartidoListaEventos(eventosMapeados)
            const partidoEstadisticas = new PartidoListaEstadisticas(
                  estadisticas
            )
            const partido = new Partido(
                  partidoId,
                  partidoEquipoLocal,
                  partidoEquipoVisitante,
                  partidoCompeticion,
                  partidoTemporada,
                  partidoJornada,
                  partidoFecha,
                  partidoEquipoLocalTitulares,
                  partidoEquipoLocalSuplentes,
                  partidoEquipoVisitanteTitulares,
                  partidoEquipoVisitanteSuplentes,
                  partidoEventos,
                  partidoEstadisticas
            )

            // CHECK IF MATCH EXIST, mismo local, visitante,temporada y jornada
            const criteria = new Criteria(
                  Filters.fromValues([
                        {
                              type: 'match',
                              field: 'local',
                              operator: 'EQUAL',
                              value: localEquipoId
                        },
                        {
                              type: 'match',
                              field: 'visitante',
                              operator: 'EQUAL',
                              value: visitanteEquipoId
                        },
                        {
                              type: 'match',
                              field: 'competicion',
                              operator: 'EQUAL',
                              value: competicion
                        },
                        {
                              type: 'match',
                              field: 'temporada',
                              operator: 'EQUAL',
                              value: temporada
                        }
                  ])
            )
            const matchExist = await this.repository.matching(criteria)
            if (matchExist.length > 0) throw new PartidoAlreadyExist()

            await this.repository.save(partido)
      }

      private async obtenerIdsJugadores(nombresJugadores: Array<string>) {
            const jugadores = await Promise.all(
                  nombresJugadores.map((name) =>
                        this.jugadorFinder.search({ name })
                  )
            )
            const ids = jugadores.map((jugador) => {
                  if (jugador[0].id === undefined) throw new JugadorNotExist()
                  return jugador[0].id.toString()
            })
            return ids
      }

      private async obtainIdTeamsWithNames(name: string) {
            const teams = await this.teamFinder.search({ name })
            if (teams.length === 0) throw new EquipoNotExist()
            return teams[0].id.toString()
      }

      private async mappingNamesToIds(eventos: PartidoEventoType[]) {
            return eventos.map(async (evento) => {
                  const jugadorNombre = evento.jugador
                  const j = await this.jugadorFinder.search({
                        name: jugadorNombre
                  })
                  const equipoNombre = evento.equipo
                  const e = await this.teamFinder.search({ name: equipoNombre })
                  return Object.assign(evento, {
                        jugador: j[0].id.toString(),
                        equipo: e[0].id.toString()
                  })
            })
      }
}
