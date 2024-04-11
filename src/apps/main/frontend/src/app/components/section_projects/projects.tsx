import Carousel from './carousel'
import styles from './projects.module.css'

export default function Projects() {
      return (
            <div className={styles.container} id="proyectos">
                  <div className={`${styles.image_transition_top}`}></div>
                  <Carousel />
                  <div className={`${styles.image_transition_bottom}`}></div>
            </div>
      )
}
