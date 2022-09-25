import { chatActions } from './chat.slice'
import { IRoom } from '../../types/chat.types'
import { socketChangeRoom } from '../../socket/socket.fucntions'

export const changeRoom = (room: IRoom, oldRoom: number | null) => {
  socketChangeRoom(room.id, oldRoom)
  return chatActions.setCurrentRoom(room.id)
}
