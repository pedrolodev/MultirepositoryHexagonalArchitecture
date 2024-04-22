import { NextResponse, type NextRequest } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

const apiAddress = process.env.API_ADDRESS

export async function middleware(request: NextRequest) {
      const id = uuidv4()
      const ip = request.headers.get('x-forwarded-for')
      const userAgent = request.headers.get('user-agent')
      const time = new Date()

      const url = apiAddress + '/logs'
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

      const response = await fetch(url, opciones)

      if (response.status !== 201) {
            throw new Error(
                  'estatus: ' + response.status + ', error: ' + response.json()
            )
      }

      return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
      matcher: '/'
}
