import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { login } from '../../store/user/user.actions'
import style from './auth.module.scss'

const SignIn: FC = () => {
  const dispatch = useAppDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { error } = useAppSelector((s) => s.user)

  const signInClick = () => {
    dispatch(login(email.trim(), password.trim()))
  }

  return (
    <div className="absolute top-0 z-50 dark-theme dark:bg-dark-2">
      <div className="flex items-center justify-center h-screen w-screen">
        <div className="w-4/5 md:w-1/2 lg:w-1/3 p-4 rounded-lg custom-shadow dark:bg-dark-3">
          <div className="text-center text-xl font-semibold mb-3">Вход</div>
          <input
            autoFocus={true}
            type="email"
            placeholder="Введите email"
            className={style.input}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="password"
            placeholder="Введите пароль"
            className={style.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex justify-center text-center my-4">
            <Link to="/sign-up" className={`${style.button} bg-blue-700 hover:bg-blue-900 mr-3`}>
              Регистрация
            </Link>
            <button
              className={`${style.button} bg-green-700 hover:bg-green-900
                disabled:bg-gray-500 disabled:cursor-not-allowed`}
              onClick={signInClick}
              disabled={!(email && password)}
            >
              Войти
            </button>
          </div>
          {error && <div className="text-center text-red-600 font-semibold">{error}</div>}
        </div>
      </div>
    </div>
  )
}

export default SignIn
