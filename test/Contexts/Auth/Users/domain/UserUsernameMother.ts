import { UserUsername } from '@src/Contexts/Auth/Users/domain/UserUsername'
import { StringMother } from '../../../shared/domain/StringMother'

export class UserUsernameMother {
      static create(value: string): UserUsername {
            return new UserUsername(value)
      }

      static random(): UserUsername {
            return this.create(StringMother.userName())
      }
}
