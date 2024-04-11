import { PartidoFecha } from '../../../../../src/Contexts/EstadisticasFutbol/Partidos/domain/PartidoFecha'
import { DateMother } from '../../../shared/domain/DateMother'

export class PartidoFechaMother {
      static create (value: string): PartidoFecha {
            return new PartidoFecha(value)
      }

      static random (): PartidoFecha {
            return this.create(DateMother.random().toISOString())
      }
}
