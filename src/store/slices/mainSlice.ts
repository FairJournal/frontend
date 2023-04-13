import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import type { PayloadAction } from '@reduxjs/toolkit'

export type Profile = {
  id: string
  avatar: string
  title: string
  bio: string
}
export interface MainState {
  wallet: string
  token: string
  profile: Profile
}

const initialState: MainState = {
  wallet: '0xb59519826deef8e7438fF30E20d8cDeA318B8ADf',
  token: '0xb59519826deef8e7438fF30E20d8cDeA318B8ADf',
  profile: { id: '1', avatar: '', title: '', bio: '' },
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
    changeProfile: (state, action: PayloadAction<Profile>) => {
      state.profile = action.payload
    },
  },
})

export const selectMain = (state: RootState) => state.main

export const { logout, login, changeProfile } = MainSlice.actions

export default MainSlice.reducer
