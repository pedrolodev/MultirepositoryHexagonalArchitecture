'use server'
import jwt from 'jsonwebtoken'

const secret = process.env.JWT_SECRET_TOKEN || ''

export default async function verify(
      token: string | undefined
): Promise<boolean> {
      let isVerify = false

      if (token) {
            jwt.verify(token, secret, (err, decoded) => {
                  if (err === null) {
                        isVerify = true
                  }
            })
      }

      return isVerify
}
