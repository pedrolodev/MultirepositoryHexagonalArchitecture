import { Router } from 'express'
import { sync } from 'glob'
import path from 'path'

export function registerRoutes(router: Router) {
      const ruta = path
            .join(__dirname, '..', '..', '..', '**', '/*.route.*')
            .replace(/\\/g, '/')
      const routes = sync(ruta)
      routes.map((route) => register(route, router))
}

function register(routePath: string, router: Router) {
      const route = require(routePath)
      console.log('ROUTE LOADING', routePath)
      route.register(router)
}
