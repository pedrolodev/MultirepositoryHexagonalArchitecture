import { ContainerBuilder } from 'node-dependency-injection'
import registerMailer from './mailer'
import registerAnalytics from '../../../../../src/apps/analytics/backend/dependency-injection/analytics'
import registerUser from '../../../../../src/apps/auth/backend/dependency-injection/user'
import registerEf from '../../../../../src/apps/estadisticasFutbol/backend/dependency-injection/ef'
import registerEfTest from '../../../../../src/apps/estadisticasFutbol/backend/dependency-injection/ef_test'
import registerUserTest from '../../../../../src/apps/auth/backend/dependency-injection/user_test'
import registerAnalyticsTest from '../../../../../src/apps/analytics/backend/dependency-injection/analytics_test'
import registerRadio from '../../../../../src/apps/Radio/backend/dependency-injection/radio'

export default class ContainerLoader {
      container: ContainerBuilder
      node_env: string | undefined
      constructor() {
            this.container = new ContainerBuilder()
            this.node_env = process.env.NODE_ENV
      }

      async start(): Promise<void> {
            registerMailer(this.container)
            registerAnalytics(this.container)
            registerUser(this.container)
            registerEf(this.container)
            registerRadio(this.container)
            if (this.node_env === 'dev' || this.node_env === 'test') {
                  console.log('CARGADO EL MODO DESARROLLO')
                  registerAnalyticsTest(this.container)
                  registerEfTest(this.container)
                  registerUserTest(this.container)
            }

            return new Promise((resolve) => resolve())
      }
}

const containerLoader = new ContainerLoader()
const container = containerLoader.container
const containerIsStarted = containerLoader.start()
export { container, containerIsStarted }
