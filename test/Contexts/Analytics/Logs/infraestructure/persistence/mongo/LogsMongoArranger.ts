import { Repository } from '../../../../../../../src/Contexts/shared/domain/Repository'
import { Repeater } from '../../../../../shared/domain/Repeater'
import { LogMother } from '../../../domain/LogMother'
import { Log } from '@src/Contexts/Analytics/Logs/domain/Log'

export default class LogsMongoArranger {
      constructor(private repository: Repository<Log>) {}

      async initData(times: number): Promise<Log[]> {
            const users: Log[] = Repeater.random(
                  () => LogMother.random(),
                  times
            )
            await this.repository.saveMany(users)
            return users
      }

      async initConcretData(partidos: Log[]): Promise<void> {
            await this.repository.saveMany(partidos)
      }
}
