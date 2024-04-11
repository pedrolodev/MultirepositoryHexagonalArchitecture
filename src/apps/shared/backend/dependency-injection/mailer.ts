import { NodemailerMailer } from '../../../../../src/Contexts/shared/infraestructure/mailer/nodemailer/NodemailerMailer'
import { ContainerBuilder } from 'node-dependency-injection'

export default function registerMailer(container: ContainerBuilder) {
      container.register('shared.mailer', NodemailerMailer)
}
