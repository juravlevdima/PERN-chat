import Cookies from 'universal-cookie'
import axios from 'axios'
import { AppDispatch } from '../../hooks/reduxHooks'
import { IAuthenticateRes } from '../../types/user.types'
import { userActions } from './user.slice'

const cookies = new Cookies()


export const getTokenFromCookies = ()  => {
  const token = cookies.get('token')
  return token
    ? userActions.setToken(token)
    : userActions.stopLoading()
}


export const authenticate = () => (dispatch: AppDispatch) => {
  dispatch(userActions.userFetching())
  axios
    .get<IAuthenticateRes>('/api/v1/user/authenticate')
    .then(({ data }) => dispatch(userActions.userFetchingSuccess(data.user)))
    .catch((e) => dispatch(userActions.userFetchingError(e?.response?.data?.message || 'Неизвестная ошибка')))
}

export const login = (email: string, password: string) => (dispatch: AppDispatch) => {
  dispatch(userActions.userFetching())
  axios.post<IAuthenticateRes>('/api/v1/user/login', { email, password })
    .then(({ data }) => dispatch((userActions.userFetchingSuccess(data.user))))
    .catch((e) => dispatch(userActions.userFetchingError(e?.response?.data?.message || 'Неизвестная ошибка')))
}

export const signOut = () => {
  cookies.remove('token')
  return userActions.signOut()
}
