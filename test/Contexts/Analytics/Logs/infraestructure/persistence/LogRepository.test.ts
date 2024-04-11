import {
      container,
      containerIsStarted
} from '@src/apps/shared/backend/dependency-injection'
import { EnvironmentArranger } from '../../../../shared/infraestructure/persistence/arranger/EnvironmentArranger'
import { Repository } from '@src/Contexts/shared/domain/Repository'
import { Criteria } from '../../../../../../src/Contexts/shared/domain/criteria/Criteria'
import { Filters } from '../../../../../../src/Contexts/shared/domain/criteria/filter/Filters'
import { MatchFilter } from '@src/Contexts/shared/domain/criteria/filter/categories/MatchFilter'
import { Log } from '@src/Contexts/Analytics/Logs/domain/Log'
import { LogMother } from '../../domain/LogMother'

let repository: Repository<Log>
let environmentArranger: EnvironmentArranger

describe('LogRepository', () => {
      beforeAll(async () => {
            await containerIsStarted
            repository = container.get('analytics.logs.repository')
            environmentArranger = container.get(
                  'analytics.shared.environmentArranger'
            )
            await environmentArranger.arrange()
      })

      afterAll(async () => {
            await environmentArranger.close()
      })

      describe('#save', () => {
            const logs = [
                  LogMother.random(),
                  LogMother.random(),
                  LogMother.random()
            ]
            const log = LogMother.random()
            it('should save a log', async () => {
                  await repository.save(log)
            })

            it('should save various users', async () => {
                  await repository.saveMany(logs)
            })

            it('should search a log by IP', async () => {
                  const criteria = new Criteria(
                        new Filters([
                              MatchFilter.fromValues({
                                    field: 'ip',
                                    operator: 'EQUAL',
                                    value: log.ip.value
                              })
                        ])
                  )
                  const logSaved = await repository.matching(criteria)
                  expect(logSaved.length).toBe(1)
            })

            it('should search all logs', async () => {
                  const logsSaved = await repository.matching({} as Criteria)
                  // expect([...equipos, equipo]).toEqual(expect.arrayContaining(equiposGuardados))
                  expect([...logs, log].length).toBe(logsSaved.length)
            })
      })
})
