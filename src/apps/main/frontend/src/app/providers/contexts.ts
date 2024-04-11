import { createContext, useContext } from 'react'

export const WindowDimensionsContext = createContext({ height: 0, width: 0 })
export const useDimensions = () => useContext(WindowDimensionsContext)

export const ActiveSectionContext = createContext('')
export const useActiveSection = () => useContext(ActiveSectionContext)
