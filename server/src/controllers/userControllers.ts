import { NextFunction, Request, Response } from 'express'
import ApiError from '../errors/ApiError'

export const registration = (req: Request, res: Response) => {

}

export const login = (req: Request, res: Response, next: NextFunction) => {
  const {id} = req.query
  if (!id) return next(ApiError.badRequest('Не задан id'))
  res.json(id)
}

export const authenticate = (req: Request, res: Response) => {

}
