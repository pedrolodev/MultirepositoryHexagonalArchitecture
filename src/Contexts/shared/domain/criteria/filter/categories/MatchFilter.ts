import { Primitives } from '../../../value-object/ValueObject'
import { Filter } from '../Filter'
import { FilterField } from '../FilterField'
import { FilterOperator, OperatorType } from '../FilterOperator'
import { FilterValue } from '../FilterValue'

export type MatchFilterPrimitives = {
      type: 'match'
      field: string
      operator: OperatorType
      value: string
}

export class MatchFilter implements Filter {
      readonly type = 'match'

      constructor(
            readonly field: FilterField,
            readonly operator: FilterOperator,
            readonly value: FilterValue
      ) {}

      static fromValues(values: {
            field: string
            operator: OperatorType
            value: string
      }): MatchFilter {
            const { field, operator, value } = values

            if (!field || !operator || !value) {
                  throw new Error(
                        'El Filter Match no está correctamente configurado'
                  )
            }

            return new MatchFilter(
                  new FilterField(field),
                  FilterOperator.fromValue(operator),
                  new FilterValue(this.getTypeFromString(value))
            )
      }

      static getTypeFromString(str: string): Primitives {
            if (/^\d+$/.test(str)) return Number(str)
            if (/^(true|false)$/.test(str)) return str === 'true'

            return str
      }

      toPrimitives(): MatchFilterPrimitives {
            return {
                  type: this.type,
                  field: this.field.value,
                  operator: this.operator.getPrimitive(),
                  value: String(this.value.value)
            }
      }
}
