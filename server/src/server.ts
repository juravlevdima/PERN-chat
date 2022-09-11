import express, { Application } from 'express'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import passport from 'passport'

import dbConnect from './services/postgres'
import router from './routes'
import errorHandler from './middleware/errorHandlingMiddleware'
import defineModels from './models/defineModels'
import jwtStrategy from './services/passport'

dotenv.config()
const port = process.env.PORT || 8080
const app: Application = express()
const server = http.createServer(app)
const io = new Server(server, { cors: { origin: '*', }})

defineModels()

app.use(express.json())
app.use(cookieParser())
app.use(cors())
passport.initialize()
passport.use('jwt', jwtStrategy)

app.use('/api/v1', router)

app.use(errorHandler)

io.on('connection', (socket) => {
  console.log('socket connected\n', socket.id)
})

dbConnect()
  .then(() => server.listen(port, () => {
      console.log(`Server has been started on http://localhost:${port}.\nPlease press CTRL + C to stop the server`)
    })
  ).catch((e) => console.log(e.message))
