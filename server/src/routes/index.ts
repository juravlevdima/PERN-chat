import { Router } from 'express'
import userRouter from './userRouter'
import { IUserPublicData } from '../types/user.types'

declare global {
  namespace Express {
    export interface Request {
      user?: IUserPublicData
    }
  }
}

const router: Router = Router()

router.use('/user', userRouter)

export default router
