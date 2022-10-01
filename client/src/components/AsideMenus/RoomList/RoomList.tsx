import { FC, useState } from 'react'
import { useAppSelector } from '../../../hooks/reduxHooks'
import RoomListItem from './RoomListItem'
import addIcon from '../../../images/icons/add.svg'
import AddRoomModal from './AddRoomModal'
import roomsIcon from '../../../images/icons/rooms.svg'
import styles from './RoomList.module.scss'

const RoomList: FC = () => {
  const { roomsList, currentRoom } = useAppSelector((s) => s.chat)
  const [showModal, setShowModal] = useState(false)
  const [showRooms, setShowRooms] = useState(false)

  return (
    <>
      <button
        className="flex items-center sm:hidden absolute top-14 left-2 hover:brightness-125 z-30"
        onClick={() => setShowRooms(!showRooms)}
      >
        <img className="mr-2" src={roomsIcon} alt="Users"/>
        <span>{roomsList.length}</span>
      </button>

      <aside
        onClick={() => setShowRooms(false)}
        className={`${showRooms ? styles.mobileRoomList : 'hidden'}
          sm:block sm:w-1/5 pt-4 bg-gray-200 dark-theme dark:bg-dark-2 aside-height-limit sm:relative`}
      >
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
      </aside>

      <AddRoomModal showModal={showModal} setShowModal={setShowModal}/>
    </>
  )
}

export default RoomList
