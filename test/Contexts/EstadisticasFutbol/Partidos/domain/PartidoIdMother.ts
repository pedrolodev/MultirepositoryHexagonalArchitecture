import { PartidoId } from '../../../../../src/Contexts/EstadisticasFutbol/Partidos/domain/PartidoId'
import { UuidMother } from '../../../shared/domain/value-object/UuidMother'

export class PartidoIdMother {
      static create(value: string): PartidoId {
            return new PartidoId(value)
      }

      static random(): PartidoId {
            return this.create(UuidMother.random().toString())
      }
}
