'use client'
import styles from './loginForm.module.css'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-hot-toast'
import { LoginSchema, LoginType } from '../../../schemas/loginSchema'
export default function LoginForm({
      action
}: {
      action: (
            user: LoginType
      ) => Promise<{ success: boolean; message: string }>
}) {
      const {
            register,
            handleSubmit,
            formState: { errors }
      } = useForm<LoginType>({ resolver: zodResolver(LoginSchema) })

      const processForm: SubmitHandler<LoginType> = async (user) => {
            const result = await action(user)
            toast(result.message)
      }

      return (
            <div className={styles.login_container}>
                  <div className={styles.login_form}>
                        <form onSubmit={handleSubmit(processForm)}>
                              <input
                                    {...register('username')}
                                    placeholder="username"
                                    autoComplete="username"
                              />
                              {errors.username?.message && (
                                    <p>{errors.username.message}</p>
                              )}

                              <input
                                    {...register('password')}
                                    type="password"
                                    placeholder="password"
                                    autoComplete="current-password"
                              />
                              {errors.password?.message && (
                                    <p>{errors.password.message}</p>
                              )}

                              <input
                                    className={styles.button}
                                    type="submit"
                                    value="Entrar"
                              />
                        </form>
                  </div>
            </div>
      )
}
