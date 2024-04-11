import { PartidoSuplentes } from '../../../../../src/Contexts/EstadisticasFutbol/Partidos/domain/PartidoSuplentes'
import { Repeater } from '../../../shared/domain/Repeater'
import { UuidMother } from '../../../shared/domain/value-object/UuidMother'

export class PartidoSuplentesMother {
      static create(value: Array<string>): PartidoSuplentes {
            return new PartidoSuplentes(value)
      }

      static random(): PartidoSuplentes {
            return this.create(
                  Repeater.random(() => UuidMother.random().toString(), 14)
            )
      }
}
