import { FC, useEffect, useRef } from 'react'
import { useAppSelector } from '../../hooks/reduxHooks'
import Spinner from '../common/Spinner'
import ChatInput from './ChatInput'
import Message from './Message'

const Chat: FC = () => {
  const { roomMessages, isRoomLoading, currentRoom, roomsList } = useAppSelector((s) => s.chat)
  const userId = useAppSelector((s) => s.user.user?.id)
  const messageListRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight
    }
  }, [roomMessages])

  return (
    <div className="w-full sm:w-3/5 flex flex-col bg-gray-100 dark-theme dark:bg-dark-3">
      <h2 className="font-semibold text-xl text-center italic py-2">
        {currentRoom && <span>Room: </span>}
        <span>{roomsList.find((room) => room.id === currentRoom)?.name}</span>
      </h2>
      <div ref={messageListRef} className="chat-height-limit">
        {
          isRoomLoading
            ? <Spinner />
            : <ul className="flex flex-col items-start px-8">
              {
                roomMessages?.map((message) => (
                  <Message message={message} key={message.id} userId={userId} />
                ))
              }
            </ul>
        }
      </div>

      {currentRoom && <ChatInput/>}
    </div>
  )
}

export default Chat
