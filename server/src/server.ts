import express, { Application } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

import dbConnect from './services/postgres'
import router from './routes'
import errorHandler from './middleware/errorHandlingMiddleware'
import defineModels from './models/defineModels'

dotenv.config()
const port = process.env.PORT || 8080
const server: Application = express()

defineModels()

server.use(express.json())
server.use(cookieParser())
server.use(cors())

server.use('/api/v1', router)

server.use(errorHandler)

dbConnect()
  .then(() => server.listen(port, () => {
      console.log(`Server has been started on http://localhost:${port}.\nPlease press CTRL + C to stop the server`)
    })
  ).catch((e) => console.log(e.message))
