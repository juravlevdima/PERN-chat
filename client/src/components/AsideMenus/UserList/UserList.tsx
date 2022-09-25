import { FC } from 'react'
import { useAppSelector } from '../../../hooks/reduxHooks'

const UserList: FC = () => {
  const { userList } = useAppSelector((s) => s.chat)

  return (
    <div className="w-1/5 text-center">
      <h2 className="font-bold">Online ({userList.length}):</h2>
      <ul>
        {
          userList.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))
        }
      </ul>
    </div>
  )
}

export default UserList
