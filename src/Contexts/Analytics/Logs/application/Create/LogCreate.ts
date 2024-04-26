import { Repository } from '../../../../../../src/Contexts/shared/domain/Repository'
import { Log, LogPrimitives } from '../../domain/Log'
import { LogId } from '../../domain/LogId'
import { LogIp } from '../../domain/LogIp'
import { LogUserAgent } from '../../domain/LogUserAgent'
import { LogTime } from '../../domain/LogTime'
import { LogProject } from '../../domain/LogProject'

export class LogCreator {
      constructor(private repository: Repository<Log>) {}

      async run(params: LogPrimitives): Promise<void> {
            const { id, ip, userAgent, time, project } = params

            const logId = new LogId(id)
            const logUserAgent = new LogUserAgent(userAgent)
            const logIp = new LogIp(ip)
            const logTime = new LogTime(time)
            const logProject = new LogProject(project)

            const log = new Log(logId, logIp, logUserAgent, logTime, logProject)
            await this.repository.save(log)
      }
}
