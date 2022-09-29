import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../../types/user.types'

interface IUserState {
  user: IUser | null
  token: string | null
  isLoading: boolean
  isAuth: boolean
  error: string | null
}

const initialState: IUserState = {
  user: null,
  token: null,
  isLoading: false,
  isAuth: false,
  error: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload
    },
    userFetching(state) {
      state.isLoading = true
    },
    resetError(state) {
      state.error = null
    },
    userFetchingSuccess(state, action: PayloadAction<IUser>) {
      state.isLoading = false
      state.isAuth = true
      state.user = action.payload
      state.error = null
    },
    userFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false
      state.isAuth = false
      state.user = null
      state.error = action.payload
    },
    signOut(state) {
      state.isAuth = false
      state.user = null
      state.token = null
    }
  }
})

export const userActions = userSlice.actions

export default userSlice.reducer
