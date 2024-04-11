'use client'
import { store } from '@/store/store'
import { ReactNode } from 'react'
import { Provider } from 'react-redux'

interface StoreProps {
  children: ReactNode
}

export function StoreProvider({ children }: StoreProps) {
  return <Provider store={store}>{children}</Provider>
}
