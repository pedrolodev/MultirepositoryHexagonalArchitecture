import { Primitives, ValueObject } from './ValueObject'
import { NewableClass } from '../Newable'
export abstract class ArrayValueObject<T extends ValueObject<Primitives>> {
      private Class: NewableClass<T>
      readonly values: T[]

      constructor (values: string[], Class: NewableClass<T>) {
            this.ensureIsArray(values)
            this.Class = Class
            this.values = this.stringToValueObject(values)
      }

      private stringToValueObject (values: Array<string>): Array<T> {
            return values.map(value => new this.Class(value))
      }

      private ensureIsArray (value: string[]): void {
            if (!Array.isArray(value)) {
                  throw new Error('No es un array')
            }
      }

      toPrimitives (): string[] {
            return this.values.map(value => value.toString())
      }
}
