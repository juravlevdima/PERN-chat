import { FC, useState } from 'react'
import { useAppSelector } from '../../../hooks/reduxHooks'
import usersIcon from '../../../images/icons/users.svg'
import defaultAvatar from '../../../images/default-avatar.png'
import styles from './UserList.module.scss'

const UserList: FC = () => {
  const { userList } = useAppSelector((s) => s.chat)
  const [showUsers, setShowUsers] = useState(false)

  return (
    <>
      <button
        className="w-8 flex items-center sm:hidden absolute top-14 right-6 hover:brightness-125 z-30"
        onClick={() => setShowUsers(!showUsers)}
      >
        <img className="mr-2" src={usersIcon} alt="Users"/>
        <span>{userList.length}</span>
      </button>

      <div
        className={`absolute top-0 bottom-0 left-0 right-0 bg-modal ${showUsers ? 'block' : 'hidden'}`}
        onClick={() => setShowUsers(false)}
      />

      <aside
        className={`${showUsers ? styles.mobileUserList : 'hidden'}
          sm:block sm:w-1/5 pt-4 text-center bg-gray-200 dark-theme dark:bg-dark-2 aside-height-limit`}
      >
        <h2 className="mb-3 text-center text-xl font-semibold italic">Online ({userList.length}):</h2>
        <ul>
          {
            userList.map((user) => (
              <li className="flex justify-center px-3 mb-3" key={user.id}>
                <div><img className="w-6 mr-2 shrink-0" src={defaultAvatar} alt="Avatar"/></div>
                <span className="break-all">{user.name}</span>
              </li>
            ))
          }
        </ul>
      </aside>
    </>
  )
}

export default UserList
