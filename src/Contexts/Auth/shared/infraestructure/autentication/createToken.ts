import { sign } from 'jsonwebtoken'

const secretKey = process.env.JWT_SECRET_TOKEN || 'clAvE12+'

export default function createToken(id: string, username: string): string {
      const payload = {
            id,
            username
      }

      // if (secretKey === '') throw new Error('error creando el token')
      const token = sign(payload, secretKey, { expiresIn: 60 * 60 })

      return token
}
