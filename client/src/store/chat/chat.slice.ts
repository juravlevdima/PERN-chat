import { IUser } from '../../types/user.types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IRoom } from '../../types/chat.types'

interface IChatState {
  userList: Array<IUser>
  roomsList: Array<IRoom>
}

const initialState: IChatState = {
  userList: [],
  roomsList: []
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    updateUserList(state, action: PayloadAction<IUser[]>) {
      state.userList = action.payload
    },
    updateRoomsList(state, action: PayloadAction<IRoom[]>) {
      state.roomsList = action.payload
    }
  }
})

export const chatActions = chatSlice.actions

export default chatSlice.reducer
