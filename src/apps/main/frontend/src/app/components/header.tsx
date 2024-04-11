'use client'
import Link from 'next/link'
import styles from './header.module.css'
import { secciones } from '../config/secciones.config'
import { useActiveSection } from '../providers/contexts'

export default function Header() {
      const activeSection = useActiveSection()

      return (
            <>
                  <header className={styles.header}>
                        <nav className={styles.nav}>
                              {secciones.map((seccion) => {
                                    return (
                                          <Link
                                                key={seccion.id}
                                                className={`${styles.link} ${
                                                      activeSection ===
                                                            seccion.id &&
                                                      styles.active_link
                                                }`}
                                                href={`#${seccion.id}`}
                                          >
                                                <div>{seccion.name}</div>
                                          </Link>
                                    )
                              })}
                        </nav>
                  </header>
            </>
      )
}
