import { FC, useContext, useState } from 'react'
import { useAppSelector } from '../../hooks/reduxHooks'
import { ISocketContext, SocketContext } from '../../socket/SocketProvider'

const Chat: FC = () => {
  const { sendMessage } = useContext(SocketContext) as ISocketContext
  const { roomMessages } = useAppSelector((s) => s.chat)
  const [text, setText] = useState('')

  return (
    <div className="w-3/5 bg-gray-100 flex flex-col justify-between">
      <div>
        <h2>chat</h2>
        <ul>
          {
            roomMessages?.map((message) => (
              <li key={message.id}>{message.text}</li>
            ))
          }
        </ul>
      </div>

      <div>
        <input value={text} onChange={(e) => setText(e.target.value)} type="text" className="border border-black"/>
        <button onClick={() => sendMessage(text)} className="bg-green-600">Send</button>
      </div>
    </div>
  )
}

export default Chat
