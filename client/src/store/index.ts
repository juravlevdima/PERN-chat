import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './user/user.slice'
import chatReducer from './chat/chat.slice'

const rootReducer = combineReducers({
  user: userReducer,
  chat: chatReducer
})

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
})

export type RootState = ReturnType<typeof store.getState>

export default store
