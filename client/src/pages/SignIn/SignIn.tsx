import { FC, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { login } from '../../store/user/user.actions'

const SignIn: FC = () => {
  const dispatch = useAppDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { error } = useAppSelector((s) => s.user)

  const signInClick = () => {
    dispatch(login(email.trim(), password.trim()))
  }

  return (
    <div className="absolute top-0 bg-white z-50">
      <div className="flex items-center justify-center h-screen w-screen">
        <div className="w-4/5 md:w-1/2 lg:w-1/3 p-4 rounded-lg custom-shadow">
          <div className="text-center text-xl font-semibold pb-2">Вход</div>
          <hr/>
          <input
            autoFocus={true}
            type="text"
            placeholder="Введите email"
            className="my-2 w-full text-xl text-center border-2 rounded-lg focus:border-blue-500"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="password"
            placeholder="Введите пароль"
            className="mb-2 w-full text-xl text-center border-2 rounded-lg focus:border-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <hr/>
          <div className="text-center my-4">
            <button
              type="button"
              className="transition duration-300 ease-in-out bg-green-700
                hover:bg-green-900 text-white font-semibold py-2 px-8 rounded
                disabled:bg-gray-500 disabled:cursor-not-allowed"
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
