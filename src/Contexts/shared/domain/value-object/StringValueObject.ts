import { ValueObject } from './ValueObject'

export abstract class StringValueObject extends ValueObject<string> {
      constructor (value: string) {
            super(value)
            this.ensureIsString(value)
      }

      private ensureIsString (value: string) {
            if (!(typeof value === 'string')) {
                  throw new Error('Not a string')
            }
      }
}
