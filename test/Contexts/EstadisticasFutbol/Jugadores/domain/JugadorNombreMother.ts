import { JugadorNombre } from '../../../../../src/Contexts/EstadisticasFutbol/Jugadores/domain/JugadorNombre'
import { StringMother } from '../../../shared/domain/StringMother'

export class JugadorNombreMother {
      static create (value: string): JugadorNombre {
            return new JugadorNombre(value)
      }

      static random (): JugadorNombre {
            return this.create(StringMother.fullName())
      }
}
