import { FullBackendApp } from './FullBackendApp'

const server = new FullBackendApp()
server.start()
const app = server.expressApp
export default app
