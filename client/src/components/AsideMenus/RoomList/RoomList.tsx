import { FC, useState } from 'react'
import { useAppSelector } from '../../../hooks/reduxHooks'
import RoomListItem from './RoomListItem'
import addIcon from '../../../images/icons/add.svg'
import AddRoomModal from './AddRoomModal'

const RoomList: FC = () => {
  const { roomsList, currentRoom } = useAppSelector((s) => s.chat)
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <div className="w-1/5 pt-4 bg-gray-200 dark-theme dark:bg-dark-2 aside-height-limit relative">
        <button className="absolute top-0 right-2 hover:brightness-125" onClick={() => setShowModal(true)}>
          <img src={addIcon} alt="Add"/>
        </button>

        <h2 className="mb-3 text-center text-xl font-semibold italic">
          Rooms:
        </h2>
        <div className="pl-4">
          <ul>
            {roomsList.map((room) => (
              <RoomListItem key={room.id} room={room} currentRoom={currentRoom}/>
            ))}
          </ul>
        </div>
      </div>

      <AddRoomModal showModal={showModal} setShowModal={setShowModal}/>
    </>
  )
}

export default RoomList
