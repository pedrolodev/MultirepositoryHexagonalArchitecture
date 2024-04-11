import { Criteria } from '@src/Contexts/shared/domain/criteria/Criteria'
import {
      MongoRepository,
      mongoDocument
} from '../../../../shared/infraestructure/persistence/mongo/MongoRepository'
import { User, UserPrimitives } from '../../domain/User'
import { Repository } from '@src/Contexts/shared/domain/Repository'

export type UserDocument = Omit<UserPrimitives, 'id'> & mongoDocument

export default class MongoUserRepository
      extends MongoRepository<User>
      implements Repository<User>
{
      protected collectionName(): string {
            return 'Users'
      }

      public save(value: User): Promise<void> {
            return this.persist(value.id.value, value)
      }

      public saveMany(values: User[]): Promise<void> {
            return this.persistMany(values)
      }

      public async matching(
            criteria: Criteria
      ): Promise<{ id: string; username: string }[]> {
            const documents = await this.searchByCriteria<UserDocument>(
                  criteria
            )
            return documents.map((document) => {
                  return {
                        id: document._id,
                        username: document.username
                  }
            })
      }
}
