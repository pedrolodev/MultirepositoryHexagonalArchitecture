import { EquipoId } from '../../../../../src/Contexts/EstadisticasFutbol/shared/domain/Equipos/EquipoId'
import { UuidMother } from '../../../shared/domain/value-object/UuidMother'

export class PartidoEquipoMother {
      static create(value: string): EquipoId {
            return new EquipoId(value)
      }

      static random(): EquipoId {
            return this.create(UuidMother.random().toString())
      }
}
