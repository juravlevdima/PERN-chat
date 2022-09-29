import { FC } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import signOutIcon from '../../images/icons/sign-out.svg'
import { signOut } from '../../store/user/user.actions'
import ThemeButton from '../common/ThemeButton'

const Header: FC = () => {
  const dispatch = useAppDispatch()
  const name = useAppSelector((s) => s.user.user?.name)

  return (
    <header className="py-2 px-4 flex justify-between bg-gray-300 dark-theme dark:bg-dark-1 custom-shadow z-30">
      <div className="flex items-center">
        <button
          className="mr-3 hover:brightness-125"
          title="Sign Out"
          onClick={() => dispatch(signOut())}
        >
          <img src={signOutIcon} alt="Sign Out"/>
        </button>
        <div className="font-semibold">{name}</div>
      </div>
      <div className="text-2xl font-semibold italic">Chat</div>
      <div className="flex items-center">
        <ThemeButton/>
      </div>
    </header>
  )
}

export default Header
