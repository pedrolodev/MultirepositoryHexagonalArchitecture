'use client'
import Filters from '@/components/page/Filters'
import Sections from '@/components/page/Sections'
import { useCustomDispatch, useCustomSelector } from '@/store/connector'
import { initialiceTheme } from '@/store/slices/theme.slice'
import styles from '@/styles/components/page/page.module.scss'
import { Themes } from '@/types/app/page/themes'

import { getCookie } from 'cookies-next'
import { useEffect } from 'react'

export default function Home() {
  const theme = useCustomSelector((state) => state.theme)
  const dispatch = useCustomDispatch()

  useEffect(() => {
    const theme = getCookie('theme') || 'light'
    dispatch(initialiceTheme(theme as Themes))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <main className={`${styles[theme]} ${styles.container} `}>
      <Filters />
      <Sections />
    </main>
  )
}
