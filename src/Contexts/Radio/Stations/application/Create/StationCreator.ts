import { Repository } from 'src/Contexts/shared/domain/Repository'
import { Station, StationPrimitives } from '../../domain/Station'
import { StationId } from '../../domain/StationId'
import { StationName } from '../../domain/StationName'
import { StationUrl } from '../../domain/StationUrl'
import { StationScope } from '../../domain/StationScope'

export class StationCreator {
      constructor(private repository: Repository<Station>) {}

      async run(params: StationPrimitives): Promise<void> {
            const { id, name, url, scope } = params

            const stationId = new StationId(id)
            const stationName = new StationName(name)
            const stationUrl = new StationUrl(url)
            const stationScope = new StationScope(scope)

            const station = new Station(
                  stationId,
                  stationName,
                  stationUrl,
                  stationScope
            )
            await this.repository.save(station)
      }
}
