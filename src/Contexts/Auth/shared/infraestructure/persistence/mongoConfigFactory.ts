import MongoConfig from '../../../../shared/infraestructure/persistence/mongo/MongoConfig'
import authConfig from '../config'

export default class MongoConfigFactory {
      static createConfig(): MongoConfig {
            return { url: authConfig.get('mongo.url') }
      }
}
