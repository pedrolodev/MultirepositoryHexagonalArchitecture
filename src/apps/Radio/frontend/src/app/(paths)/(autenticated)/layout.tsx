import 'server-only'
import { ReactNode } from 'react'
import Login from './components/login'

export default async function NameStationLayout({
      children
}: {
      children: ReactNode
}) {
      return (
            <>
                  <Login>{children}</Login>
            </>
      )
}
