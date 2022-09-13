import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './user/user.slice'

const rootReducer = combineReducers({
  user: userReducer
})

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
})

export type RootState = ReturnType<typeof store.getState>

export default store
