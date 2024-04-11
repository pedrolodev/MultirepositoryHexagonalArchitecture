import { MongoEnvironmentArranger } from '../../../../../test/Contexts/shared/infraestructure/persistence/mongo/MongoEnvironmentArranger'
import {
      ContainerBuilder,
      Definition,
      Reference
} from 'node-dependency-injection'

export default function registerAnalyticsTest(container: ContainerBuilder) {
      const dfAnalyticsEnvironmentArranger = new Definition(
            MongoEnvironmentArranger,
            [new Reference('analytics.shared.mongoClient')]
      )
      container.setDefinition(
            'analytics.shared.environmentArranger',
            dfAnalyticsEnvironmentArranger
      )
}
