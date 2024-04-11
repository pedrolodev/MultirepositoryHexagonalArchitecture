import { Jugador } from '../../../../../src/Contexts/EstadisticasFutbol/Jugadores/domain/Jugador'
import { JugadorIdAntiguo } from '../../../../../src/Contexts/EstadisticasFutbol/Jugadores/domain/JugadorIdAntiguo'
import { JugadorNombre } from '../../../../../src/Contexts/EstadisticasFutbol/Jugadores/domain/JugadorNombre'
import { JugadorId } from '../../../../../src/Contexts/EstadisticasFutbol/shared/domain/Jugadores/JugadorId'
import { JugadorIdMother } from '../../../../../test/Contexts/EstadisticasFutbol/shared/domain/JugadorIdMother'
import { JugadorNombreMother } from './JugadorNombreMother'
import { JugadorIdAntiguoMother } from './JugadorIdAntiguoMother'

export class JugadorMother {
      static create (
            id: JugadorId,
            idAntiguo: JugadorIdAntiguo,
            name: JugadorNombre): Jugador {
            return new Jugador(id,
                  idAntiguo,
                  name)
      }

      static random (): Jugador {
            return this.create(
                  JugadorIdMother.random(),
                  JugadorIdAntiguoMother.random(),
                  JugadorNombreMother.random()
            )
      }
}
