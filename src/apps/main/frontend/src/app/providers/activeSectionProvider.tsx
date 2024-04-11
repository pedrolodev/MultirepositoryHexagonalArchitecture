import { useState, useEffect, ReactNode, useLayoutEffect } from 'react'
import { ActiveSectionContext, useDimensions } from './contexts'
import { secciones } from '../config/secciones.config'
import useScrollHeight from '../hooks/useWindowScrollHeight'

export default function ActiveSectionProvider({
      children
}: {
      children: ReactNode
}) {
      const scrollY = useScrollHeight()
      const [activeSection, setActiveSection] = useState(secciones[0].id)
      const [sectionsHeights, setSectionsHeights] = useState<
            {
                  id: string
                  name: string
                  offsetTop: number | undefined
                  offsetHeight: number | undefined
            }[]
      >([])
      const { width, height } = useDimensions()

      useEffect(() => {
            const seccionHeightsTemporal: any[] = []
            secciones.forEach((seccion) => {
                  const offsetTop = document.getElementById(
                        seccion.id
                  )?.offsetTop
                  const offsetHeight = document.getElementById(
                        seccion.id
                  )?.offsetHeight
                  const newSection = Object.assign(
                        { offsetTop, offsetHeight },
                        seccion
                  )
                  seccionHeightsTemporal.push(newSection)
            })
            setSectionsHeights((prev) => [...seccionHeightsTemporal])
      }, [width, height])

      useEffect(() => {
            const idActiveSection = sectionsHeights.find((seccion) => {
                  if (
                        seccion.offsetTop &&
                        seccion.offsetHeight &&
                        seccion.offsetTop + seccion.offsetHeight - 200 > scrollY
                  ) {
                        return true
                  }

                  return false
            })?.id
            if (idActiveSection) setActiveSection((prev) => idActiveSection)
      }, [scrollY, sectionsHeights])

      return (
            <ActiveSectionContext.Provider value={activeSection}>
                  {children}
            </ActiveSectionContext.Provider>
      )
}
