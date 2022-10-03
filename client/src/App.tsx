import { FC, useContext, useEffect } from 'react'
import AppRoutes from './AppRoutes'
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks'
import { authenticate, checkToken } from './store/user/user.actions'
import Spinner from './components/common/Spinner'
import { ThemeContext } from './components/Providers/ThemeProvider'
import { IThemeContext } from './types/theme.types'
import InstallPWAButton from './components/common/InstallPWAButton'


const App: FC = () => {
  const dispatch = useAppDispatch()
  const { isLoading, token } = useAppSelector((s) => s.user)
  const { theme } = useContext(ThemeContext) as IThemeContext

  useEffect(() => {
    if (!token) {
      dispatch(checkToken())
    } else {
      dispatch(authenticate())
    }
  }, [dispatch, token])


  return (
    <div className={theme}>
      <InstallPWAButton/>
      {isLoading
        ? <Spinner/>
        : <AppRoutes/>
      }
    </div>
  )
}

export default App
