import { ValueObject } from './ValueObject'

export abstract class NumberValueObject extends ValueObject<number> {
      constructor (value: number) {
            super(value)
            this.ensureIsNumber(value)
      }

      private ensureIsNumber (value: number) {
            if (!(typeof value === 'number')) {
                  throw new Error('Not a number')
            }
      }
}
