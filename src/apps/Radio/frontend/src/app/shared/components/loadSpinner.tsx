import styles from './loadSpinner.module.css'

export default function LoadSpinner() {
      return (
            <div className={styles.spinner_container}>
                  <div className={styles.spinner}></div>
            </div>
      )
}
