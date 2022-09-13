import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../../types/user.types'

interface IUserState {
  user: IUser | null
  token: string | null
  isLoading: boolean
  isAuth: boolean
}

const initialState: IUserState = {
  user: null,
  token: null,
  isLoading: false,
  isAuth: false
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
    userFetchingSuccess(state, action: PayloadAction<IUser>) {
      state.isLoading = false
      state.isAuth = true
      state.user = action.payload
    },
    userFetchingError(state) {
      state.isLoading = false
      state.isAuth = false
      state.user = null
    }
  }
})

export const userActions = userSlice.actions

export default userSlice.reducer
