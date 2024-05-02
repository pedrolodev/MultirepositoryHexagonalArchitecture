import { NextResponse, type NextRequest } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

const apiAddress = process.env.API_ADDRESS

export async function middleware(request: NextRequest) {
      const id = uuidv4()
      const ip = request.headers.get('x-forwarded-for')
      const userAgent = request.headers.get('user-agent')
      const time = new Date().toLocaleString('es-ES', {
            timeZone: 'Europe/Madrid'
      })

      const url = apiAddress + '/logs'
      const objectToSend = {
            ip,
            userAgent,
            time,
            id,
            project: 'main'
      }

      const opciones = {
            method: 'PUT',
            headers: {
                  'Content-Type': 'application/json'
            },
            body: JSON.stringify(objectToSend)
      }

      try {
            await fetch(url, opciones)
      } catch (e) {
            console.log('ERROR', e)
      }

      return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
      matcher: '/'
}
