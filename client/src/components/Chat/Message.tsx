import { FC } from 'react'
import { IMessage } from '../../types/chat.types'
import defaultAvatar from '../../images/default-avatar.png'

type propTypes = {
  message: IMessage
  userId?: number
}

const Message: FC<propTypes> = ({ message, userId }) => {
  return (
    <li className={`py-2 px-4 mb-3 rounded-md border border-gray-300 dark-theme
      dark:border-dark-4 dark:bg-dark-4 flex ${message.userId === userId && 'self-end'}`}
    >
      <div className="shrink-0 pr-4 pt-1">
        <img className="w-10" src={defaultAvatar} alt="Avatar"/>
      </div>
      <div>
        <div className="mb-1 flex">
          <span className="font-semibold mr-8 sm:mr-12 lg:mr-20">{message.user?.name}</span>
          <span className="font-extralight text-xs">
            {message.createdAt?.replace(/^.*T(.*)\.\d*Z/, '$1, ')}
            {message.createdAt?.replace(/(.*)T.*$/, (_, m1) => m1.split('-').reverse().join('.'))}
          </span>
        </div>
        <div className="font-thin text-sm break-all">
          {message.text}
        </div>
      </div>
    </li>
  )
}

export default Message
