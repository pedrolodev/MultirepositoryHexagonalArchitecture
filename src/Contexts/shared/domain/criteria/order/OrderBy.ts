import { StringValueObject } from '../../value-object/StringValueObject'

export type OrderByType = string

export class OrderBy extends StringValueObject {
      constructor (value: string|undefined) {
            super(value || '')
      }
}
