import { FC, useContext, useState } from 'react'
import { useAppSelector } from '../../hooks/reduxHooks'
import { ISocketContext, SocketContext } from '../../socket/SocketProvider'
import Spinner from '../common/Spinner'

const Chat: FC = () => {
  const { sendMessage } = useContext(SocketContext) as ISocketContext
  const { roomMessages, isRoomLoading } = useAppSelector((s) => s.chat)
  const [text, setText] = useState('')

  const sendMessageHandler = () => {
    sendMessage(text.trim())
    setText('')
  }

  return (
    <div className="w-3/5 bg-gray-100 flex flex-col justify-between">
      <div>
        <h2>chat</h2>
        {
          isRoomLoading
            ? <Spinner />
            : <ul>
              {
                roomMessages?.map((message) => (
                  <li key={message.id}>
                    <span className="font-semibold mr-2">{message.user?.name}:</span>
                    <span>{message.text}</span>
                  </li>
                ))
              }
            </ul>
        }
      </div>

      <div>
        <input value={text} onChange={(e) => setText(e.target.value)} type="text" className="border border-black"/>
        <button disabled={!text} onClick={sendMessageHandler} className="bg-green-600 disabled:bg-gray-400">
          Send
        </button>
      </div>
    </div>
  )
}

export default Chat
