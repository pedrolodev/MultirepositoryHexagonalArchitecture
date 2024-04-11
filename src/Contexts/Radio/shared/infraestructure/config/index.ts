import convict from 'convict'

const radioConfig = convict({
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
                  env: 'MONGO_URL',
                  default: ''
            }
      }
})

radioConfig.load({ mongo: { url: '' } })
// radioConfig.loadFile(__dirname + '/' + process.env.NODE_ENV + '.json')
export default radioConfig
