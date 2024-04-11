import layoutReducer, { LayoutState } from './slices/layout.slice'
import filtersAgrupacionReducer, {
  FiltersAgrupacionState,
} from './slices/filtersAgrupacion.slice'

import { configureStore } from '@reduxjs/toolkit'
import { PartidoOutput } from '../../../../../Contexts/EstadisticasFutbol/types/Partidos/partido'
import dataRawReducer from './slices/dataRaw.slice'
import themeReducer from './slices/theme.slice'
import dataFilteredReducer from './slices/dataFiltered.slice'
import filtersReducer, { FiltersState } from './slices/filters.slice'
import filtersSelectedReducer, {
  FiltersSelectedState,
} from './slices/filtersSelected.slice'
import { Themes } from '@/types/app/page/themes'

// Definición del estado global
export interface RootState {
  layout: LayoutState
  filters: FiltersState
  filtersAgrupacion: FiltersAgrupacionState
  filtersSelected: FiltersSelectedState
  dataRaw: PartidoOutput[]
  dataFiltered: PartidoOutput[]
  theme: Themes
}

export const store = configureStore({
  reducer: {
    layout: layoutReducer,
    filters: filtersReducer,
    filtersAgrupacion: filtersAgrupacionReducer,
    filtersSelected: filtersSelectedReducer,
    dataRaw: dataRawReducer,
    dataFiltered: dataFilteredReducer,
    theme: themeReducer || null,
  },
})

// Definición del despachador
export type AppDispatch = typeof store.dispatch
