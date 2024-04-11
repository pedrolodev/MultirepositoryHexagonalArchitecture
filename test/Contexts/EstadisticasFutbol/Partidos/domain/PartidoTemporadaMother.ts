import { PartidoTemporada } from '../../../../../src/Contexts/EstadisticasFutbol/Partidos/domain/PartidoTemporada'
import { NumberMother } from '../../../shared/domain/NumberMother'

export class PartidoTemporadaMother {
      static create (value: number): PartidoTemporada {
            return new PartidoTemporada(value)
      }

      static random (): PartidoTemporada {
            return this.create(NumberMother.random(1900, 2023))
      }
}
