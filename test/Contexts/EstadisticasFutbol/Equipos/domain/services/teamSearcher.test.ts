import {
      container,
      containerIsStarted
} from '@src/apps/shared/backend/dependency-injection'
import { Equipo } from '../../../../../../src/Contexts/EstadisticasFutbol/Equipos/domain/Equipo'
import TeamFinder from '../../../../../../src/Contexts/EstadisticasFutbol/Equipos/domain/services/TeamFinder'
import { EnvironmentArranger } from '../../../../shared/infraestructure/persistence/arranger/EnvironmentArranger'
import EquipoMongoArranger from '../../infraestructure/persistence/mongo/EquipoMongoArranger'
import { setTimeout } from 'timers/promises'

describe('Find Equipo', () => {
      let searcher: TeamFinder
      let environmentArranger: EnvironmentArranger
      let equiposArranger: EquipoMongoArranger
      let equipos: Equipo[]

      beforeAll(async () => {
            await containerIsStarted
            searcher = container.get('ef.equipo.service.searcher')
            environmentArranger = container.get('ef.shared.environmentArranger')
            equiposArranger = container.get('ef.equipos.arranger')
            await environmentArranger.arrange()
            equipos = await equiposArranger.initData(8)
            searcher.addMany(equipos)
      })

      afterAll(async () => {
            await environmentArranger.close()
      })

      it('should search a Equipo', async () => {
            await setTimeout(1000)
            const equipo = equipos[4]
            const equipoBuscado = await searcher.search({
                  id: equipo.id.value,
                  name: equipo.name.value
            })
            expect(equipoBuscado).toEqual([equipo])
      })
})
