import styles from './button.module.css'

export default function Button({
      text,
      color,
      onClick
}: {
      text: string
      color: 'red' | 'black' | 'blue'
      onClick: () => void
}) {
      return (
            <button
                  className={`${styles.button} ${styles[color]}`}
                  onClick={onClick}
            >
                  {text}
            </button>
      )
}
