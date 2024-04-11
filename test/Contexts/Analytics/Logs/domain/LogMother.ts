import { LogId } from '@src/Contexts/Analytics/Logs/domain/LogId'
import { LogIp } from '@src/Contexts/Analytics/Logs/domain/LogIp'
import { LogUserAgent } from '@src/Contexts/Analytics/Logs/domain/LogUserAgent'
import { LogTime } from '@src/Contexts/Analytics/Logs/domain/LogTime'
import { Log, LogOutput } from '@src/Contexts/Analytics/Logs/domain/Log'
import { LogIdMother } from './LogsIdMother'
import { LogIpMother } from './LogIpMother'
import { LogTimeMother } from './LogTimeMother'
import { LogUserAgentMother } from './LogUserAgentMother'

export class LogMother {
      static create(
            id: LogId,
            ip: LogIp,
            userAgent: LogUserAgent,
            time: LogTime
      ): Log {
            return new Log(id, ip, userAgent, time)
      }

      static random(): Log {
            return this.create(
                  LogIdMother.random(),
                  LogIpMother.random(),
                  LogUserAgentMother.random(),
                  LogTimeMother.random()
            )
      }

      static toOutput(user: Log): LogOutput {
            const { id, ip, userAgent, time } = user

            return {
                  id: id.value,
                  ip: ip.value,
                  userAgent: userAgent.value,
                  time: time.value.toDateString()
            }
      }
}
