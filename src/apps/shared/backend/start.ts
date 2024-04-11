import { FullBackendApp } from './FullBackendApp'

try {
      const server = new FullBackendApp()
      server.start()
} catch (e) {
      console.log('ERROR STARTING SERVER', e)
      process.exit(1)
}

process.on('uncaughtException', (err) => {
      console.log('uncaughtException process on', err)
})
