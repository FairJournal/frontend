import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import type { PayloadAction } from '@reduxjs/toolkit'
import { OutputData } from '@editorjs/editorjs'

export type Profile = {
  id: string
  avatar: string
  title: string
  bio: string
}
export interface MainState {
  wallet: string
  token: string
  profile: Profile | null
  current: Array<OutputData>
}

const initialState: MainState = {
  wallet: '',
  token: '0xb59519826deef8e7438fF30E20d8cDeA318B8ADf',
  profile: null,
  current: [],
}
export const MainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    logout: state => {
      state.wallet = ''
      state.token = ''
      state.profile = null
    },
    login: (state, action: PayloadAction<string>) => {
      state.wallet = action.payload
      state.token = '2222'
      state.profile = { id: '1', avatar: '', title: '', bio: '' }
    },
    changeProfile: (state, action: PayloadAction<Profile>) => {
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
