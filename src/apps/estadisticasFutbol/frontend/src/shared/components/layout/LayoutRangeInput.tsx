'use client'
import styles from '@/styles/shared/components/layout/LayoutRangeInput.module.scss'
import { ReactNode } from 'react'
import { useCustomSelector } from '@/store/connector'

export default function LayoutRangeInput({
  children,
  cabecera,
}: {
  children: ReactNode
  cabecera: string
}) {
  const theme = useCustomSelector((state) => state.theme)
  return (
    <div className={`${styles[theme]} ${styles.container_range_input}`}>
      <span className={`${styles[theme]} ${styles.header_range_input}`}>
        {cabecera}
      </span>
      {children}
    </div>
  )
}
