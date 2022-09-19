import io, { Socket } from 'socket.io-client'
import { createContext, FC, PropsWithChildren } from 'react'
import { useAppSelector } from '../hooks/reduxHooks'

export interface ISocketContext {
  userJoin: () => void
}

const socket: Socket = io()

export const SocketContext = createContext<ISocketContext | null>(null)

const SocketProvider: FC<PropsWithChildren> = ({ children }) => {
  const name = useAppSelector((s) => s.user.user?.name)

  const userJoin = () => {
    socket.emit('user:join', { user: name })
  }

  const ws = {
    userJoin
  }

  return (
    <SocketContext.Provider value={ws}>
      {children}
    </SocketContext.Provider>
  )
}

export default SocketProvider
