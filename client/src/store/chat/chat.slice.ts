import { IUser } from '../../types/user.types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IChatState {
  userList: Array<IUser>
}

const initialState: IChatState = {
  userList: []
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    updateUserList(state, action: PayloadAction<IUser[]>) {
      state.userList = action.payload
    }
  }
})

export const chatActions = chatSlice.actions

export default chatSlice.reducer
