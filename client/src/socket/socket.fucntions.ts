import { socket } from './SocketProvider'

type RoomT = number | null

export const socketChangeRoom = (currentRoom: RoomT, oldRoom: RoomT) => {
  socket.emit('room:get_messages', { roomId: currentRoom, oldRoom })
}
