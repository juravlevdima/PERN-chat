import { Server, Socket } from 'socket.io'

const listenSocketEndpoints = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log('socket connected:\n', socket.id)

    socket.on('user:join', (data) => {
      console.log(data)
    })
  })
}

export default listenSocketEndpoints
