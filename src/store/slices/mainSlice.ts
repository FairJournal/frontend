import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface MainState {
  wallet: string
  token: string
}

const initialState: MainState = {
  wallet: '',
  token: '',
}
export const MainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    logout: state => {
      state.wallet = ''
      state.token = ''
    },
    login: state => {
      state.wallet = '111'
      state.token = '2222'
    },
  },
})

export const selectMain = (state: RootState) => state.main

export const { logout, login } = MainSlice.actions

export default MainSlice.reducer
