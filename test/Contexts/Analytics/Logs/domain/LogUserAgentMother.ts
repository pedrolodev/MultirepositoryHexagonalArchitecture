import { LogUserAgent } from '@src/Contexts/Analytics/Logs/domain/LogUserAgent'
import { StringMother } from '../../../shared/domain/StringMother'

export class LogUserAgentMother {
      static create(value: string): LogUserAgent {
            return new LogUserAgent(value)
      }

      static random(): LogUserAgent {
            return this.create(StringMother.userAgent())
      }
}
