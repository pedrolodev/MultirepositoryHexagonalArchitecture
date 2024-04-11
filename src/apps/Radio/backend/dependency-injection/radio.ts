import MongoStationRepository from '../../../../../src/Contexts/Radio/Stations/infraestructure/persistence/MongoStationRepository'
import MongoConfigFactory from '../../../../../src/Contexts/Radio/shared/infraestructure/persistence/mongoConfigFactory'
import MongoClientFactory from '../../../../../src/Contexts/shared/infraestructure/persistence/mongo/MongoClientFactory'
import {
      ContainerBuilder,
      Definition,
      Reference
} from 'node-dependency-injection'

export default function registerRadio(container: ContainerBuilder) {
      const dfRadioMongoconfigFactory = new Definition()
      dfRadioMongoconfigFactory.setFactory(MongoConfigFactory, 'createConfig')
      container.setDefinition(
            'radio.shared.mongoConfig',
            dfRadioMongoconfigFactory
      )

      const dfRadioMongoClientFactory = new Definition()
      dfRadioMongoClientFactory.args = [
            'radio',
            new Reference('radio.shared.mongoConfig')
      ]
      dfRadioMongoClientFactory.setFactory(MongoClientFactory, 'createClient')
      container.setDefinition(
            'radio.shared.mongoClient',
            dfRadioMongoClientFactory
      )

      const dgRepositoryRadioStations = new Definition(MongoStationRepository, [
            new Reference('radio.shared.mongoClient')
      ])
      container.setDefinition(
            'radio.station.repository',
            dgRepositoryRadioStations
      )
}
