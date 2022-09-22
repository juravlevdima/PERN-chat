import { FC, useContext, useState } from 'react'
import { ISocketContext, SocketContext } from '../../socket/socket.io'
import { useAppSelector } from '../../hooks/reduxHooks'

const RoomList: FC = () => {
  const { createRoom } = useContext(SocketContext) as ISocketContext
  const { roomsList } = useAppSelector((s) => s.chat)
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
          <li key={room.id}>{room.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default RoomList
