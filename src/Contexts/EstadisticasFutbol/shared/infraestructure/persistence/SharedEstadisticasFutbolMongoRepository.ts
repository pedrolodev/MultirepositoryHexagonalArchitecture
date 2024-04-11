import { MongoClient } from 'mongodb'
import { AggregateRoot } from '../../../../shared/domain/AggregateRoot'
import { Criteria } from '../../../../shared/domain/criteria/Criteria'
import { AggregateMapper } from '../../../../shared/domain/AggregateMapper'
import { Uuid } from '../../../../shared/domain/value-object/Uuid'
import {
      mongoDocument,
      MongoRepository
} from '../../../../shared/infraestructure/persistence/mongo/MongoRepository'
import { Repository } from '../../../../shared/domain/Repository'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export abstract class SharedEstadisticasFutbolMongoRepository<
            T extends AggregateRoot,
            U extends Uuid,
            D extends mongoDocument
      >
      extends MongoRepository<T>
      implements Repository<T>
{
      constructor(
            _client: Promise<MongoClient>,
            private AggregateMapper: AggregateMapper,
            private cName: string
      ) {
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
            return documents.map((document) =>
                  this.AggregateMapper.toOutput({
                        ...document,
                        id: document._id
                  })
            )
      }

      protected collectionName(): string {
            return this.cName
      }

      /* public async search (id: U): Promise<Nullable<T>> {
            const collection = await this.collection()
            const document = await collection.findOne<D>({ _id: id.value })
            return document
                  ? this.AgregadoFactory.fromPrimitives({
                        ...document,
                        id: id.value
                  })
                  : null
      }

      public async searchAll (): Promise<T[]> {
            const collection = await this.collection()
            const documents = await collection.find<D>({}, {}).toArray()

            return documents.map(document =>
                  this.AgregadoFactory.fromPrimitives({
                        ...document,
                        id: document._id
                  })
            )
      } */
}
