import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Article, Profile } from '../../types'
import { removeArticleById, updateArticleById } from '../../utils'

export interface MainState {
  wallet: string
  publickey: string
  profile: Profile | null
  articles: Array<Article>
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
    changeProfile: (state, action: PayloadAction<Profile>) => {
      state.profile = action.payload
    },
    saveArticle: (state, action: PayloadAction<Article>) => {
      state.articles.push(action.payload)
    },
    getAllArticles: (state, action: PayloadAction<Article[]>) => {
      state.articles = action.payload
    },
    deleteArticleById: (state, action: PayloadAction<number>) => {
      state.articles = removeArticleById(state.articles, action.payload)
    },
    updateArticleBy: (state, action: PayloadAction<Article>) => {
      state.articles = updateArticleById(action.payload, state.articles)
    },
  },
})

export const selectMain = (state: RootState) => state.main

export const { logout, login, changeProfile, saveArticle, getAllArticles, deleteArticleById, updateArticleBy } =
  MainSlice.actions

export default MainSlice.reducer
