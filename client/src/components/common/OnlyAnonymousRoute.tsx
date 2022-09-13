import { FC } from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks/reduxHooks'

type propTypes = {
  children: JSX.Element,
}

const OnlyAnonymousRoute: FC<propTypes> = ({ children }) => {
  const { isAuth } = useAppSelector((s) => s.user)
  return !isAuth
    ? children
    : <Navigate to="/" replace />
}

export default OnlyAnonymousRoute
