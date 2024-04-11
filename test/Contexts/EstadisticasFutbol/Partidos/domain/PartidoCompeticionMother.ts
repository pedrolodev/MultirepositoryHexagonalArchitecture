import { PartidoCompeticion } from '../../../../../src/Contexts/EstadisticasFutbol/Partidos/domain/PartidoCompeticion'
import { StringMother } from '../../../shared/domain/StringMother'

export class PartidoCompeticionMother {
      static create (value: string): PartidoCompeticion {
            return new PartidoCompeticion(value)
      }

      static random (): PartidoCompeticion {
            return this.create(StringMother.competitionName())
      }
}
