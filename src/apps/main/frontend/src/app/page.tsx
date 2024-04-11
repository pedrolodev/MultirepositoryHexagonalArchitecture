'use client'
import styles from './page.module.css'
import Projects from './components/section_projects/projects'
import Sobremi from './components/section_sobremi/sobremi'
import Contact from './components/section_contact/contact'
import Habilities from './components/section_habilities/habilities'
import Loader from './components/loader'
import { useDimensions } from './providers/contexts'

export default function Home() {
      const { width } = useDimensions()

      return (
            <main className={styles.main}>
                  <div className={styles.grid}>
                        {width === 0 ? (
                              <Loader type="circle" />
                        ) : (
                              <>
                                    <Sobremi />
                                    <Projects />
                                    <Contact />
                                    <Habilities />
                              </>
                        )}
                  </div>
            </main>
      )
}
