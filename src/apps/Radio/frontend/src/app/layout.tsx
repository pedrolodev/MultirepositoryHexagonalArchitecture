import 'server-only'
import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { ReactNode } from 'react'
import Header from './components/header'
import Footer from './components/footer'

export const metadata: Metadata = {
      title: 'Radio App',
      description:
            'El lugar donde poder escuchar la radio que quieras con retardo'
}

export default async function RootLayout({
      children
}: {
      children: ReactNode
}) {
      return (
            <html lang="es">
                  <body>
                        <Header />
                        <main>{children}</main>
                        <Footer />

                        <Toaster position="top-center" />
                  </body>
            </html>
      )
}
