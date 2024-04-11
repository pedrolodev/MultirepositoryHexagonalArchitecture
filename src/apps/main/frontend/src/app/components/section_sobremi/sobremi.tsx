import { useState } from 'react'
import styles from './sobremi.module.css'
import Particles from './particles'
import Image from 'next/image'
import { useDimensions } from '../../../app/providers/contexts'
import { parrafos } from './sobremi.config'

export default function Sobremi() {
      const [animationComplete, setAnimationComplete] = useState(false)
      const { width } = useDimensions()
      return (
            <section className={styles.container} id="sobremi">
                  {!animationComplete && width > 600 && (
                        <button
                              className={styles.skip_button}
                              onClick={() => setAnimationComplete(true)}
                        >
                              SALTAR
                        </button>
                  )}
                  <Particles quantity={100} />
                  {width > 600 && (
                        <Image
                              className={styles.intro_title}
                              src="/sobremi/title.png"
                              alt="title sobre mi"
                              width={0}
                              height={0}
                              sizes="100vw"
                              style={{
                                    width: '50%',
                                    height: 'auto'
                              }}
                        />
                  )}
                  <div
                        className={` ${
                              width === 0
                                    ? styles.no_visible
                                    : animationComplete || width < 600
                                    ? styles.post_animation
                                    : styles.intro
                        }`}
                  >
                        <div onAnimationEnd={() => setAnimationComplete(true)}>
                              <h1>Jesús Pedro. Desarrollador Full Stack</h1>
                              {parrafos.map((parrafo, index) => {
                                    return <p key={index}>{parrafo}</p>
                              })}
                              <p>¡Gracias por visitar mi portfolio!</p>
                        </div>
                  </div>
            </section>
      )
}
