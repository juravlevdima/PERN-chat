import { FC, useContext, useState } from 'react'
import { ISocketContext, SocketContext } from '../../../socket/SocketProvider'
import { useAppSelector } from '../../../hooks/reduxHooks'
import RoomListItem from './RoomListItem'

const RoomList: FC = () => {
  const { createRoom } = useContext(SocketContext) as ISocketContext
  const { roomsList, currentRoom } = useAppSelector((s) => s.chat)
  const [newRoom, setNewRoom] = useState('')

  return (
    <div className="w-1/5 pt-4 bg-gray-200 dark-theme dark:bg-dark-2">
      <h2 className="mb-3 text-center text-xl font-semibold italic">Rooms:</h2>
      <div className="pl-4">
        <label>
          <span className="font-semibold">add room:</span>
          <input value={newRoom} onChange={(e) => setNewRoom(e.target.value)} className="border border-black" type="text"/>
        </label>
        <button onClick={() => createRoom(newRoom)} className="bg-green-600">Add</button>

        <ul>
          {roomsList.map((room) => (
            <RoomListItem key={room.id} room={room} currentRoom={currentRoom}/>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default RoomList
