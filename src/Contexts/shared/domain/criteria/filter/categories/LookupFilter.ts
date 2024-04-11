import { FilterType } from '.'
import { Filter } from '../Filter'
import { FilterField } from '../FilterField'

export type LookupFilterPrimitives = {
      type: 'lookup'
      field: string
      from: string
}

export class LookupFilter implements Filter {
      readonly type: FilterType = 'lookup'
      constructor(readonly field: FilterField, readonly from: string) {}

      static fromValues(values: { field: string; from: string }): LookupFilter {
            const { field, from } = values

            if (!field || !from) {
                  throw new Error(
                        'El filter Lookup no está correctamente configurado'
                  )
            }
            return new LookupFilter(new FilterField(field), from)
      }

      toPrimitives(): object {
            return { type: this.type, field: this.field.value, from: this.from }
      }
}
