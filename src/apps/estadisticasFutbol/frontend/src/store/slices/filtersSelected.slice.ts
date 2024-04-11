import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  Option,
  OptionEstadisticas,
  OptionEventos,
} from '@/types/app/page/Filter/option'
import { FiltersNames } from '@/types/app/page/Filter'

export type FiltersSelectedState = {
  [Key in FiltersNames]: Key extends 'temporadas'
    ? number
    : Key extends 'competiciones'
    ? string
    : Key extends 'jornadas'
    ? number[]
    : Key extends 'eventos'
    ? OptionEventos[]
    : Key extends 'estadisticas'
    ? OptionEstadisticas[]
    : Option[]
}

const initialState: FiltersSelectedState = {
  equipos: [],
  jugadores: [],
  jornadas: [],
  competiciones: 'La Liga',
  temporadas: 2023,
  eventos: [],
  estadisticas: [],
}

const filtersSelectedSlice = createSlice({
  name: 'filtersSelected',
  initialState,
  reducers: {
    setFiltersSelected: (
      state,
      action: PayloadAction<{
        key: FiltersNames
        value: number | string | number[] | Option[]
      }>
    ) => {
      return { ...state, [action.payload.key]: action.payload.value }
    },
  },
})

export const { setFiltersSelected } = filtersSelectedSlice.actions
export default filtersSelectedSlice.reducer
