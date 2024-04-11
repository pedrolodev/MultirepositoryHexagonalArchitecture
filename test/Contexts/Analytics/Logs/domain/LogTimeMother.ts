import { LogTime } from '@src/Contexts/Analytics/Logs/domain/LogTime'
import { StringMother } from '@test/Contexts/shared/domain/StringMother'

export class LogTimeMother {
      static create(value: Date): LogTime {
            return new LogTime(value)
      }

      static random(): LogTime {
            return this.create(StringMother.date())
      }
}
