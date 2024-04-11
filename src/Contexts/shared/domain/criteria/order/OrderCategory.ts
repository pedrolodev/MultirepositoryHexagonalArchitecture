import { EnumValueObject } from '../../value-object/EnumValueObject'

export enum OrderCategories {
  ASC = 'asc',
  DESC = 'desc',
  NONE = 'none'
}

export type OrderCategoryType = 'asc' | 'desc' | 'none'

export class OrderCategory extends EnumValueObject<OrderCategoryType> {
      constructor (value: OrderCategoryType | undefined) {
            super(value || 'none', Object.values(OrderCategories))
      }

      static fromValue (value: string): OrderCategory {
            return new OrderCategory(value as OrderCategoryType)
      }

      public isNone (): boolean {
            return this.value === OrderCategories.NONE
      }

      public isAsc (): boolean {
            return this.value === OrderCategories.ASC
      }

      protected throwErrorForInvalidValue (value: OrderCategories): void {
            throw new Error(`Falta Personalisar.The order type ${value} is invalid`)
      }
}
