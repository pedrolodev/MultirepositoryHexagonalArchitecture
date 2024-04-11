'use client'
import { useState, useEffect } from 'react'

export default function useScrollHeight() {
      const [windowHeight, setWindowHeight] = useState(0)

      useEffect(() => {
            const handleScroll = () => {
                  setWindowHeight(window.scrollY)
            }
            handleScroll()
            window.addEventListener('scroll', handleScroll)
            return () => {
                  window.removeEventListener('scroll', handleScroll)
            }
      }, [])

      return windowHeight
}
