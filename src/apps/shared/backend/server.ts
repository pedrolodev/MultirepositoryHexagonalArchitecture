import * as dotenv from 'dotenv'
import express from 'express'
import Router from 'express-promise-router'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import compress from 'compression'
import { handleExceptions } from '../../../Contexts/shared/infraestructure/errors/express'
import * as http from 'http'
// import cors from 'cors'
// import { registerRoutes } from './routes/registerRoutes'
import { register as registerStatus } from './routes/status.route'
import { register as registerSendMail } from './routes/sendMail.route'
import { register as registerLogs } from '../../../../src/apps/analytics/backend/routes/analytics.route'
import { register as registerUsers } from '../../../../src/apps/auth/backend/routes/users.route'
import { register as registerEquipos } from '../../../../src/apps/estadisticasFutbol/backend/routes/equipos.route'
import { register as registerJugadores } from '../../../../src/apps/estadisticasFutbol/backend/routes/jugadores.route'
import { register as registerPartidos } from '../../../../src/apps/estadisticasFutbol/backend/routes/partidos.route'

import { register as registerStations } from '../../../../src/apps/Radio/backend/routes/stations.route'

import * as Sentry from '@sentry/node'
import { nodeProfilingIntegration } from '@sentry/profiling-node'

dotenv.config()

export class Server {
      private express: express.Express
      private port: string
      private httpServer?: http.Server

      constructor(port: string) {
            this.port = port
            this.express = express()
            if (
                  process.env.NODE_ENV === 'production' ||
                  process.env.NODE_ENV === 'dev'
            ) {
                  Sentry.init({
                        dsn: process.env.SENTRY_DNS,
                        integrations: [
                              // enable HTTP calls tracing
                              new Sentry.Integrations.Http({ tracing: true }),
                              // enable Express.js middleware tracing
                              new Sentry.Integrations.Express({
                                    app: this.express
                              }),
                              nodeProfilingIntegration()
                        ],
                        // Performance Monitoring
                        tracesSampleRate: 1.0, //  Capture 100% of the transactions
                        // Set sampling rate for profiling - this is relative to tracesSampleRate
                        profilesSampleRate: 1.0
                  })
            }

            if (
                  process.env.NODE_ENV === 'production' ||
                  process.env.NODE_ENV === 'dev'
            ) {
                  // The request handler must be the first middleware on the app
                  this.express.use(Sentry.Handlers.requestHandler())
                  // TracingHandler creates a trace for every incoming request
                  this.express.use(Sentry.Handlers.tracingHandler())
            }

            this.express.use(bodyParser.json())
            this.express.use(bodyParser.urlencoded({ extended: true }))
            this.express.use(helmet.xssFilter())
            this.express.use(helmet.noSniff())
            this.express.use(helmet.hidePoweredBy())
            this.express.use(helmet.frameguard({ action: 'deny' }))

            // this.express.use(cors())

            this.express.use(compress())

            const router = Router()
            registerStatus(router)
            registerSendMail(router)
            registerLogs(router)
            registerUsers(router)
            registerEquipos(router)
            registerJugadores(router)
            registerPartidos(router)
            registerStations(router)
            this.express.use(router)
            // registerRoutes(router)

            // The error handler must be registered before any other error middleware and after all controllers
            if (
                  process.env.NODE_ENV === 'production' ||
                  process.env.NODE_ENV === 'dev'
            ) {
                  router.use(Sentry.Handlers.errorHandler())
            }
            router.use(handleExceptions)
      }

      async listen(): Promise<void> {
            return new Promise((resolve) => {
                  this.httpServer = this.express.listen(this.port, () => {
                        console.log(
                              `Backend is running at port ${
                                    this.port
                              } in ${this.express.get('env')} mode`
                        )
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

      getExpressApp() {
            return this.express
      }
}
