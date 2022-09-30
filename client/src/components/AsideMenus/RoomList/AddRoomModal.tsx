import { Dispatch, FC, SetStateAction, useContext, useId, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import { ISocketContext, SocketContext } from '../../../socket/SocketProvider'
import closeIcon from '../../../images/icons/close.svg'

type propTypes = {
  showModal: boolean
  setShowModal: Dispatch<SetStateAction<boolean>>
}

const AddRoomModal: FC<propTypes> = ({ showModal, setShowModal }) => {
  const { createRoom } = useContext(SocketContext) as ISocketContext
  const nodeRef = useRef(null)
  const roomNameInputId = useId()
  const [roomName, setRoomName] = useState('')

  const createRoomHandler = () => {
    createRoom(roomName)
    setShowModal(false)
  }

  return (
    <CSSTransition
      in={showModal}
      nodeRef={nodeRef}
      timeout={300}
      classNames="addRoomModal"
      unmountOnExit
    >
      <div className="absolute top-0 left-0 bottom-0 right-0 z-40 bg-modal" onMouseDown={() => setShowModal(false)}>
        <div
          onMouseDown={(e) => e.stopPropagation()}
          className="absolute top-1/2 left-1/2 z-50 flex flex-col rounded-lg shadow-lg w-11/12 sm:w-5/6 lg:w-1/2 max-w-2xl
            -translate-x-1/2 -translate-y-1/2 bg-gray-100 dark-theme dark:bg-dark-2"
        >
          <div className="py-3 px-2 border-b-2 border-b-gray-600 flex justify-between">
            <div className="px-4 text-lg font-semibold">Create new room</div>
            <button
              className="h-6 w-6 hover:scale-125 transition duration-300"
              title="Закрыть"
              onClick={() => setShowModal(false)}
            >
              <img className="rounded-md dark:bg-white" src={closeIcon} alt="close"/>
            </button>
          </div>
          <div className="px-6 py-2 flex items-center border-b-2 border-b-gray-600">
            <label className="whitespace-nowrap mr-3" htmlFor={roomNameInputId}>Room name</label>
            <input
              id={roomNameInputId}
              value={roomName}
              type="text"
              autoFocus={true}
              onChange={(e) => setRoomName(e.target.value)}
              className="border-2 border-black py-1 px-6 w-full rounded-lg shadow-lg outline-none focus:border-blue-600
                dark:bg-dark-4 dark:border-gray-500 dark:focus:border-blue-600 dark-theme"
            />
          </div>
          <div className="px-6 py-2 flex justify-end text-white">
            <button
              className="px-3 py-1 rounded-md bg-green-600 hover:bg-green-700 mr-3"
              onClick={createRoomHandler}
            >
              Create
            </button>
            <button
              className="px-3 py-1 rounded-md bg-gray-600 hover:bg-gray-700"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </CSSTransition>
  )
}

export default AddRoomModal
