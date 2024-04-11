'use server'
import jwt from 'jsonwebtoken'

const secret = process.env.JWT_SECRET_TOKEN || ''

export default async function decodeExpiration(
      token: string | undefined
): Promise<number> {
      let expiration = 0

      if (token) {
            jwt.verify(token, secret, (err, decoded) => {
                  if (err) {
                        throw new Error('Error decoding token')
                  }
                  const { exp, iat } = decoded as { exp: number; iat: number }
                  if (decoded && exp) {
                        expiration = exp - iat
                  }
            })
      }
      return expiration
}
