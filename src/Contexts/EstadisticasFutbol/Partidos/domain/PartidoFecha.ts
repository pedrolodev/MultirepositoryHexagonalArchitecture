import { DateValueObject } from '../../../shared/domain/value-object/DateValueObject'

export class PartidoFecha extends DateValueObject {
      constructor (value:string) {
            super(new Date(value))
      }
}
