import io, { Socket } from 'socket.io-client'
import { createContext, FC, PropsWithChildren, useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { IUser } from '../types/user.types'
import { chatActions } from '../store/chat/chat.slice'
import { IMessage, IRoom } from '../types/chat.types'

export interface ISocketContext {
  socketInitialize: () => void
  updateUserList: () => void
  createRoom: (name: string) => void
  getRooms: () => void
  getRoomMessages: (currentRoom: number | null) => void
  sendMessage: (text: string) => void
}

export const socket: Socket = io()

export const SocketContext = createContext<ISocketContext | null>(null)

const SocketProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((s) => s.user)
  const { currentRoom } = useAppSelector((s) => s.chat)


  const socketInitialize = useCallback(() => {
    socket.emit('user:join', { user })
    socket.on('room:update_list', (rooms: IRoom[]) => {
      dispatch(chatActions.updateRoomsList(rooms))
    })
    socket.on('room:update_room_messages', (messages: IMessage[]) => {
      dispatch(chatActions.setRoomMessages(messages))
    })
  }, [dispatch, user])


  const createRoom = (name: string) => {
    socket.emit('room:create', name)
  }


  const sendMessage = (text: string) => {
    socket.emit('room:send_message', { text, userId: user?.id, roomId: currentRoom })
  }


  const updateUserList = useCallback(() => {
    const updateListener = (users: Array<IUser>) => {
      const userList = users.filter((user, idx, self) => (
        idx === self.findIndex((it) => it.id === user.id)
      ))

      dispatch(chatActions.updateUserList(userList))
    }

    socket.on('user:joined', updateListener)
    socket.on('user:disconnected', updateListener)
  }, [dispatch])


  const getRooms = useCallback(() => {
    socket.emit('room:get_list')
  }, [])


  const getRoomMessages = useCallback((currentRoom: number | null) => {
    socket.emit('room:get_messages', currentRoom)
  }, [])


  const ws = {
    socketInitialize,
    updateUserList,
    createRoom,
    getRoomMessages,
    getRooms,
    sendMessage
  }

  return (
    <SocketContext.Provider value={ws}>
      {children}
    </SocketContext.Provider>
  )
}

export default SocketProvider
