import { cookies } from 'next/headers'
import LoginForm from './loginForm'
import loginService from '../../../services/loginService'
import verify from '../../../lib/verify'
import { ReactNode } from 'react'
import { LoginType } from '../../../schemas/loginSchema'

export default async function Login({ children }: { children: ReactNode }) {
      const token = cookies().get('token')?.value
      const tokenIsValid = await verify(token)

      const action = async (user: LoginType) => {
            'use server'
            return await loginService(user)
      }

      return <>{tokenIsValid ? children : <LoginForm action={action} />}</>
}
