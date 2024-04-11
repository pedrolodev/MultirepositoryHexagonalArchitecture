import { AggregateRoot } from '../../../shared/domain/AggregateRoot'
import { UserId } from './UserId'
import { UserUsername } from './UserUsername'
import { UserPassword } from './UserPassword'

export interface UserPrimitives {
      id: string
      username: string
      password: string
}

export interface UserOutput {
      id: string
      username: string
      token: string
}

export class User implements AggregateRoot {
      constructor(
            readonly id: UserId,
            readonly username: UserUsername,
            readonly password: UserPassword
      ) {}

      toPrimitives(): UserPrimitives {
            return {
                  id: this.id.value,
                  username: this.username.value,
                  password: this.password.value
            }
      }
}
