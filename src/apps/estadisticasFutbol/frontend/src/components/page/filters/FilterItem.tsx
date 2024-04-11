import { useCustomSelector } from '@/store/connector'
import styles from '@/styles/components/page/filters/filterItem.module.scss'

import { ReactNode } from 'react'

interface FilterItemProps {
  children: ReactNode
  header: string
}

export default function FilterItem({ children, header }: FilterItemProps) {
  const theme = useCustomSelector((state) => state.theme)

  return (
    <>
      <div className={`${styles[theme]} ${styles.container_item}`}>
        <div className={`${styles[theme]} ${styles.header}`}>{header}</div>
        <div className={`${styles[theme]} ${styles.content}`}>{children}</div>
      </div>
    </>
  )
}
