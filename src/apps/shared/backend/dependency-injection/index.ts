import { ContainerBuilder, YamlFileLoader } from 'node-dependency-injection'
import path from 'path'

export default class ContainerLoader {
      container: ContainerBuilder
      loader: YamlFileLoader

      constructor() {
            this.container = new ContainerBuilder()
            this.loader = new YamlFileLoader(this.container)
      }

      async start(): Promise<void> {
            await this.loader
                  .load(
                        path.join(
                              __dirname,
                              '..',
                              '..',
                              '..',
                              'estadisticasFutbol',
                              'backend',
                              'dependency-injection',
                              'ef.yml'
                        )
                  )
                  .then(() => console.log('load ef dependency inversor'))
            await this.loader
                  .load(
                        path.join(
                              __dirname,
                              '..',
                              '..',
                              '..',
                              'Radio',
                              'backend',
                              'dependency-injection',
                              'radio.yml'
                        )
                  )
                  .then(() => console.log('load radio dependency inversor'))
            await this.loader
                  .load(
                        path.join(
                              __dirname,
                              '..',
                              '..',
                              '..',
                              'auth',
                              'backend',
                              'dependency-injection',
                              'user.yml'
                        )
                  )
                  .then(() => console.log('load auth dependency inversor'))
            await this.loader
                  .load(
                        path.join(
                              __dirname,
                              '..',
                              '..',
                              '..',
                              'analytics',
                              'backend',
                              'dependency-injection',
                              'analytics.yml'
                        )
                  )
                  .then(() => console.log('load analytics dependency inversor'))
            await this.loader
                  .load(path.join(__dirname, '.', 'mailer.yml'))
                  .then(() => console.log('load mailer dependency inversor'))
            return new Promise((resolve) => resolve())
      }
}

const containerLoader = new ContainerLoader()
const container = containerLoader.container
const containerIsStarted = containerLoader.start()

export { container, containerIsStarted }
