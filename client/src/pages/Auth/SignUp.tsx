import { FC } from 'react'
import style from './auth.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { userActions } from '../../store/user/user.slice'
import axios from 'axios'

type RegFormValuesT = {
  email: string
  name: string
  password: string
}

const SignUp: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { handleSubmit, register, formState: { errors }} = useForm<RegFormValuesT>()
  const { error: resError } = useAppSelector((s) => s.user)

  const submitForm: SubmitHandler<RegFormValuesT> = (d) => {
    axios.post('/api/v1/user/registration', d)
      .then(({ data }) => window.alert(data.message))
      .then(() => dispatch(userActions.resetError()))
      .then(() => navigate('/sign-in'))
      .catch((e) => dispatch(userActions.userFetchingError(e?.response?.data?.message || 'Неизвестная ошибка')))
  }

  return (
    <div className="absolute top-0 bg-white dark-theme dark:bg-dark-2 z-50">
      <div className="flex items-center justify-center h-screen w-screen">
        <div className="w-4/5 md:w-1/2 lg:w-1/3 p-4 rounded-lg custom-shadow dark:bg-dark-3">
          <div className="text-center text-xl font-semibold mb-3">Регистрация</div>
          <form onSubmit={handleSubmit(submitForm)}>
            <input
              autoFocus={true}
              type="email"
              placeholder="Email"
              className={style.input}
              {...register('email', { required: 'Укажите email!' })}
            />
            <div className={style.errorMessage}>{errors?.email?.message}</div>
            <input
              type="text"
              placeholder="Имя пользователя"
              className={style.input}
              {...register('name', { required: 'Укажите имя!' })}
            />
            <div className={style.errorMessage}>{errors?.name?.message}</div>
            <input
              type="password"
              placeholder="Пароль"
              className={style.input}
              {...register('password', { required: 'Укажите пароль!' })}
            />
            <div className={style.errorMessage}>{errors?.password?.message}</div>
            <div className="flex justify-center text-center my-4">
              <Link to="/sign-in" className={`${style.button} bg-blue-700 hover:bg-blue-900 mr-3`}
              >
                Войти?
              </Link>
              <button className={`${style.button} bg-green-700 hover:bg-green-900 
                disabled:bg-gray-500 disabled:cursor-not-allowed`}
              >
                Зарегистрироваться
              </button>
            </div>
          </form>
          {resError && <div className="text-center text-red-600 font-semibold">{resError}</div>}
        </div>
      </div>
    </div>
  )
}

export default SignUp
