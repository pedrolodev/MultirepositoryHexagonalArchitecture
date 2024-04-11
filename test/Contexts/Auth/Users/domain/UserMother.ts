import { UserId } from '@src/Contexts/Auth/Users/domain/UserId'
import { UserUsername } from '@src/Contexts/Auth/Users/domain/UserUsername'
import { UserPassword } from '@src/Contexts/Auth/Users/domain/UserPassword'
import { User, UserOutput } from '@src/Contexts/Auth/Users/domain/User'
import { UserIdMother } from './UserIdMother'
import { UserUsernameMother } from './UserUsernameMother'
import { UserPasswordMother } from './UserPasswordMother'
import createToken from '@src/Contexts/Auth/shared/infraestructure/autentication/createToken'

export class UserMother {
      static create(
            id: UserId,
            username: UserUsername,
            password: UserPassword
      ): User {
            return new User(id, username, password)
      }

      static random(): User {
            return this.create(
                  UserIdMother.random(),
                  UserUsernameMother.random(),
                  UserPasswordMother.random()
            )
      }

      static toOutput(user: User): UserOutput {
            const id = user.id.value
            const username = user.username.value
            return {
                  id,
                  username,
                  token: createToken(id, username)
            }
      }
}
