import { FC } from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks/reduxHooks'

type propTypes = {
  children: JSX.Element,
  roles?: Array<string>
}

const PrivateRoute: FC<propTypes> = ({ children, roles: accessRoles }) => {
  const { isAuth } = useAppSelector((s) => s.user)
  const role = useAppSelector((s) => s.user.user?.role)

  return isAuth && role && accessRoles?.includes(role)
    ? children
    : <Navigate to="/sign-in" replace />
}

export default PrivateRoute
