// nodemailer.mailer.ts
import { Mailer } from '../../../../../../src/Contexts/shared/domain/Mailer'
import * as nodemailer from 'nodemailer'

export class NodemailerMailer implements Mailer {
      private transporter: nodemailer.Transporter
      private user: string

      constructor() {
            this.user = process.env.MAIL_USER || ''
            this.transporter = nodemailer.createTransport({
                  service: 'gmail',
                  auth: {
                        user: this.user,
                        pass: process.env.MAIL_PASS
                  }
            })
      }

      async sendEmail(
            to: string,
            subject: string,
            body: string
      ): Promise<void> {
            const mailOptions: nodemailer.SendMailOptions = {
                  from: {
                        name: 'no_reply',
                        address: this.user
                  },
                  to,
                  subject,
                  text: body
            }

            try {
                  const info = await this.transporter.sendMail(mailOptions)
                  console.log('Correo enviado:', info.response)
            } catch (error) {
                  console.log(error, mailOptions)
                  throw new Error('Error al enviar el correo')
            }
      }
}
