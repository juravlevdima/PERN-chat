import { FC } from 'react'
import { useAppSelector } from '../../../hooks/reduxHooks'

const UserList: FC = () => {
  const { userList } = useAppSelector((s) => s.chat)

  return (
    <div className="w-1/5 pt-4 text-center bg-gray-200 dark-theme dark:bg-dark-2 aside-height-limit">
      <h2 className="mb-3 text-center text-xl font-semibold italic">Online ({userList.length}):</h2>
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
