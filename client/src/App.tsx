import { FC, useEffect } from 'react'
import AppRoutes from './AppRoutes'
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks'
import { authenticate, checkToken } from './store/user/user.actions'
import Spinner from './components/common/Spinner'


const App: FC = () => {
  const dispatch = useAppDispatch()
  const { isLoading, token } = useAppSelector((s) => s.user)

  useEffect(() => {
    if (!token) {
      dispatch(checkToken())
    } else {
      dispatch(authenticate())
    }
  }, [dispatch, token])

  if (isLoading) {
    return <Spinner/>
  } else {
    return <AppRoutes/>
  }
}

export default App
