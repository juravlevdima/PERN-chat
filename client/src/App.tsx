import { FC, useContext, useEffect } from 'react'
import AppRoutes from './AppRoutes'
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks'
import { authenticate, getTokenFromCookies } from './store/user/user.actions'
import Spinner from './components/common/Spinner'
import { ThemeContext } from './components/Providers/ThemeProvider'
import { IThemeContext } from './types/theme.types'
import Controls from './components/common/Controls'


const App: FC = () => {
  const dispatch = useAppDispatch()
  const { isLoading, token } = useAppSelector((s) => s.user)
  const { theme } = useContext(ThemeContext) as IThemeContext

  useEffect(() => {
    if (!token) {
      dispatch(getTokenFromCookies())
    } else {
      dispatch(authenticate())
    }
  }, [dispatch, token])


  return (
    <div className={theme}>
      <Controls/>
      {isLoading
        ? <div className="min-h-screen bg-gray-100 dark-theme dark:bg-dark-2"><Spinner/></div>
        : <AppRoutes/>
      }
    </div>
  )
}

export default App
