import { FC } from 'react'
import { useAppSelector } from '../../../hooks/reduxHooks'
import usersIcon from '../../../images/icons/users.svg'

const UserList: FC = () => {
  const { userList } = useAppSelector((s) => s.chat)


  return (
    <>
      <button className="w-8 flex items-center sm:hidden absolute top-14 right-6 hover:brightness-125">
        <img className="mr-2" src={usersIcon} alt="Users"/>
        <span>{userList.length}</span>
      </button>

      <div
        className={`hidden 
          sm:block w-1/5 pt-4 text-center bg-gray-200 dark-theme dark:bg-dark-2 aside-height-limit`}
      >
        <h2 className="mb-3 text-center text-xl font-semibold italic">Online ({userList.length}):</h2>
        <ul>
          {
            userList.map((user) => (
              <li key={user.id}>{user.name}</li>
            ))
          }
        </ul>
      </div>
    </>
  )
}

export default UserList
