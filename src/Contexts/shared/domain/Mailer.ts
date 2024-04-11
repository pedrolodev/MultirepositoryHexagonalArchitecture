export interface Mailer {
      sendEmail(to: string, subject: string, body: string): Promise<void>
}
