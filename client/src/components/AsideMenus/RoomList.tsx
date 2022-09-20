import { FC, useState } from 'react'

const RoomList: FC = () => {
  const [newRoom, setNewRoom] = useState('')

  return (
    <div className="w-1/5">
      <h2>Rooms:</h2>
      <label>
        <span className="font-semibold">add room:</span>
        <input value={newRoom} onChange={(e) => setNewRoom(e.target.value)} className="border border-black" type="text"/>
      </label>
      <button className="bg-green-600">Add</button>
    </div>
  )
}

export default RoomList
