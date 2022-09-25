import { FC, memo } from 'react'
import { useAppDispatch } from '../../../hooks/reduxHooks'
import { chatActions } from '../../../store/chat/chat.slice'
import { IRoom } from '../../../types/chat.types'

type propTypes = {
  room: IRoom
  currentRoom: number | null
}

const RoomListItem: FC<propTypes> = ({ room, currentRoom }) => {
  const dispatch = useAppDispatch()

  return (
    <li className={currentRoom === room.id ? 'font-bold' : ''}>
      <button onClick={() => dispatch(chatActions.setCurrentRoom(room.id))}>
        {room.name}
      </button>
    </li>
  )
}

export default memo(RoomListItem)
