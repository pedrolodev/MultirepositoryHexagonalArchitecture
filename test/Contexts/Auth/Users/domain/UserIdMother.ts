import { UserId } from '@src/Contexts/Auth/Users/domain/UserId'
import { UuidMother } from '../../../shared/domain/value-object/UuidMother'

export class UserIdMother {
      static create(value: string): UserId {
            return new UserId(value)
      }

      static random(): UserId {
            return this.create(UuidMother.random().toString())
      }
}
