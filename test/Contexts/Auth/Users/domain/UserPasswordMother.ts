import { StringMother } from '../../../shared/domain/StringMother'
import { UserPassword } from '@src/Contexts/Auth/Users/domain/UserPassword'

export class UserPasswordMother {
      static create(value: string): UserPassword {
            return new UserPassword(value)
      }

      static random(): UserPassword {
            return this.create(StringMother.password())
      }
}
