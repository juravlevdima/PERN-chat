import { FC, useEffect } from 'react'
import io from 'socket.io-client'
import axios from 'axios'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const socket = io('http://localhost:8080/')

const Main: FC = () => {
  useEffect(() => {
    axios('/api/v1/user/authenticate')
      .then(({ data }) => console.log(data))
      .catch((e) => console.log(e?.response?.data?.message || 'error'))
  }, [])

  return (
    <div className="text-center py-10">
      App Main Page
    </div>
  )
}

export default Main
