import * as dotenv from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import compress from 'compression'
import Router from 'express-promise-router'
import { handleExceptions } from '../../../Contexts/shared/infraestructure/errors/express'
import * as http from 'http'
import cors from 'cors'
import { registerRoutes } from './routes/registerRoutes'
dotenv.config()

export class Server {
      private express: express.Express
      private port: string
      private httpServer?: http.Server

      constructor(port: string) {
            this.port = port
            this.express = express()
            this.express.use(bodyParser.json())
            this.express.use(bodyParser.urlencoded({ extended: true }))
            this.express.use(helmet.xssFilter())
            this.express.use(helmet.noSniff())
            this.express.use(helmet.hidePoweredBy())
            this.express.use(helmet.frameguard({ action: 'deny' }))

            if (process.env.env === 'dev') {
                  console.log('CORS CONFIG', 'THIS IS ONLY ACTIVATED IN DEV')
                  this.express.use(cors())
            }

            this.express.use(compress())
            const router = Router()

            this.express.use(router)

            registerRoutes(router)

            router.use(handleExceptions)
      }

      async listen(): Promise<void> {
            return new Promise((resolve) => {
                  this.httpServer = this.express.listen(this.port, () => {
                        console.log(
                              `Backend is running at http://localhost:${
                                    this.port
                              } in ${this.express.get('env')} mode`
                        )
                        console.log('  Press CTRL-C to stop\n')
                        resolve()
                  })
            })
      }

      async stop(): Promise<void> {
            return new Promise((resolve, reject) => {
                  if (!this.httpServer) {
                        return resolve()
                  }

                  this.httpServer.close((error) => {
                        if (error) {
                              return reject(error)
                        }
                        return resolve()
                  })
            })
      }

      getHttpServer(): http.Server | undefined {
            return this.httpServer
      }
}
