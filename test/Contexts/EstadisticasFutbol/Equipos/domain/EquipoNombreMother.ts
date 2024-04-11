import { EquipoNombre } from '../../../../../src/Contexts/EstadisticasFutbol/Equipos/domain/EquipoNombre'
import { StringMother } from '../../../shared/domain/StringMother'

export class EquipoNombreMother {
      static create (value: string): EquipoNombre {
            return new EquipoNombre(value)
      }

      static random (): EquipoNombre {
            return this.create(StringMother.teamName())
      }
}
