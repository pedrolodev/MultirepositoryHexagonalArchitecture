'use client'
import { useState } from 'react'
import styles from '@/styles/shared/components/genericList.module.scss'
import { useCustomSelector } from '@/store/connector'

interface ListProps {
  items: string[]
  onClick: (selected: string) => void
}

export default function GenericList({ items, onClick }: ListProps) {
  const [selectedItem, setSelectedItem] = useState<string | null>(items[0])
  const theme = useCustomSelector((state) => state.theme)

  const handleItemClick = (item: string) => {
    setSelectedItem(item)
    onClick(item)
  }

  return (
    <ul className={`${styles[theme]} ${styles.list}`}>
      {items.map((item, index) => (
        <li
          key={index}
          onClick={() => handleItemClick(item)}
          className={`${styles[theme]} ${styles.item} ${
            selectedItem === item ? styles.selected : ''
          }`}
        >
          {item.charAt(0).toUpperCase() + item.slice(1)}
        </li>
      ))}
    </ul>
  )
}
