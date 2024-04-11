import { Uuid } from '../../../../../src/Contexts/shared/domain/value-object/Uuid'

export class UuidMother {
      static random (): Uuid {
            return Uuid.random()
      }
}
