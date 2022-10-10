import { FC, FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../../components/Layout/Layout'
import style from './UserOptions.module.scss'
import userPhoto from '../../images/user-photo.svg'
import { useAppSelector } from '../../hooks/reduxHooks'
import axios from 'axios'


const UserOptions: FC = () => {
  const { user } = useAppSelector((s) => s.user)
  const [inputImg, setInputImg] = useState<ArrayBuffer | null>(null)
  const [image, setImage] = useState<string | Blob | null>(null)
  const [newName, setNewName] = useState<string>(user?.name || '')

  const fileInputHandler = (e: FormEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0]
    const reader = new FileReader()
    if (file) {
      setImage(file)
      reader.readAsDataURL(file)
    }
    reader.addEventListener(
      'load',
      () => {
        setInputImg(reader.result as ArrayBuffer | null)
      },
      false
    )
  }

  const updateProfile = () => {
    const data = new FormData()
    data.append('name', newName)
    if (image) data.append('avatar', image)

    axios({
      method: 'PUT',
      url: '/api/v1/user/update-profile',
      headers: { 'Content-Type': 'multipart/form-data' },
      data
    }).then(() => alert('Выполнено'))
      .then(() => window.location.reload())
      .catch((e) => alert(e?.response?.data?.message || 'Неизвестная ошибка'))
  }


  return (
    <Layout>
      <div className="w-4/5 md:w-1/2 lg:w-1/3 p-4 rounded-lg custom-shadow dark:bg-dark-3 mx-auto self-center">
        <div className="text-center text-xl font-semibold mb-3">Редактировать данные</div>
        <div className="relative w-40 mx-auto text-center">
          <label>
            <img
              className="w-40 h-40 mb-4 cursor-pointer hover:brightness-125 rounded-full"
              src={inputImg || user?.avatar || userPhoto}
              alt="Add Image"/>
            {
              !inputImg && !user?.avatar  && <span
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                  font-semibold text-black text-2xl pointer-events-none"
              >
                Add Image
              </span>
            }
            <input
              accept="image/*"
              className="hidden"
              type="file"
              onChange={fileInputHandler}
            />
          </label>
        </div>
        <input
          type="text"
          placeholder="Новое имя"
          className={style.input}
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <div className="flex justify-between text-center my-4">
          <Link to="/" className={`${style.button} bg-gray-500 hover:bg-gray-700 mr-2`}>
            Назад
          </Link>
          <button
            onClick={updateProfile}
            disabled={!newName}
            className={`${style.button} bg-green-700 hover:bg-green-900`}
          >
            Сохранить
          </button>
        </div>
      </div>
    </Layout>
  )
}

export default UserOptions
