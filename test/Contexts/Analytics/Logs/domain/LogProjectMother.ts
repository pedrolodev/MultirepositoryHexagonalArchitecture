import { StringMother } from '../../../shared/domain/StringMother'
import { LogProject } from '@src/Contexts/Analytics/Logs/domain/LogProject'

export class LogProjectMother {
      static create(value: string): LogProject {
            return new LogProject(value)
      }

      static random(): LogProject {
            return this.create(StringMother.competitionName())
      }
}
