import { AggregateRoot } from '../../../shared/domain/AggregateRoot'
import { StationId } from './StationId'
import { StationName } from './StationName'
import { StationScope } from './StationScope'
import { StationUrl } from './StationUrl'

export interface StationPrimitives {
      id: string
      name: string
      url: string
      scope: string
}

export class Station implements AggregateRoot {
      constructor(
            readonly id: StationId,
            readonly name: StationName,
            readonly url: StationUrl,
            readonly scope: StationScope
      ) {}

      toPrimitives(): StationPrimitives {
            return {
                  id: this.id.value,
                  name: this.name.value,
                  url: this.url.value,
                  scope: this.scope.value
            }
      }
}
