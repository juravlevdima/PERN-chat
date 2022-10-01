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
    <li className={`pl-8 text-xl mb-3 ${currentRoom === room.id && 'font-bold scale-105'}`}>
      <button className="hover:scale-110" onClick={changeRoomHandler}>
        <span className="italic font-bold"># </span>
        <span className="break-all">{room.name}</span>
      </button>
    </li>
  )
}

export default memo(RoomListItem)
