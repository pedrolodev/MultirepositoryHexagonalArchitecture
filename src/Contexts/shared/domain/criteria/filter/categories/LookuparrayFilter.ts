import { FilterType } from '.'
import { Filter } from '../Filter'
import { FilterField } from '../FilterField'

export type LookupArrayFilterPrimitives = {
      type: 'lookuparray'
      field: string
      from: string
}

export class LookuparrayFilter implements Filter {
      readonly type: FilterType = 'lookuparray'

      constructor(readonly field: FilterField, readonly from: string) {}

      static fromValues(values: {
            field: string
            from: string
      }): LookuparrayFilter {
            const { field, from } = values

            if (!field || !from) {
                  throw new Error(
                        'El Filter LookupArray no está correctamente configurado'
                  )
            }
            return new LookuparrayFilter(new FilterField(field), from)
      }

      toPrimitives(): object {
            return { type: this.type, field: this.field.value, from: this.from }
      }
}
