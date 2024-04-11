import { PartidoTitulares } from '../../../../../src/Contexts/EstadisticasFutbol/Partidos/domain/PartidoTitulares'
import { Repeater } from '../../../shared/domain/Repeater'
import { UuidMother } from '../../../shared/domain/value-object/UuidMother'

export class PartidoTitularesMother {
      static create(value: Array<string>): PartidoTitulares {
            return new PartidoTitulares(value)
      }

      static random(): PartidoTitulares {
            return this.create(
                  Repeater.random(() => UuidMother.random().toString(), 11)
            )
      }
}
