import { MongoClient } from 'mongodb'
import { AggregateRoot } from '../../../domain/AggregateRoot'
import { Criteria } from '../../../domain/criteria/Criteria'
import { mongoDocument, MongoRepository } from './MongoRepository'
import { Repository } from '../../../domain/Repository'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export abstract class GenericMongoRepository<
            T extends AggregateRoot,
            D extends mongoDocument
      >
      extends MongoRepository<T>
      implements Repository<T>
{
      constructor(_client: Promise<MongoClient>) {
            super(_client)
      }

      public save(value: T): Promise<void> {
            return this.persist(value.id.value, value)
      }

      public saveMany(values: T[]): Promise<void> {
            return this.persistMany(values)
      }

      public async matching(criteria: Criteria): Promise<any[]> {
            const documents = await this.searchByCriteria<D>(criteria)
            return documents.map((document) => {
                  return {
                        ...document,
                        id: document._id,
                        _id: undefined
                  }
            })
      }
}
