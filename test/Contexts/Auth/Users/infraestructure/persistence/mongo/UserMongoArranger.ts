import { User } from '@src/Contexts/Auth/Users/domain/User'
import { Repository } from '../../../../../../../src/Contexts/shared/domain/Repository'
import { Repeater } from '../../../../../shared/domain/Repeater'
import { UserMother } from '../../../domain/UserMother'

export default class UserMongoArranger {
      constructor(private repository: Repository<User>) {}

      async initData(times: number): Promise<User[]> {
            const users: User[] = Repeater.random(
                  () => UserMother.random(),
                  times
            )
            await this.repository.saveMany(users)
            return users
      }

      async initConcretData(partidos: User[]): Promise<void> {
            await this.repository.saveMany(partidos)
      }
}
