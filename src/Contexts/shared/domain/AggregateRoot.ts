import { Uuid } from './value-object/Uuid'

export interface AggregateRoot {
       id: Uuid
       toPrimitives(): any;
}
