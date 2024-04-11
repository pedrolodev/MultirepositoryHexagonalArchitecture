import { Criteria } from '@src/Contexts/shared/domain/criteria/Criteria'
import {
      MongoRepository,
      mongoDocument
} from '../../../../shared/infraestructure/persistence/mongo/MongoRepository'
import { Log, LogPrimitives } from '../../domain/Log'
import { Repository } from '@src/Contexts/shared/domain/Repository'

export type LogDocument = Omit<LogPrimitives, 'id'> & mongoDocument

export default class MongoLogsRepository
      extends MongoRepository<Log>
      implements Repository<Log>
{
      protected collectionName(): string {
            return 'Logs'
      }

      public save(value: Log): Promise<void> {
            return this.persist(value.id.value, value)
      }

      public saveMany(values: Log[]): Promise<void> {
            return this.persistMany(values)
      }

      public async matching(criteria: Criteria): Promise<LogPrimitives[]> {
            const documents = await this.searchByCriteria<LogDocument>(criteria)
            return documents.map((document) => {
                  return {
                        id: document._id,
                        ip: document.ip,
                        userAgent: document.userAgent,
                        time: document.time
                  }
            })
      }
}
