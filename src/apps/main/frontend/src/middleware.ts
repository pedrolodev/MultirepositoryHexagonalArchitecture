'use server'
import type { NextRequest } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

export async function middleware(request: NextRequest) {
      const id = uuidv4()
      const ip = request.headers.get('x-forwarded-for')
      const userAgent = request.headers.get('user-agent')
      const time = new Date()

      const url = 'http://localhost:5001/logs'
      const objectToSend = {
            ip,
            userAgent,
            time,
            id
      }

      const opciones = {
            method: 'PUT',
            headers: {
                  'Content-Type': 'application/json'
            },
            body: JSON.stringify(objectToSend)
      }

      // Realizar la solicitud PUT
      fetch(url, opciones)
            .then((response) => {
                  if (response.status !== 201) {
                        console.log('No se creo el log correctamente:')
                        console.log(objectToSend)
                  }
            })
            .catch((error) => {
                  console.log('Error al realizar la solicitud PUT:', error)
                  console.log(objectToSend)
            })
}

// See "Matching Paths" below to learn more
export const config = {
      matcher: '/'
}
