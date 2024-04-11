import { z } from 'zod'

export const RadioSchema = z.object({
      name: z.string().min(3, 'Mínimo 3 caracteres'),
      url: z.string().url(),
      scope: z.union([z.literal('local'), z.literal('nacional')])
})
export type RadioType = z.infer<typeof RadioSchema>
