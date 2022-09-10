import { NextFunction, Request, Response } from 'express'
import ApiError from '../errors/ApiError'
import jwt from 'jsonwebtoken'
import { IUserPublicData } from '../types/user.types'

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') return next()

  const token = req?.cookies?.token
  if (!token) return next(ApiError.unauthorized('Пользователь не авторизован'))

  try {
    const secret = process.env.JWT_SECRET || 'secret'
    const decoded = jwt.verify(token, secret) as IUserPublicData
    req.user = decoded
    return next()
  } catch {
    return next(ApiError.unauthorized('Пользователь не авторизован'))
  }
}

export default verifyToken
