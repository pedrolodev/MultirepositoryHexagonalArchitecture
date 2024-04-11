'use client'
import { themesList } from '@/config/app/themes'
import { useCustomDispatch, useCustomSelector } from '@/store/connector'
import { initialiceTheme } from '@/store/slices/theme.slice'
import { Themes } from '@/types/app/page/themes'
import React, { useState } from 'react'
import styles from '@/styles/components/page/filters/ThemeSelector.module.scss'
import Image from 'next/image'

export default function ThemeSelector() {
  const [isMenuOpen, setMenuOpen] = useState(false)
  const dispatch = useCustomDispatch()
  const theme = useCustomSelector((state) => state.theme)

  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen)
  }

  const handleThemeChange = (selectedTheme: Themes) => {
    dispatch(initialiceTheme(selectedTheme))
    setMenuOpen(false)
  }

  return (
    <div className={`${styles.theme_selector_container} ${styles[theme]}`}>
      <Image
        className={` ${styles[theme]}`}
        src={`/assets/sidebar/theme_${theme}.svg`}
        height={30}
        width={30}
        onClick={handleMenuToggle}
        alt="Theme Icon Button"
      />
      {isMenuOpen && (
        <div className={`${styles.theme_selector_menu} ${styles[theme]}`}>
          {themesList.map((themeLoop) => (
            <span
              className={`${styles.theme_selector_item} ${styles[theme]}`}
              key={themeLoop}
              onClick={() => handleThemeChange(themeLoop)}
            >
              {themeLoop}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
