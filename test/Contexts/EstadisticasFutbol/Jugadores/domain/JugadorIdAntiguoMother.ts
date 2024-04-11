
import { JugadorIdAntiguo } from '../../../../../src/Contexts/EstadisticasFutbol/Jugadores/domain/JugadorIdAntiguo'
import { StringMother } from '../../../shared/domain/StringMother'

export class JugadorIdAntiguoMother {
      static create (value: string): JugadorIdAntiguo {
            return new JugadorIdAntiguo(value)
      }

      static random (): JugadorIdAntiguo {
            return this.create(StringMother.fullName())
      }
}
