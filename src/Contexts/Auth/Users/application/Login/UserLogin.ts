import { MatchFilter } from '../../../../../../src/Contexts/shared/domain/criteria/filter/categories/MatchFilter'
import { Criteria } from '../../../../shared/domain/criteria/Criteria'
import { Filters } from '../../../../shared/domain/criteria/filter/Filters'

import { Repository } from '../../../../shared/domain/Repository'
import { User } from '../../domain/User'
import { UserIncorrect } from '../../domain/errors/UserIncorrect.error'
import createToken from '../../../../../../src/Contexts/Auth/shared/infraestructure/autentication/createToken'
import { UserDuplicate } from '../../domain/errors/UserDuplicate.error'

export class UserLogin {
      constructor(private repository: Repository<User>) {}

      async run(username: string, password: string): Promise<any> {
            const filters = new Filters([
                  MatchFilter.fromValues({
                        field: 'username',
                        operator: 'EQUAL',
                        value: username
                  }),
                  MatchFilter.fromValues({
                        field: 'password',
                        operator: 'EQUAL',
                        value: password
                  })
            ])

            const criteria = new Criteria(filters)
            const user = await this.repository.matching(criteria)
            if (user.length > 1) throw new UserDuplicate()
            if (user.length === 0) throw new UserIncorrect()
            const userOutput = user[0]
            userOutput.token = createToken(userOutput.id, userOutput.username)
            return userOutput
      }
}
