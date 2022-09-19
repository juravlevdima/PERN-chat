import { Server, Socket } from 'socket.io'
import { IUserPublicData } from '../types/user.types'

const onlineUsers = new Map()

const listenSocketEndpoints = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log('socket connected:\n', socket.id)

    socket.on('user:join', (user: IUserPublicData) => {
      onlineUsers.set(socket.id, user)
      const users = [...onlineUsers.values()]
      io.sockets.emit('user:joined', users)
    })

    socket.on('disconnect', () => {
      onlineUsers.delete(socket.id)
      const users = [...onlineUsers.values()]
      io.sockets.emit('user:disconnected', users)
    })
  })
}

export default listenSocketEndpoints
