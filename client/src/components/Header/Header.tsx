import { FC } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import signOutIcon from '../../images/icons/sign-out.svg'
import { signOut } from '../../store/user/user.actions'
import defaultAvatar from '../../images/default-avatar.png'

const Header: FC = () => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((s) => s.user)

  return (
    <header className="py-2 px-4 flex justify-between bg-gray-300 dark-theme dark:bg-dark-1 custom-shadow z-30">
      <div className="flex items-center w-1/3">
        <button
          className="mr-4 hover:brightness-125 shrink-0"
          title="Sign Out"
          onClick={() => dispatch(signOut())}
        >
          <img src={signOutIcon} alt="Sign Out"/>
        </button>
        <Link to="/options" className="flex items-center hover:underline">
          <img className="w-8 rounded-full mr-2" src={user?.avatar || defaultAvatar} alt="User"/>
          <span className="font-semibold overflow-hidden">{user?.name}</span>
        </Link>
      </div>
      <div className="text-2xl text-center font-semibold italic w-1/3">Chat</div>
      <div className="flex justify-end items-center w-1/3" />
    </header>
  )
}

export default Header
