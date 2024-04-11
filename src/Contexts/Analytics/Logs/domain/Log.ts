import { AggregateRoot } from '../../../shared/domain/AggregateRoot'
import { LogId } from './LogId'
import { LogIp } from './LogIp'
import { LogUserAgent } from './LogUserAgent'
import { LogTime } from './LogTime'

export interface LogPrimitives {
      id: string
      ip: string
      userAgent: string
      time: Date
}

export interface LogOutput {
      id: string
      ip: string
      userAgent: string
      time: string
}

export class Log implements AggregateRoot {
      constructor(
            readonly id: LogId,
            readonly ip: LogIp,
            readonly userAgent: LogUserAgent,
            readonly time: LogTime
      ) {}

      toPrimitives(): LogPrimitives {
            return {
                  id: this.id.value,
                  ip: this.ip.value,
                  userAgent: this.userAgent.value,
                  time: this.time.value
            }
      }
}
