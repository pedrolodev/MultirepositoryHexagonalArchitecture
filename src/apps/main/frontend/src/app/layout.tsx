import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/header'
import Footer from './components/footer'
import { Providers } from './providers/providerWrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
      title: 'Portfolio Jesus Pedro',
      description: ''
}

export default function RootLayout({ children }: { children: ReactNode }) {
      return (
            <html lang="es">
                  <body className={inter.className}>
                        <Providers>
                              <Header />
                              {children}
                              <Footer />
                              <ToastContainer />
                        </Providers>
                  </body>
            </html>
      )
}
