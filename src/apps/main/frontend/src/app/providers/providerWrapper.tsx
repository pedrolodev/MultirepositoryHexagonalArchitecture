'use client'

import { ReactNode } from 'react'
import DimensionsProvider from './dimensionsProvider'
import ActiveSectionProvider from './activeSectionProvider'

export function Providers({ children }: { children: ReactNode }) {
      return (
            <DimensionsProvider>
                  <ActiveSectionProvider>{children}</ActiveSectionProvider>
            </DimensionsProvider>
      )
}
