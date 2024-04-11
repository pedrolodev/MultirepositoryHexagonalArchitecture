'use client'
import React, { ReactNode } from 'react'
import styles from '@/styles/shared/components/loader.module.scss'
import { useCustomSelector } from '@/store/connector'

interface LoaderProps {
  condition: boolean
  type?: 'bar' | 'circle'
  children: ReactNode
}

const Loader = ({ condition, type = 'bar', children }: LoaderProps) => {
  const theme = useCustomSelector((state) => state.theme)

  return (
    <>
      {condition ? (
        children
      ) : (
        <div
          className={`${styles[theme]} ${styles[`loader_animation_${type}`]}`}
        >
          <div className={`${styles[theme]} ${styles[`loader_${type}`]}`} />
        </div>
      )}
    </>
  )
}

export default Loader
