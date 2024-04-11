import { EquipoIdAntiguo } from '../../../../../src/Contexts/EstadisticasFutbol/Equipos/domain/EquipoIdAntiguo'
import { StringMother } from '../../../shared/domain/StringMother'

export class EquipoIdAntiguoMother {
      static create (value: string): EquipoIdAntiguo {
            return new EquipoIdAntiguo(value)
      }

      static random (): EquipoIdAntiguo {
            return this.create(StringMother.teamName())
      }
}
