import { EnumValueObject } from '../../value-object/EnumValueObject'

export enum Operator {
      EQUAL = '=',
      NOT_EQUAL = '!=',
      GT = '>',
      LT = '<',
      CONTAINS = 'CONTAINS',
      NOT_CONTAINS = 'NOT_CONTAINS'
}

export type OperatorType =
      | 'EQUAL'
      | 'NOT_EQUAL'
      | 'GT'
      | 'LT'
      | 'CONTAINS'
      | 'NOT_CONTAINS'

export class FilterOperator extends EnumValueObject<Operator> {
      constructor(value: Operator) {
            super(value, Object.values(Operator))
      }

      static fromValue(value: string): FilterOperator {
            return new FilterOperator(Operator[value as OperatorType])
      }

      public isPositive(): boolean {
            return (
                  this.value !== Operator.NOT_EQUAL &&
                  this.value !== Operator.NOT_CONTAINS
            )
      }

      getPrimitive(): OperatorType {
            for (const key in Operator) {
                  if (Operator[key as OperatorType] === this.value) {
                        return key as OperatorType
                  }
            }
            return Operator.EQUAL as OperatorType
      }

      protected throwErrorForInvalidValue(value: Operator): void {
            throw new Error(
                  `Falta Personalizar. The filter operator ${value} is invalid`
            )
      }

      static equal() {
            return this.fromValue(Operator.EQUAL)
      }
}
