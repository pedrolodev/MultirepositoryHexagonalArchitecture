import { StringMother } from '../../../shared/domain/StringMother'
import { LogIp } from '@src/Contexts/Analytics/Logs/domain/LogIp'

export class LogIpMother {
      static create(value: string): LogIp {
            return new LogIp(value)
      }

      static random(): LogIp {
            return this.create(StringMother.ipv4())
      }
}
