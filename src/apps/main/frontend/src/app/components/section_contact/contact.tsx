'use client'
import styles from './contact.module.css'
import { contactSchema, contactType } from '../../schemas/contact'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { sendMail } from '../../..//app/server/actions/sendMail'
import { toast } from 'react-toastify'
import { useActiveSection } from '../../../app/providers/contexts'

export default function Contact() {
      const activeSection = useActiveSection()

      const {
            register,
            reset,
            handleSubmit,
            formState: { errors }
      } = useForm<contactType>({ resolver: zodResolver(contactSchema) })

      const onSubmit: SubmitHandler<contactType> = async (data) => {
            const sendMailPromise = sendMail(
                  'jesuspedrolopezlopez10@gmail.com',
                  'Contact Message mainPage',
                  `Email: ${data.email} <br/> Mensaje:${data.message}`
            )

            await toast.promise(sendMailPromise, {
                  pending: 'Enviando mensaje',
                  success: 'Su mensaje ha sido enviado correctamente',
                  error: 'Ha sucedido un problema, el Administrador ya ha sido informado, vuelva a intentarlo más tarde'
            })

            reset()
      }

      return (
            <section className={styles.container} id="contacto">
                  <form
                        onSubmit={handleSubmit(onSubmit)}
                        className={`${styles.input_group} ${
                              activeSection === 'contacto' && styles.visible
                        }`}
                  >
                        <input
                              className={`${styles.input} ${
                                    errors.email && styles.error
                              }`}
                              autoComplete="off"
                              placeholder="Email"
                              {...register('email')}
                        />
                        <textarea
                              className={`${styles.input_textarea} ${
                                    errors.message && styles.error
                              }`}
                              placeholder="Mensaje"
                              {...register('message')}
                        />

                        <button type="submit" className={styles.button}>
                              Enviar
                        </button>
                  </form>
                  <div className={styles.contact_alternative}>
                        <div
                              className={`${styles.tarjeta} ${
                                    activeSection !== 'contacto' &&
                                    styles.tarjeta_no_visible
                              }`}
                        >
                              <h2 className={styles.titulo}>Correo</h2>
                              <p className={styles.correoElectronico}>
                                    tucorreo@email.com
                              </p>
                        </div>
                        <div
                              className={`${styles.tarjeta} ${
                                    activeSection !== 'contacto' &&
                                    styles.tarjeta_no_visible
                              }`}
                        >
                              <h2 className={styles.titulo}>GitHub</h2>
                              <p className={styles.correoElectronico}>
                                    github.com/jesuspedrolodev
                              </p>
                        </div>
                  </div>
            </section>
      )
}
