import { Server } from './server'

export class FullBackendApp {
      server: Server

      constructor() {
            const port = process.env.PORT || '3000'
            this.server = new Server(port)
      }

      start(): Promise<void> {
            return this.server.listen()
      }

      stop(): Promise<void> {
            return this.server.stop()
      }

      get httpServer() {
            return this.server?.getHttpServer()
      }

      get expressApp() {
            return this.server.getExpressApp()
      }
}
