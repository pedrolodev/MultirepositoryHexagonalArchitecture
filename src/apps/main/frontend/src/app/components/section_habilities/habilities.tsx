import React from 'react'
import styles from './habilities.module.css'
import Image from 'next/image'
import { useActiveSection } from '../../../app/providers/contexts'

export default function Habilities() {
      const activeSection = useActiveSection()
      const habilities = [
            'HTML',
            'CSS',
            'Javascript',
            'Typescript',
            'Node',
            'PHP',
            'SQL',
            'NoSQL',
            'Python'
      ]
      return (
            <section className={styles.container} id="habilidades">
                  <div className={styles.image_transition_top} />
                  <div className={styles.container_items}>
                        {habilities.map((hability) => {
                              return (
                                    <div
                                          key={hability}
                                          className={`${styles.item} ${
                                                activeSection !==
                                                      'habilidades' &&
                                                styles.no_visible
                                          }`}
                                    >
                                          <Image
                                                src={`habilidades/${hability
                                                      .toString()
                                                      .toLowerCase()}.svg`}
                                                alt="icono de habilidad"
                                                width={48}
                                                height={48}
                                                className={styles.logo}
                                          />
                                          <div className={styles.title}>
                                                {hability}
                                          </div>
                                    </div>
                              )
                        })}
                  </div>
            </section>
      )
}
