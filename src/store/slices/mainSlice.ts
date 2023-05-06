import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import type { PayloadAction } from '@reduxjs/toolkit'
import { OutputData } from '@editorjs/editorjs'
import { User } from '../../types'

export interface MainState {
  wallet: string
  profile: User | null
  current: Array<OutputData>
}

const initialState: MainState = {
  wallet: '',
  profile: null,
  current: [],
}
export const MainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    logout: state => {
      // eslint-disable-next-line no-console
      console.log('1')
      state.wallet = ''
      state.profile = null
    },
    login: (state, action: PayloadAction<User>) => {
      state.wallet = action.payload.wallet
      state.profile = action.payload
    },
    changeProfile: (state, action: PayloadAction<User>) => {
      state.profile = action.payload
    },
    saveArticle: (state, action: PayloadAction<OutputData>) => {
      state.current.push(action.payload)
    },
  },
})

export const selectMain = (state: RootState) => state.main

export const { logout, login, changeProfile, saveArticle } = MainSlice.actions

export default MainSlice.reducer
