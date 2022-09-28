import { IUser } from '../../types/user.types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IMessage, IRoom } from '../../types/chat.types'

interface IChatState {
  userList: Array<IUser>
  roomsList: Array<IRoom>
  currentRoom: number | null
  roomMessages: Array<IMessage>
  isRoomLoading: boolean
}

const initialState: IChatState = {
  userList: [],
  roomsList: [],
  currentRoom: null,
  roomMessages: [],
  isRoomLoading: false
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
    },
    setCurrentRoom(state, action: PayloadAction<number>) {
      state.currentRoom = action.payload
    },
    setRoomMessages(state, action: PayloadAction<IMessage[]>) {
      state.roomMessages = action.payload
    },
    switchLoading(state, action: PayloadAction<boolean>) {
      state.isRoomLoading = action?.payload
    }
  }
})

export const chatActions = chatSlice.actions

export default chatSlice.reducer
