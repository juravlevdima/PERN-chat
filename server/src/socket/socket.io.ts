import { Server, Socket } from 'socket.io'
import { IJoinedUser } from '../types/user.types'
import RoomModel from '../models/RoomModel'
import MessageModel from '../models/MessageModel'
import UserModel from '../models/UserModel'
import { IRoomWithMessages } from '../types/chat.types'

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
      const roomList = await RoomModel.findAll()
      socket.emit('room:update_list', roomList)
    })


    socket.on('room:create', async (name: string) => {
      await RoomModel.create({ name })
      const roomList = await RoomModel.findAll()
      io.sockets.emit('room:update_list', roomList)
    })


    socket.on('room:send_message', async ({ text, userId, roomId }) => {
      // @ts-ignore
      await MessageModel.create({ text, userId, roomId })

      const room = await RoomModel.findByPk(roomId, {
        include: {
          model: MessageModel,
          as: 'messages',
          include: [{ model: UserModel, as: 'user', attributes: ['name'] }]
        }
      }) as IRoomWithMessages

      io.sockets.in(String(roomId)).emit('room:update_room_messages', room.messages)
    })


    socket.on('room:get_messages', async ({ roomId, oldRoom }) => {
      await socket.leave(String(oldRoom))
      await socket.join(String(roomId))
      const room = await RoomModel.findByPk(roomId, {
        include: {
          model: MessageModel,
          as: 'messages',
          include: [{ model: UserModel, as: 'user', attributes: ['name'] }]
        }
      }) as IRoomWithMessages

      if (room) {
        socket.emit('room:update_room_messages', room.messages)
      }
    })
  })
}

export default listenSocketEndpoints
