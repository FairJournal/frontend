import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { MainSlice } from './slices/mainSlice'

export const store = configureStore({
  reducer: {
    main: MainSlice.reducer,
    //[api.reducerPath]: api.reducer
  },
  //middleware: (getDefaultMiddleware)=>getDefaultMiddleware().concat(api.middleware)
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
