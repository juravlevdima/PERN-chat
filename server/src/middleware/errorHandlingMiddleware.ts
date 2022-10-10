import { NextFunction, Request, Response } from 'express'
import ApiError from '../errors/ApiError'
import multer from 'multer'

const errorHandler = (e: ApiError | unknown, req: Request, res: Response, next: NextFunction) => {
  if (e instanceof ApiError) {
    return res.status(e.status).json({message: e.message})
  } else if (e instanceof multer.MulterError) {
    return res.status(404).json({message: e.message})
  }

  return res.status(500).json({message: 'Unexpected error'})
}

export default errorHandler
