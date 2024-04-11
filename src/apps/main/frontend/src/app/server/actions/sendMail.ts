'use server'
import axios from 'axios'

export async function sendMail(
      to: string,
      title: string,
      message: string
): Promise<void> {
      try {
            await axios.post(`${process.env.API_ADDRESS}/sendmail`, {
                  to,
                  title,
                  message
            })
      } catch (e) {
            throw new Error()
      }
}
