import convict from 'convict'

const authConfig = convict({
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

authConfig.loadFile(__dirname + '/' + process.env.NODE_ENV + '.json')

export default authConfig
