import { MinutoEvento } from '../../../../../../src/Contexts/EstadisticasFutbol/Partidos/domain/partidoEvento/MinutoEvento'
import { NumberMother } from '../../../../shared/domain/NumberMother'

export class MinutoEventoMother {
      static create (value: number): MinutoEvento {
            return new MinutoEvento(value)
      }

      static random (): MinutoEvento {
            return this.create(NumberMother.random(1, 90))
      }
}
