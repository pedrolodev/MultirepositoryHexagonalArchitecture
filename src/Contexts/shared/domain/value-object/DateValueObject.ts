import { ValueObject } from './ValueObject'

export abstract class DateValueObject extends ValueObject<Date> {
      constructor(value: Date) {
            super(value)
      }
}
