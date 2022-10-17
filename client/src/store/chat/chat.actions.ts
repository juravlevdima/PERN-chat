import { chatActions } from './chat.slice'
import { socketChangeRoom } from '../../socket/socket.fucntions'
import { AppDispatch } from '../../hooks/reduxHooks'

export const changeRoom = (roomId: number, oldRoom: number | null) => (dispatch: AppDispatch) => {
  socketChangeRoom(roomId, oldRoom)
  dispatch(chatActions.switchLoading(true))
  dispatch(chatActions.setCurrentRoom(roomId))
}
