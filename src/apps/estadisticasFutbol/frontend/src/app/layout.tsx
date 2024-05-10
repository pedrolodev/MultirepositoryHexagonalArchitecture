import styles from '@/styles/globals.module.scss'
import { ReactNode } from 'react'
import { Providers } from '@/components/Providers'

export const metadata = {
  title: 'Estadisticas Fútbol App',
  description: 'Aplicación para ver estadísticas sobre futbol',
  icons: {
        icon: '/favicon.ico'
  }
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className={styles.container_global}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
