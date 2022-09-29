import { FC } from 'react'
import { IMessage } from '../../types/chat.types'

type propTypes = {
  message: IMessage
  userId?: number
}

const Message: FC<propTypes> = ({ message, userId }) => {
  return (
    <li className={`py-2 px-4 mb-3 rounded-md border border-gray-300 dark-theme
      dark:border-dark-4 dark:bg-dark-4  ${message.userId === userId && 'self-end'}`}
    >
      <div className="mb-1 flex">
        <span className="font-semibold mr-8 sm:mr-12 lg:mr-20">{message.user?.name}</span>
        <span className="font-extralight text-xs">
          {message.createdAt?.replace(/^.*T(.*)\.\d*Z/, '$1, ')}
          {message.createdAt?.replace(/(.*)T.*$/, (_, m1) => m1.split('-').reverse().join('.'))}
        </span>
      </div>
      <div className="font-thin text-sm">{message.text}</div>
    </li>
  )
}

export default Message
