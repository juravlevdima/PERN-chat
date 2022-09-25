import { FC, useContext, useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import RoomList from '../../components/AsideMenus/RoomList/RoomList'
import Chat from '../../components/Chat/Chat'
import UserList from '../../components/AsideMenus/UserList/UserList'
import { ISocketContext, SocketContext } from '../../socket/socket.io'
import { useAppSelector } from '../../hooks/reduxHooks'

const Main: FC = () => {
  const {
    socketInitialize,
    updateUserList,
    getRoomMessages,
    getRooms
  } = useContext(SocketContext) as ISocketContext

  const { currentRoom } = useAppSelector((s) => s.chat)

  useEffect(() => {
    updateUserList()
    getRooms()
    getRoomMessages(currentRoom)
  }, [updateUserList, getRooms, getRoomMessages, currentRoom])

  useEffect(() => {
    socketInitialize()
  }, [socketInitialize])

  return (
    <Layout>
      <RoomList/>
      <Chat/>
      <UserList/>
    </Layout>
  )
}

export default Main
