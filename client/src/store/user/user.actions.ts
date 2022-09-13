import Cookies from 'universal-cookie'
import axios from 'axios'
import { AppDispatch } from '../../hooks/reduxHooks'
import { IAuthenticateRes } from '../../types/user.types'
import { userActions } from './user.slice'

const cookies = new Cookies()


export const checkToken = () => (dispatch: AppDispatch) => {
  const token = cookies.get('token')
  dispatch(userActions.setToken(token))
}


export const authenticate = () => (dispatch: AppDispatch) => {
  dispatch(userActions.userFetching())
  axios
    .get<IAuthenticateRes>('/api/v1/user/authenticate')
    .then(({ data }) => dispatch(userActions.userFetchingSuccess(data.user)))
    .catch(() => dispatch(userActions.userFetchingError()))
}
