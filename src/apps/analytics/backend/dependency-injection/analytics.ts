import MongoLogsRepository from '../../../../../src/Contexts/Analytics/Logs/infraestructure/persistence/MongoLogsRepository'
import MongoConfigFactory from '../../../../../src/Contexts/Analytics/shared/infraestructure/persistence/mongoConfigFactory'
import MongoClientFactory from '../../../../../src/Contexts/shared/infraestructure/persistence/mongo/MongoClientFactory'
import {
      ContainerBuilder,
      Definition,
      Reference
} from 'node-dependency-injection'

export default function registerAnalytics(container: ContainerBuilder) {
      const dfAnalyticsMongoconfigFactory = new Definition()
      dfAnalyticsMongoconfigFactory.setFactory(
            MongoConfigFactory,
            'createConfig'
      )
      container.setDefinition(
            'analytics.shared.mongoConfig',
            dfAnalyticsMongoconfigFactory
      )

      const dfAnalyticsMongoClientFactory = new Definition()
      dfAnalyticsMongoClientFactory.args = [
            'analytics',
            new Reference('analytics.shared.mongoConfig')
      ]
      dfAnalyticsMongoClientFactory.setFactory(
            MongoClientFactory,
            'createClient'
      )
      container.setDefinition(
            'analytics.shared.mongoClient',
            dfAnalyticsMongoClientFactory
      )

      const dgRepositoryAnalyticsLogs = new Definition(MongoLogsRepository, [
            new Reference('analytics.shared.mongoClient')
      ])
      container.setDefinition(
            'analytics.logs.repository',
            dgRepositoryAnalyticsLogs
      )
}
