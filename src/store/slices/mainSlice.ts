import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ArticleInfo, ProfileInfo } from '../../types'
import { removeArticleBySlug } from '../../utils'

interface MainState {
  wallet: string
  publickey: string
  profile: ProfileInfo | null
  articles: ArticleInfo[]
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
    saveArticle: (state, action: PayloadAction<ArticleInfo>) => {
      state.articles.push(action.payload)
    },
    getAllArticles: (state, action: PayloadAction<ArticleInfo[]>) => {
      state.articles = action.payload
    },
    deleteArticleBySlug: (state, action: PayloadAction<string>) => {
      state.articles = removeArticleBySlug(state.articles, action.payload)
    },
  },
})

export const selectMain = (state: RootState) => state.main

export const { logout, login, changeProfile, saveArticle, getAllArticles, deleteArticleBySlug } = MainSlice.actions

export default MainSlice.reducer
