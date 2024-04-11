import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  Option,
  OptionEventos,
  OptionEstadisticas,
} from '@/types/app/page/Filter/option'
import { FiltersNames } from '@/types/app/page/Filter'

export type FiltersState = {
  [Key in FiltersNames]: Key extends 'temporadas'
    ? Record<string, number[]>
    : Key extends 'jornadas'
    ? number[]
    : Key extends 'eventos'
    ? OptionEventos[]
    : Key extends 'estadisticas'
    ? OptionEstadisticas[]
    : Option[]
}

const initialState: FiltersState = {
  equipos: [],
  jugadores: [],
  jornadas: [],
  competiciones: [],
  temporadas: {},
  eventos: [],
  estadisticas: [],
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilters: (
      state,
      action: PayloadAction<{
        key: FiltersNames
        value:
          | Option[]
          | OptionEstadisticas[]
          | OptionEventos[]
          | number[]
          | Record<string, number[]>
      }>
    ) => {
      return { ...state, [action.payload.key]: action.payload.value }
    },
  },
})

export const { setFilters } = filtersSlice.actions
export default filtersSlice.reducer
