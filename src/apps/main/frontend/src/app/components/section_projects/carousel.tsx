'use client'
import styles from './carousel.module.css'
import { useState } from 'react'
import { proyectos } from '../../config/proyectos.config'
import { useActiveSection } from '../../../app/providers/contexts'
import Link from 'next/link'

const proyectosLength = proyectos.length + proyectos.length

export default function Carousel() {
      const [index, setIndex] = useState(0)
      const activeSection = useActiveSection()

      const updateIndex = (change: number) => {
            if (index + change > proyectosLength - 1) setIndex((prev) => 0)
            else if (index + change < 0) setIndex((prev) => proyectosLength - 1)
            else setIndex((prev) => prev + change)
      }

      const isProyectActive = () => {
            if (activeSection === 'proyectos') return true
            return false
      }

      const getPosition = (position: number) => {
            if (index === position) {
                  return styles.main
            }
            if (
                  index + 1 === position ||
                  index + 1 === proyectosLength + position
            ) {
                  if (isProyectActive()) return styles.firstNext
                  return `${styles.firstNext} ${styles.no_visible_right}`
            }
            if (
                  index + 2 === position ||
                  index + 2 === proyectosLength + position
            ) {
                  if (isProyectActive()) return styles.secondNext
                  return `${styles.secondNext} ${styles.no_visible_right}`
            }
            if (
                  index + 3 === position ||
                  index + 3 === proyectosLength + position
            ) {
                  return styles.preNext
            }
            if (
                  index - 1 === position ||
                  index + position === proyectosLength - 1
            ) {
                  return styles.firstPrev
            }
            return styles.noPosition
      }

      return (
            <div className={styles.outer_container}>
                  <ul className={styles.slider}>
                        {[...proyectos, ...proyectos].map(
                              (proyecto, indexLoop) => {
                                    return (
                                          <li
                                                className={`${
                                                      styles.item
                                                } ${getPosition(indexLoop)} `}
                                                style={{
                                                      backgroundImage: `url(/cards/${proyecto.project}/background.jpg)`
                                                }}
                                                key={proyecto.id + indexLoop}
                                          >
                                                <div
                                                      className={`${
                                                            styles.content
                                                      } ${
                                                            activeSection !==
                                                                  'proyectos' &&
                                                            index ===
                                                                  indexLoop &&
                                                            styles.no_visible_left
                                                      }
                                                      ${
                                                            index === indexLoop
                                                                  ? styles.active_content
                                                                  : styles.unactive_content
                                                      } `}
                                                >
                                                      <h2
                                                            className={
                                                                  styles.title
                                                            }
                                                      >
                                                            {proyecto.title}
                                                      </h2>
                                                      <p
                                                            className={
                                                                  styles.description
                                                            }
                                                      >
                                                            {
                                                                  proyecto.description
                                                            }
                                                      </p>
                                                      {proyecto.link && (
                                                            <div
                                                                  className={
                                                                        styles.link
                                                                  }
                                                            >
                                                                  <span>
                                                                        Web:{' '}
                                                                  </span>
                                                                  <Link
                                                                        className={
                                                                              styles.button
                                                                        }
                                                                        href={
                                                                              proyecto.link
                                                                        }
                                                                        target="_blank"
                                                                  >
                                                                        {
                                                                              proyecto.link
                                                                        }
                                                                  </Link>
                                                            </div>
                                                      )}

                                                      {proyecto.code.length >
                                                            0 &&
                                                            proyecto.code.map(
                                                                  (repo) => {
                                                                        return (
                                                                              <div
                                                                                    key={
                                                                                          repo.url
                                                                                    }
                                                                                    className={
                                                                                          styles.link
                                                                                    }
                                                                              >
                                                                                    <span>
                                                                                          Código:{' '}
                                                                                    </span>
                                                                                    <Link
                                                                                          className={
                                                                                                styles.button
                                                                                          }
                                                                                          href={
                                                                                                repo.url
                                                                                          }
                                                                                          target="_blank"
                                                                                    >
                                                                                          {
                                                                                                repo.name
                                                                                          }
                                                                                    </Link>
                                                                              </div>
                                                                        )
                                                                  }
                                                            )}
                                                </div>
                                          </li>
                                    )
                              }
                        )}
                  </ul>
                  <nav className={styles.nav}>
                        <button
                              className={`${styles.btn} ${styles.prev} ${
                                    activeSection !== 'proyectos' &&
                                    styles.no_visible_opacity
                              }`}
                              name="arrow-back-outline"
                              onClick={() => updateIndex(-1)}
                        />
                        <button
                              className={`${styles.btn} ${styles.next} ${
                                    activeSection !== 'proyectos' &&
                                    styles.no_visible_opacity
                              }`}
                              name="arrow-forward-outline"
                              onClick={() => updateIndex(1)}
                        />
                  </nav>
            </div>
      )
}
