import io, { Socket } from 'socket.io-client'
import { createContext, FC, PropsWithChildren } from 'react'
import { useAppSelector } from '../hooks/reduxHooks'
import { IUser } from '../types/user.types'

export interface ISocketContext {
  userJoin: () => void
  joinedUsers: () => void
}

export const socket: Socket = io()

export const SocketContext = createContext<ISocketContext | null>(null)

const SocketProvider: FC<PropsWithChildren> = ({ children }) => {
  const { user } = useAppSelector((s) => s.user)

  const userJoin = () => {
    socket.emit('user:join', { user })
  }

  const joinedUsers = () => {
    socket.on('user:joined', (users: Array<IUser>) => {
      console.log(users)
    })

    socket.on('user:disconnected', (users: Array<IUser>) => {
      console.log(users)
    })
  }


  const ws = {
    userJoin,
    joinedUsers
  }

  return (
    <SocketContext.Provider value={ws}>
      {children}
    </SocketContext.Provider>
  )
}

export default SocketProvider
