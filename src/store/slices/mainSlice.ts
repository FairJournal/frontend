import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Preview, ProfileInfo } from '../../types'
import { removeArticleBySlug } from '../../utils'

interface MainState {
  wallet: string
  publickey: string
  profile: ProfileInfo | null
  articles: Preview[]
}

const initialState: MainState = {
  wallet: '',
  publickey: '',
  profile: null,
  articles: [],
}
export const MainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    logout: state => {
      state.wallet = ''
      state.publickey = ''
      state.profile = null
      state.articles = []
    },
    login: (state, action: PayloadAction<{ wallet: string; publickey: string }>) => {
      state.wallet = action.payload.wallet
      state.publickey = action.payload.publickey
    },
    changeProfile: (state, action: PayloadAction<ProfileInfo>) => {
      state.profile = action.payload
    },
    getAllArticles: (state, action: PayloadAction<Preview[]>) => {
      state.articles = action.payload.sort((a, b) => b.time - a.time)
    },
    deleteArticleBySlug: (state, action: PayloadAction<string>) => {
      state.articles = removeArticleBySlug(state.articles, action.payload)
    },
  },
})

export const selectMain = (state: RootState) => state.main

export const { logout, login, changeProfile, getAllArticles, deleteArticleBySlug } = MainSlice.actions

export default MainSlice.reducer
