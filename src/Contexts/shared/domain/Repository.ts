import { AggregateRoot } from './AggregateRoot'
import { Criteria } from './criteria/Criteria'

export interface Repository<T extends AggregateRoot> {
      save(value: T): Promise<void>
      saveMany(values: T[]): Promise<void>
      matching(criteria: Criteria): Promise<Array<any>>
}
