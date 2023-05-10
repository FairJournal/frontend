import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Article, User } from '../../types'
import { removeArticleById } from '../../utils'

export interface MainState {
  wallet: string
  profile: User | null
  articles: Array<Article>
}

const initialState: MainState = {
  wallet: '',
  profile: null,
  articles: [],
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
    saveArticle: (state, action: PayloadAction<Article>) => {
      state.articles.push(action.payload)
    },
    getAllArticles: (state, action: PayloadAction<Article[]>) => {
      state.articles = action.payload
    },
    deleteArticleById: (state, action: PayloadAction<number>) => {
      state.articles = removeArticleById(state.articles, action.payload)
    },
  },
})

export const selectMain = (state: RootState) => state.main

export const { logout, login, changeProfile, saveArticle, getAllArticles, deleteArticleById } = MainSlice.actions

export default MainSlice.reducer
