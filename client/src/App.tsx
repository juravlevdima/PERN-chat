import { FC, useEffect } from 'react'
import AppRoutes from './AppRoutes'
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks'
import { authenticate } from './store/user/user.actions'
import Spinner from './components/common/Spinner'

const App: FC = () => {
  const dispatch = useAppDispatch()
  const { isLoading } = useAppSelector((s) => s.user)

  useEffect(() => {
    dispatch(authenticate())
  }, [dispatch])

  if (isLoading) {
    return <Spinner/>
  } else {
    return <AppRoutes/>
  }
}

export default App
