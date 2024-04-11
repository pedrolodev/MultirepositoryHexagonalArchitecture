'use client'
import { useCustomDispatch, useCustomSelector } from '@/store/connector'
import styles from '@/styles/components/page/filters/menuBar.module.scss'
import Image from 'next/image'
import { toggleSidebar } from '../../../store/slices/layout.slice'
import ThemeSelector from './ThemeSelector'

export default function MenuBar() {
  const { sidebar, displayInfo } = useCustomSelector((state) => state.layout)
  const theme = useCustomSelector((state) => state.theme)

  const dispatch = useCustomDispatch()

  const toggleFilters = () => {
    dispatch(toggleSidebar())
  }

  return (
    <>
      <div className={`${styles.container_menuBar} ${styles[sidebar]}`}>
        <Image
          className={`${styles.pagination_button} ${styles[theme]}`}
          onClick={toggleFilters}
          src={`/assets/sidebar/sidebar_left_${theme}.svg`}
          height={30}
          width={30}
          alt="Sidebar pagination"
        />
        <div className={`${styles.display_info} ${styles[theme]}`}>
          {displayInfo}
        </div>

        <ThemeSelector />
      </div>
    </>
  )
}
