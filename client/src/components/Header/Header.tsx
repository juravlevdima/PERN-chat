import { FC } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import signOutIcon from '../../images/icons/sign-out.svg'
import { signOut } from '../../store/user/user.actions'
import ThemeButton from '../common/ThemeButton'
import InstallPWAButton from '../common/InstallPWAButton'

const Header: FC = () => {
  const dispatch = useAppDispatch()
  const name = useAppSelector((s) => s.user.user?.name)

  return (
    <header className="py-2 px-4 flex justify-between bg-gray-300 dark-theme dark:bg-dark-1 custom-shadow z-30">
      <div className="flex items-center w-1/3">
        <button
          className="mr-3 hover:brightness-125 shrink-0"
          title="Sign Out"
          onClick={() => dispatch(signOut())}
        >
          <img src={signOutIcon} alt="Sign Out"/>
        </button>
        <div className="font-semibold overflow-hidden">{name}</div>
      </div>
      <div className="text-2xl text-center font-semibold italic w-1/3">Chat</div>
      <div className="flex justify-end items-center w-1/3">
        {/* <InstallPWAButton/> */}
        <ThemeButton/>
      </div>
    </header>
  )
}

export default Header
