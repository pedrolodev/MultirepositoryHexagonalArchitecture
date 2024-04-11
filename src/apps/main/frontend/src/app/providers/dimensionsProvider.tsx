import { useState, useEffect, ReactNode } from 'react'
import { WindowDimensionsContext } from './contexts'

export default function DimensionsProvider({
      children
}: {
      children: ReactNode
}) {
      const [windowDimensions, setWindowDimensions] = useState<{
            height: number
            width: number
      }>({ height: 0, width: 0 })
      useEffect(() => {
            setWindowDimensions((prev) => ({
                  ...prev,
                  height: window.innerHeight,
                  width: innerWidth
            }))
            const handleResize = () => {
                  setWindowDimensions((prev) => ({
                        ...prev,
                        height: window.innerHeight,
                        width: innerWidth
                  }))
            }

            window.addEventListener('resize', handleResize)

            return () => {
                  window.removeEventListener('resize', handleResize)
            }
      }, [])

      return (
            <WindowDimensionsContext.Provider value={windowDimensions}>
                  {children}
            </WindowDimensionsContext.Provider>
      )
}
