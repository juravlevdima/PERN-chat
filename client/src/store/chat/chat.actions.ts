import { chatActions } from './chat.slice'
import { IRoom } from '../../types/chat.types'
import { socketChangeRoom } from '../../socket/socket.fucntions'
import { AppDispatch } from '../../hooks/reduxHooks'

export const changeRoom = (room: IRoom, oldRoom: number | null) => (dispatch: AppDispatch) => {
  socketChangeRoom(room.id, oldRoom)
  dispatch(chatActions.switchLoading(true))
  dispatch(chatActions.setCurrentRoom(room.id))
}
