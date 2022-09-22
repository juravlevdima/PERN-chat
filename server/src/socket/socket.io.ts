import { Server, Socket } from 'socket.io'
import { IJoinedUser } from '../types/user.types'
import RoomModel from '../models/RoomModel'
import MessageModel from '../models/MessageModel'
import UserModel from '../models/UserModel'

const onlineUsers = new Map()

const listenSocketEndpoints = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    socket.on('user:join', ({ user }: IJoinedUser) => {
      onlineUsers.set(socket.id, user)
      const users = [...onlineUsers.values()]
      io.sockets.emit('user:joined', users)
    })

    socket.on('disconnect', () => {
      onlineUsers.delete(socket.id)
      const users = [...onlineUsers.values()]
      io.sockets.emit('user:disconnected', users)
    })

    socket.on('room:get_list', async () => {
      // const roomList = await RoomModel.findAll({ include: [{ all: true, nested: true }] })
      const roomList = await RoomModel.findAll({
        include: {
          model: MessageModel,
          as: 'messages',
          include: [{ model: UserModel, as: 'user', attributes: ['name'] }]
        }
      })
      socket.emit('room:update_list', roomList)
    })

    socket.on('room:create', async (name: string) => {
      await RoomModel.create({ name })
      const roomList = await RoomModel.findAll({
        include: {
          model: MessageModel,
          as: 'messages',
          include: [{ model: UserModel, as: 'user', attributes: ['name'] }]
        }
      })
      io.sockets.emit('room:update_list', roomList)
    })
  })
}

export default listenSocketEndpoints
