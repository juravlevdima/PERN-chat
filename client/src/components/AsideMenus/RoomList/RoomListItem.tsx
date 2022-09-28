import { FC, memo } from 'react'
import { useAppDispatch } from '../../../hooks/reduxHooks'
import { IRoom } from '../../../types/chat.types'
import { changeRoom } from '../../../store/chat/chat.actions'

type propTypes = {
  room: IRoom
  currentRoom: number | null
}

const RoomListItem: FC<propTypes> = ({ room, currentRoom }) => {
  const dispatch = useAppDispatch()

  const changeRoomHandler = () => {
    dispatch(changeRoom(room, currentRoom))
  }

  return (
    <li className={currentRoom === room.id ? 'font-bold' : ''}>
      <button onClick={changeRoomHandler}>
        {room.name}
      </button>
    </li>
  )
}

export default memo(RoomListItem)
