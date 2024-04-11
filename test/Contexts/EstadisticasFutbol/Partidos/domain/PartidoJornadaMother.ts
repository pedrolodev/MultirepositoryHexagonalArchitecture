import { PartidoJornada } from '../../../../../src/Contexts/EstadisticasFutbol/Partidos/domain/PartidoJornada'
import { NumberMother } from '../../../shared/domain/NumberMother'

export class PartidoJornadaMother {
      static create (value: number): PartidoJornada {
            return new PartidoJornada(value)
      }

      static random (): PartidoJornada {
            return this.create(NumberMother.random(1, 38))
      }
}
