import { Partido, PartidoPrimitives } from '../../../../../src/Contexts/EstadisticasFutbol/Partidos/domain/Partido'
import { PartidoFecha } from '../../../../../src/Contexts/EstadisticasFutbol/Partidos/domain/PartidoFecha'
import { PartidoId } from '../../../../../src/Contexts/EstadisticasFutbol/Partidos/domain/PartidoId'
import { PartidoJornada } from '../../../../../src/Contexts/EstadisticasFutbol/Partidos/domain/PartidoJornada'
import { PartidoFechaMother } from './PartidoFechaMother'
import { PartidoIdMother } from './PartidoIdMother'
import { PartidoCompeticionMother } from './PartidoCompeticionMother'
import { PartidoJornadaMother } from './PartidoJornadaMother'
import { PartidoTitulares } from '../../../../../src/Contexts/EstadisticasFutbol/Partidos/domain/PartidoTitulares'
import { PartidoTitularesMother } from './PartidoTitularesMother'
import { PartidoSuplentesMother } from './PartidoSuplentesMother'
import { PartidoSuplentes } from '../../../../../src/Contexts/EstadisticasFutbol/Partidos/domain/PartidoSuplentes'
import { EquipoId } from '../../../../../src/Contexts/EstadisticasFutbol/shared/domain/Equipos/EquipoId'
import { PartidoTemporada } from '../../../../../src/Contexts/EstadisticasFutbol/Partidos/domain/PartidoTemporada'
import { PartidoListaEventos } from '../../../../../src/Contexts/EstadisticasFutbol/Partidos/domain/partidoEvento/PartidoListaEventos'
import { PartidoListaEstadisticas } from '../../../../../src/Contexts/EstadisticasFutbol/Partidos/domain/partidoEstadistica/PartidoListaEstadisticas'
import { PartidoEquipoMother } from './PartidoEquipoMother'
import { PartidoTemporadaMother } from './PartidoTemporadaMother'
import { PartidoListaEventosMother } from './partidoEvento/PartidoListaEventosMother'
import { PartidoListaEstadisticasMother } from './partidoEstadistica/PartidoListaEstadisticasMother'
import { Jugador } from '../../../../../src/Contexts/EstadisticasFutbol/Jugadores/domain/Jugador'
import { randomArrayElements, RandomNumber } from '../../../../../src/Contexts/shared/infraestructure/utils/Random'
import { Equipo } from '../../../../../src/Contexts/EstadisticasFutbol/Equipos/domain/Equipo'
import { EquipoIdMother } from '../../shared/domain/EquipoIdMother'
import { PartidoCompeticion } from '../../../../../src/Contexts/EstadisticasFutbol/Partidos/domain/PartidoCompeticion'

export class PartidoMother {
      static create (
            id: PartidoId,
            local: EquipoId,
            visitante: EquipoId,
            competicion: PartidoCompeticion,
            temporada: PartidoTemporada,
            jornada: PartidoJornada,
            fecha: PartidoFecha,
            equipoLocalTitulares: PartidoTitulares,
            equipoLocalSuplentes: PartidoSuplentes,
            equipoVisitanteTitulares: PartidoTitulares,
            equipoVisitanteSuplentes: PartidoSuplentes,
            eventos: PartidoListaEventos,
            estadisticas: PartidoListaEstadisticas): Partido {
            return new Partido(id,
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
                  estadisticas)
      }

      static random (): Partido {
            return this.create(
                  PartidoIdMother.random(),
                  PartidoEquipoMother.random(),
                  PartidoEquipoMother.random(),
                  PartidoCompeticionMother.random(),
                  PartidoTemporadaMother.random(),
                  PartidoJornadaMother.random(),
                  PartidoFechaMother.random(),
                  PartidoTitularesMother.random(),
                  PartidoSuplentesMother.random(),
                  PartidoTitularesMother.random(),
                  PartidoSuplentesMother.random(),
                  PartidoListaEventosMother.random(),
                  PartidoListaEstadisticasMother.random()
            )
      }

      static toJson (value:Partido):object {
            return JSON.parse(JSON.stringify(value.toPrimitives()))
      }

      static arrayToJson (values:Partido[]):object[] {
            return values.map(partido => this.toJson(partido))
      }

      static createWithTemporada (_temporada:number):Partido {
            return Object.assign(this.random(), { temporada: PartidoTemporadaMother.create(_temporada) })
      }

      static createWithJornada (_jornada:number):Partido {
            return Object.assign(this.random(), { jornada: PartidoJornadaMother.create(_jornada) })
      }

      static createWithFechaYear (year:string, month:string, day:string):Partido {
            const fechaWithYear = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day))).toISOString()
            return Object.assign(this.random(), { fecha: PartidoFechaMother.create(fechaWithYear) })
      }

      static createWithPlayersAndTeamsThatExists (_jugadores:Jugador[], _equipos:Equipo[]):Partido {
            const jugadores = randomArrayElements(_jugadores, 22 + 26).map(jugador => {
                  return jugador.id.value
            })

            const equipos = randomArrayElements(_equipos, 2).map(equipo => {
                  return equipo.id.value
            })
            const partido = this.random()
            return Object.assign(
                  partido,
                  { local: EquipoIdMother.create(randomArrayElements(equipos, 1, false).pop() as string) },
                  { visitante: EquipoIdMother.create(randomArrayElements(equipos, 1, false).pop() as string) },
                  { equipoLocalTitulares: PartidoTitularesMother.create(randomArrayElements(jugadores, 22 / 2, false)) },
                  { equipoLocalSuplentes: PartidoSuplentesMother.create(randomArrayElements(jugadores, 26 / 2, false)) },
                  { equipoVisitanteTitulares: PartidoTitularesMother.create(randomArrayElements(jugadores, 22 / 2, false)) },
                  { equipoVisitanteSuplentes: PartidoSuplentesMother.create(randomArrayElements(jugadores, 26 / 2, false)) },
                  {
                        eventos: PartidoListaEventosMother.create(partido.eventos.value.map(evento => {
                              const jugadorId = _jugadores[RandomNumber(0, jugadores.length - 1)].id.value
                              const equipoId = _equipos[RandomNumber(0, equipos.length - 1)].id.value

                              return { tipoEvento: evento.tipoEvento.value, minuto: evento.minuto.value, jugador: jugadorId, equipo: equipoId }
                        }))
                  }

            )
      }

      static fromClient (partido:Partido, _jugadores:Jugador[], _equipos:Equipo[]):PartidoPrimitives {
            const partidoPrimitives = Object.assign({}, partido.toPrimitives())
            const partidoEventos = partido.eventos.toPrimitives().map((evento:any) => {
                  // const j = jugadoresPartido[RandomNumber(0, jugadoresPartido.length - 1)]
                  const jugador = Object.assign({}, _jugadores.find(listado => {
                        return listado.id.value === evento.jugador
                  })?.toPrimitives()).name
                  const equipo = Object.assign({}, _equipos.find(listado => {
                        return listado.id.value === evento.equipo
                  })?.toPrimitives()).name
                  const nuevoEvento = Object.assign({}, evento)
                  return Object.assign(nuevoEvento, { jugador, equipo })
            })

            return Object.assign(
                  partidoPrimitives,
                  { local: _equipos.find(equipo => partido.local.value === equipo.id.value)?.name.value },
                  { visitante: _equipos.find(equipo => partido.visitante.value === equipo.id.value)?.name.value },
                  { equipoLocalTitulares: partido.equipoLocalTitulares.toPrimitives().map(j => _jugadores.find(listado => listado.id.value === j)?.name.value) },
                  { equipoLocalSuplentes: partido.equipoLocalSuplentes.toPrimitives().map(j => _jugadores.find(listado => listado.id.value === j)?.name.value) },
                  { equipoVisitanteTitulares: partido.equipoVisitanteTitulares.toPrimitives().map(j => _jugadores.find(listado => listado.id.value === j)?.name.value) },
                  { equipoVisitanteSuplentes: partido.equipoVisitanteSuplentes.toPrimitives().map(j => _jugadores.find(listado => listado.id.value === j)?.name.value) },
                  {
                        eventos: [...partidoEventos]
                  }

            )
      }
}
