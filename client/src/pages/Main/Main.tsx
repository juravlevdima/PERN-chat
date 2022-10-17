import { FC, useContext, useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import RoomList from '../../components/AsideMenus/RoomList/RoomList'
import Chat from '../../components/Chat/Chat'
import UserList from '../../components/AsideMenus/UserList/UserList'
import { ISocketContext, SocketContext } from '../../socket/SocketProvider'

const Main: FC = () => {
  const {
    socketInitialize,
    updateUserList,
    getRooms
  } = useContext(SocketContext) as ISocketContext

  useEffect(() => {
    updateUserList()
    getRooms()
  }, [updateUserList, getRooms])

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
