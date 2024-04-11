import { FiltersNames } from '@/types/app/page/Filter'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type FiltersAgrupacion = Extract<
  FiltersNames,
  'equipos' | 'jugadores' | 'jornadas'
>

export type FiltersAgrupacionState = {
  options: FiltersAgrupacion[]
  selected: FiltersAgrupacion
}

const initialState = {
  options: ['equipos', 'jugadores', 'jornadas'],
  selected: 'equipos',
}

const filtersAgrupacionSlice = createSlice({
  name: 'filtersAgrupacion',
  initialState,
  reducers: {
    setFiltersAgrupacion: (state, action: PayloadAction<FiltersAgrupacion>) => {
      return { ...state, selected: action.payload }
    },
  },
})

export const { setFiltersAgrupacion } = filtersAgrupacionSlice.actions
export default filtersAgrupacionSlice.reducer
