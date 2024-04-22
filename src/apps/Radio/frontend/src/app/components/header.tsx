'use client'
import Link from 'next/link'
import styles from './header.module.css'
import { useEffect, useState } from 'react'

export default function Header() {
      const [isScrolled, setIsScrolled] = useState(false)

      useEffect(() => {
            const handleScroll = () => {
                  if (window.scrollY > 0) {
                        setIsScrolled(true)
                  } else {
                        setIsScrolled(false)
                  }
            }

            window.addEventListener('scroll', handleScroll)

            return () => {
                  window.removeEventListener('scroll', handleScroll)
            }
      }, [])

      return (
            <header
                  className={`${styles.header} ${isScrolled && styles.active}`}
            >
                  <nav className={styles.nav}>
                        <Link className={styles.link} href="/" prefetch={false}>
                              Inicio
                        </Link>
                        <Link
                              className={styles.link}
                              href="/admin"
                              prefetch={false}
                        >
                              Administración
                        </Link>
                  </nav>
            </header>
      )
}
