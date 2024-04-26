'user server'
import axios from 'axios'
import { cookies } from 'next/headers'
import decodeExpiration from '../lib/decodeExpiration'
import { LoginType } from '../schemas/loginSchema'

const apiAddress = process.env.API_ADDRESS

export default async function loginService({
      username,
      password
}: LoginType): Promise<{ success: boolean; message: string }> {
      try {
            const apiUrl = apiAddress + '/users'
            const loginData = { username, password }
            const { data } = await axios.post(apiUrl, loginData)
            const { token } = data

            // TODO esta mal
            if (!(data && token)) {
                  return {
                        success: false,
                        message: 'Usuario o contraseña incorrecta'
                  }
            }

            const maxAge = await decodeExpiration(token)
            cookies().set('token', token, {
                  httpOnly: true,
                  // sameSite: 'strict',
                  maxAge
            })
            return {
                  success: true,
                  message: 'Bienvenido'
            }
      } catch (error) {
            return {
                  success: false,
                  message: 'Acceso denegado'
            }
      }
}
