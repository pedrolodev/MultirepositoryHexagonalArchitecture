'use client'
import { useEffect } from 'react'
import styles from './error.module.css'
import Link from 'next/link'
export default function Error({
      error,
      reset
}: {
      error: Error & { digest?: string }
      reset: () => void
}) {
      useEffect(() => {
            // TODO Log the error to an error reporting service
      }, [error])

      return (
            <div className={styles.container}>
                  <h2>{error.message}</h2>
                  <div className={styles.layout_link}>
                        <Link href="/">Volver al inicio</Link>
                  </div>
            </div>
      )
}
