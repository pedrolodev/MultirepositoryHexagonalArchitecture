import { Repository } from '../../../../../../src/Contexts/shared/domain/Repository'
import { User } from '../User'
import { MatchFilter } from '../../../../../../src/Contexts/shared/domain/criteria/filter/categories/MatchFilter'
import { Criteria } from '../../../../../../src/Contexts/shared/domain/criteria/Criteria'
import { Filters } from '../../../../../../src/Contexts/shared/domain/criteria/filter/Filters'

export default class UserFinder {
      constructor(private repository: Repository<User>) {}

      async find(
            username: string
      ): Promise<{ id: string; username: string } | undefined> {
            const matchFilter = MatchFilter.fromValues({
                  field: 'username',
                  operator: 'EQUAL',
                  value: username
            })
            const filters = new Filters([matchFilter])
            const response = await this.repository.matching(
                  new Criteria(filters)
            )
            if (response.length === 0) return undefined
            return response[0]
      }
}
