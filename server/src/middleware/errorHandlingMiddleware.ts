import { NextFunction, Request, Response } from 'express'
import ApiError from '../errors/ApiError'

const errorHandler = (e: ApiError | unknown, req: Request, res: Response, next: NextFunction) => {
  return e instanceof ApiError
    ? res.status(e.status).json({message: e.message})
    : res.status(500).json({message: 'Unexpected error'})
}

export default errorHandler
