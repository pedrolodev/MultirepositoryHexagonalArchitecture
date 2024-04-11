import { themesList } from '@/config/app/themes'
import { Themes } from '@/types/app/page/themes'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { setCookie } from 'cookies-next'

const initialState = themesList[0]

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    initialiceTheme: (state, action: PayloadAction<Themes>) => {
      setCookie('theme', action.payload)
      return action.payload
    },
    toggleTheme: (state) => {
      const newTheme = state === 'light' ? 'dark' : 'light'
      setCookie('theme', newTheme)
      return newTheme
    },
  },
})

export const { initialiceTheme, toggleTheme } = themeSlice.actions
export default themeSlice.reducer
