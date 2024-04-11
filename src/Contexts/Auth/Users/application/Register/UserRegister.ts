import { Repository } from '../../../../../../src/Contexts/shared/domain/Repository'
import { User, UserPrimitives } from '../../domain/User'
import { UserId } from '../../domain/UserId'
import { UserUsername } from '../../domain/UserUsername'
import { UserPassword } from '../../domain/UserPassword'
import UserFinder from '../../domain/services/UserFinder'
import { UserExist } from '../../domain/errors/UserExist.error'

export class UserRegister {
      constructor(private repository: Repository<User>) {}

      async run(params: UserPrimitives): Promise<void> {
            const { id, username, password } = params

            const userFinder = new UserFinder(this.repository)
            const existUser = await userFinder.find(username)
            if (existUser) throw new UserExist()

            const userId = new UserId(id)
            const userUsername = new UserUsername(username)
            const userPassword = new UserPassword(password)

            const user = new User(userId, userUsername, userPassword)
            await this.repository.save(user)
      }
}
