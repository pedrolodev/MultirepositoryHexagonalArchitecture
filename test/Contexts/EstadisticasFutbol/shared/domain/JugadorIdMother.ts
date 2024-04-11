import { JugadorId } from '../../../../../src/Contexts/EstadisticasFutbol/shared/domain/Jugadores/JugadorId'
import { UuidMother } from '../../../../../test/Contexts/shared/domain/value-object/UuidMother'

export class JugadorIdMother {
      static create(value: string): JugadorId {
            return new JugadorId(value)
      }

      static random(): JugadorId {
            return this.create(UuidMother.random().toString())
      }
}
