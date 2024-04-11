import convict from 'convict'

const analyticsConfig = convict({
      env: {
            doc: 'The application environment.',
            format: ['production', 'dev', 'test'],
            default: 'default',
            env: 'NODE_ENV'
      },
      mongo: {
            url: {
                  doc: 'The Mongo connection URL',
                  format: String,
                  env: 'MONGO_URL_PRODUCTION',
                  default: ''
            }
      }
})

analyticsConfig.loadFile(__dirname + '/' + process.env.NODE_ENV + '.json')

export default analyticsConfig
