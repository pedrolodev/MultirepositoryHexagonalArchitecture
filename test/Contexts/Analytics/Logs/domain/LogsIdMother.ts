import { UuidMother } from '../../../shared/domain/value-object/UuidMother'
import { LogId } from '@src/Contexts/Analytics/Logs/domain/LogId'

export class LogIdMother {
      static create(value: string): LogId {
            return new LogId(value)
      }

      static random(): LogId {
            return this.create(UuidMother.random().toString())
      }
}
