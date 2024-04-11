import config from '../config'
import MongoConfig from '../../../../shared/infraestructure/persistence/mongo/MongoConfig'

export default class MongoConfigFactory {
      static createConfig(): MongoConfig {
            return { url: config.get('mongo.url') }
      }
}
