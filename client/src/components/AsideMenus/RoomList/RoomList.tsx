import { FC, useContext, useState } from 'react'
import { ISocketContext, SocketContext } from '../../../socket/socket.io'
import { useAppSelector } from '../../../hooks/reduxHooks'
import RoomListItem from './RoomListItem'

const RoomList: FC = () => {
  const { createRoom } = useContext(SocketContext) as ISocketContext
  const { roomsList, currentRoom } = useAppSelector((s) => s.chat)
  const [newRoom, setNewRoom] = useState('')

  return (
    <div className="w-1/5">
      <h2>Rooms:</h2>
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
  )
}

export default RoomList
