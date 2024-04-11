'use client'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RadioSchema, RadioType } from '../../../schemas/radioSchema'

export default function AddRadioForm({
      action
}: {
      action: (
            user: RadioType
      ) => Promise<{ success: boolean; message: string }>
}) {
      const {
            register,
            handleSubmit,
            formState: { errors }
      } = useForm<RadioType>({
            resolver: zodResolver(RadioSchema)
      })

      const onSubmit: SubmitHandler<RadioType> = async (data) => {
            await action(data)
      }

      return (
            <div>
                  <h2>Añadir Radio a la Base de Datos</h2>
                  <form onSubmit={handleSubmit(onSubmit)}>
                        <input {...register('name')} placeholder="name" />
                        {errors.name?.message && <p>{errors.name.message}</p>}
                        <br />
                        <input {...register('url')} placeholder="url" />
                        {errors.url?.message && <p>{errors.url.message}</p>}
                        <br />

                        <select {...register('scope')}>
                              <option value="local">Local</option>
                              <option value="nacional">Nacional</option>
                        </select>
                        {errors.scope?.message && <p>{errors.scope.message}</p>}

                        <br />
                        <button type="submit">Añadir Radio</button>
                  </form>
            </div>
      )
}
