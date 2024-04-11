import { z } from 'zod'

const contactSchema = z.object({
      email: z.string().email(),
      message: z.string().min(1)
})

export type contactType = z.infer<typeof contactSchema>

export { contactSchema }
