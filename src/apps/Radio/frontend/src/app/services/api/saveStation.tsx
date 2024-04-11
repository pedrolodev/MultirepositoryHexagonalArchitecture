'use server'
import { RadioType } from '../../schemas/radioSchema'
import { v4 as uuidv4 } from 'uuid'

const apiAddress = process.env.API_ADDRESS

export default async function saveStation(
      radio: RadioType
): Promise<{ success: boolean; message: string }> {
      const id = uuidv4()
      console.log('PUT', { id, ...radio })
      const res = await fetch(apiAddress + '/stations', {
            method: 'PUT',
            headers: {
                  'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, ...radio })
      })

      if (!res.ok) {
            throw new Error('Failed saving station')
      }

      return { success: true, message: 'ok' }
}
