import { PartidoOutput } from '../../../../../../Contexts/EstadisticasFutbol/types/Partidos/partido'
import { createSlice } from '@reduxjs/toolkit'

const initialState: PartidoOutput[] = []

const dataRawSlice = createSlice({
  name: 'dataRaw',
  initialState,
  reducers: {
    setDataRaw: (state, action) => {
      return [...action.payload]
    },
  },
})

export const { setDataRaw } = dataRawSlice.actions
export default dataRawSlice.reducer
