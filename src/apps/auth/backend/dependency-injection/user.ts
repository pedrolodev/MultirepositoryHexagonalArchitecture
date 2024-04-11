import MongoUserRepository from '../../../../../src/Contexts/Auth/Users/infraestructure/persistence/MongoUserRepository'
import MongoConfigFactory from '../../../../../src/Contexts/Auth/shared/infraestructure/persistence/mongoConfigFactory'
import MongoClientFactory from '../../../../../src/Contexts/shared/infraestructure/persistence/mongo/MongoClientFactory'
import {
      ContainerBuilder,
      Definition,
      Reference
} from 'node-dependency-injection'

export default function registerUser(container: ContainerBuilder) {
      const dfAuthMongoconfigFactory = new Definition()
      dfAuthMongoconfigFactory.setFactory(MongoConfigFactory, 'createConfig')
      container.setDefinition(
            'auth.shared.mongoConfig',
            dfAuthMongoconfigFactory
      )

      const dfAuthMongoClientFactory = new Definition()
      dfAuthMongoClientFactory.args = [
            'auth',
            new Reference('auth.shared.mongoConfig')
      ]
      dfAuthMongoClientFactory.setFactory(MongoClientFactory, 'createClient')
      container.setDefinition(
            'auth.shared.mongoClient',
            dfAuthMongoClientFactory
      )

      const dfRepositoryAuthUser = new Definition(MongoUserRepository, [
            new Reference('auth.shared.mongoClient')
      ])
      container.setDefinition('auth.user.repository', dfRepositoryAuthUser)
}
