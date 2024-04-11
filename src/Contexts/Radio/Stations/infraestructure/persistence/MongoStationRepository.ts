import { Repository } from '../../../../shared/domain/Repository'
import { Criteria } from '../../../../shared/domain/criteria/Criteria'
import {
      MongoRepository,
      mongoDocument
} from '../../../../shared/infraestructure/persistence/mongo/MongoRepository'
import { Station, StationPrimitives } from '../../domain/Station'

export type StationDocument = Omit<StationPrimitives, 'id'> & mongoDocument

export default class MongoStationRepository
      extends MongoRepository<Station>
      implements Repository<Station>
{
      save(value: Station): Promise<void> {
            return this.persist(value.id.value, value)
      }

      saveMany(values: Station[]): Promise<void> {
            return this.persistMany(values)
      }

      async matching(criteria: Criteria): Promise<any[]> {
            const documents = await this.searchByCriteria<StationDocument>(
                  criteria
            )
            return documents.map((document) => {
                  return {
                        ...document,
                        id: document._id,
                        _id: undefined
                  }
            })
      }

      protected collectionName(): string {
            return 'Stations'
      }
}
