import { FC, KeyboardEvent, useContext, useState } from 'react'
import { ISocketContext, SocketContext } from '../../socket/SocketProvider'


const ChatInput: FC = () => {
  const { sendMessage } = useContext(SocketContext) as ISocketContext
  const [text, setText] = useState('')

  const sendMessageHandler = () => {
    sendMessage(text.trim())
    setText('')
  }

  const inputKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && text.trim()) {
      sendMessageHandler()
    }
  }

  return (
    <div className="flex py-3 px-8">
      <input
        value={text}
        placeholder="Message"
        type="text"
        autoFocus={true}
        className="border-2 border-black py-1 px-6 w-full rounded-l-lg shadow-lg outline-none focus:border-blue-600
            dark:bg-dark-4 dark:border-gray-500 dark:focus:border-blue-600 dark-theme"
        onChange={(e) => setText(e.target.value)}
        onKeyDown={inputKeyHandler}
      />
      <button
        className="border-2 border-green-600 bg-green-600 py-1 px-8 rounded-r-lg shadow-lg text-white outline-none
             disabled:bg-gray-400  disabled:border-gray-400 disabled:text-black focus:bg-green-700"
        disabled={!text}
        title="Send"
        onClick={sendMessageHandler}
      >
        Send
      </button>
    </div>
  )
}

export default ChatInput
