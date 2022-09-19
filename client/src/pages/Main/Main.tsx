import { FC, useContext, useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import RoomList from '../../components/AsideMenus/RoomList'
import Chat from '../../components/Chat/Chat'
import UserList from '../../components/AsideMenus/UserList'
import { ISocketContext, SocketContext } from '../../socket/socket.io'

const Main: FC = () => {
  const { userJoin } = useContext(SocketContext) as ISocketContext

  useEffect(() => {
    userJoin()
  }, [userJoin])

  return (
    <Layout>
      <RoomList/>
      <Chat/>
      <UserList/>
    </Layout>
  )
}

export default Main
