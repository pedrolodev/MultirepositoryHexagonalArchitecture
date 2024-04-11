import { MongoEnvironmentArranger } from '../../../../../test/Contexts/shared/infraestructure/persistence/mongo/MongoEnvironmentArranger'

import {
      ContainerBuilder,
      Definition,
      Reference
} from 'node-dependency-injection'

export default function registerUserTest(container: ContainerBuilder) {
      const dfAuthEnvironmentArranger = new Definition(
            MongoEnvironmentArranger,
            [new Reference('auth.shared.mongoClient')]
      )
      container.setDefinition(
            'auth.shared.environmentArranger',
            dfAuthEnvironmentArranger
      )
}
