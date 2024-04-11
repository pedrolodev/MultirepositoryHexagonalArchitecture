import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux'
import { RootState, AppDispatch } from './store'

export const useCustomSelector: TypedUseSelectorHook<RootState> = useSelector
export const useCustomDispatch = () => useDispatch<AppDispatch>()
