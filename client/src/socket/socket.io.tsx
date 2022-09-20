import io, { Socket } from 'socket.io-client'
import { createContext, FC, PropsWithChildren } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { IUser } from '../types/user.types'
import { chatActions } from '../store/chat/chat.slice'

export interface ISocketContext {
  userJoin: () => void
  updateUserList: () => void
}

export const socket: Socket = io()

export const SocketContext = createContext<ISocketContext | null>(null)

const SocketProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((s) => s.user)

  const userJoin = () => {
    socket.emit('user:join', { user })
  }

  const updateUserList = () => {
    const updateListener = (users: Array<IUser>) => {
      const userList = users.filter((user, idx, self) => (
        idx === self.findIndex((it) => it.id === user.id)
      ))

      dispatch(chatActions.updateUserList(userList))
    }

    socket.on('user:joined', updateListener)
    socket.on('user:disconnected', updateListener)
  }

  const ws = {
    userJoin,
    updateUserList
  }

  return (
    <SocketContext.Provider value={ws}>
      {children}
    </SocketContext.Provider>
  )
}

export default SocketProvider
