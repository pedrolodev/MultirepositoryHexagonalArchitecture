import { TypeChartStatus } from '@/types/app/page/chart'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type SidebarStatus = 'hidden' | 'visible'

export interface LayoutState {
  sidebar: SidebarStatus
  chartButton: TypeChartStatus
  displayInfo: string
  loading: boolean
  error: boolean
}

const initialState: LayoutState = {
  sidebar: 'visible',
  chartButton: 'bar',
  displayInfo: '',
  loading: true,
  error: false,
}

const layoutSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      let sidebar: SidebarStatus = 'visible'
      if (state.sidebar === 'visible') sidebar = 'hidden'
      return { ...state, sidebar }
    },
    changeChartButton: (
      state,
      action: PayloadAction<{ value: TypeChartStatus }>
    ) => {
      return { ...state, chartButton: action.payload.value }
    },
    setDisplayInfo: (state, action) => {
      return { ...state, displayInfo: action.payload }
    },
    setLoading: (state, action) => {
      return { ...state, loading: action.payload }
    },
    setError: (state, action) => {
      return { ...state, error: action.payload }
    },
  },
})

export const {
  toggleSidebar,
  changeChartButton,
  setDisplayInfo,
  setLoading,
  setError,
} = layoutSlice.actions
export default layoutSlice.reducer
