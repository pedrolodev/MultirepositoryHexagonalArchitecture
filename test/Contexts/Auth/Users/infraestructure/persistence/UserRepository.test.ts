import {
      container,
      containerIsStarted
} from '@src/apps/shared/backend/dependency-injection'
import { EnvironmentArranger } from '../../../../shared/infraestructure/persistence/arranger/EnvironmentArranger'
import { Repository } from '@src/Contexts/shared/domain/Repository'
import { Criteria } from '../../../../../../src/Contexts/shared/domain/criteria/Criteria'
import { Filters } from '../../../../../../src/Contexts/shared/domain/criteria/filter/Filters'
import { UserMother } from '../../domain/UserMother'
import { User } from '@src/Contexts/Auth/Users/domain/User'
import { MatchFilter } from '@src/Contexts/shared/domain/criteria/filter/categories/MatchFilter'

let repository: Repository<User>
let environmentArranger: EnvironmentArranger

describe('UserRepository', () => {
      beforeAll(async () => {
            await containerIsStarted
            repository = container.get('auth.user.repository')
            environmentArranger = container.get(
                  'auth.shared.environmentArranger'
            )
            await environmentArranger.arrange()
      })

      afterAll(async () => {
            await environmentArranger.close()
      })

      describe('#save', () => {
            const users = [
                  UserMother.random(),
                  UserMother.random(),
                  UserMother.random()
            ]
            const user = UserMother.random()
            it('should save a user', async () => {
                  await repository.save(user)
            })

            it('should save various users', async () => {
                  await repository.saveMany(users)
            })

            it('should search a user', async () => {
                  const criteria = new Criteria(
                        new Filters([
                              MatchFilter.fromValues({
                                    field: 'username',
                                    operator: 'EQUAL',
                                    value: user.username.value
                              })
                        ])
                  )
                  const userSaved = await repository.matching(criteria)
                  expect(userSaved.length).toBe(1)
            })

            it('should search all users', async () => {
                  const usersSaved = await repository.matching({} as Criteria)
                  // expect([...equipos, equipo]).toEqual(expect.arrayContaining(equiposGuardados))
                  expect([...users, user].length).toBe(usersSaved.length)
            })
      })
})
