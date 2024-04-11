import { PartidoOutput } from '../../../../../../Contexts/EstadisticasFutbol/types/Partidos/partido'
import { createSlice } from '@reduxjs/toolkit'

const initialState: PartidoOutput[] = []

const dataFilteredSlice = createSlice({
  name: 'dataFiltered',
  initialState,
  reducers: {
    setDataFiltered: (state, action) => {
      return [...action.payload]
    },
  },
})

export const { setDataFiltered } = dataFilteredSlice.actions
export default dataFilteredSlice.reducer
