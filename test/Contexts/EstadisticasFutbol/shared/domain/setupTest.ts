import { Jugador } from '../../../../../src/Contexts/EstadisticasFutbol/Jugadores/domain/Jugador'
import { Partido, PartidoPrimitives } from '../../../../../src/Contexts/EstadisticasFutbol/Partidos/domain/Partido'
import { Equipo } from '../../../../../src/Contexts/EstadisticasFutbol/Equipos/domain/Equipo'
import { Repeater } from '../../../shared/domain/Repeater'
import { JugadorMother } from '../../Jugadores/domain/JugadorMother'
import { PartidoMother } from '../../Partidos/domain/PartidoMother'
import { EquipoMother } from '../../Equipos/domain/EquipoMother'
import { RandomNumber } from '../../../../../src/Contexts/shared/infraestructure/utils/Random/RandomNumber'

export const jugadores : Jugador[] = Repeater.random(
      () => JugadorMother.random(),
      RandomNumber(50, 50)
)

export const equipos : Equipo[] = Repeater.random(
      () => EquipoMother.random(),
      RandomNumber(10, 20))

export const partidos : Partido[] = Repeater.random(
      () => PartidoMother.createWithPlayersAndTeamsThatExists(jugadores, equipos),
      RandomNumber(40, 60)
)

export const partidosFromCliente: PartidoPrimitives[] = partidos.map(partido => {
      return PartidoMother.fromClient(partido, jugadores, equipos)
})
