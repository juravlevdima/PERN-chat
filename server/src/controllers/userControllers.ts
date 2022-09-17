import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import ApiError from '../errors/ApiError'
import UserModel from '../models/UserModel'
import bcrypt from 'bcrypt'
import { IUserPublicData } from '../types/user.types'


export const registration = async (req: Request, res: Response, next: NextFunction) => {
  const { email, name, password, role } = req.body
  if (!email || !password || !name) return next(ApiError.badRequest('Укажите email, имя и пароль!'))

  const existingUser = await UserModel.findOne({ where: { email } })
  if (existingUser) return next(ApiError.badRequest('Пользователь с таким email уже существует!'))

  const user = await UserModel.create({ email, name, password, role })
  return res.json({ message: 'Пользователь успешно зарегистрирован', user: user.email })
}


export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body
  if (!email || !password) return next(ApiError.badRequest('Введите email и пароль'))

  const user = await UserModel.findOne({ where: { email } })
  if (!user) return next(ApiError.unauthorized('Неверный email или пароль'))

  const comparePassword = bcrypt.compareSync(password, user.password)
  if (!comparePassword) return next(ApiError.unauthorized('Неверный email или пароль'))

  const token = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: '24h' }
  )
  res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 24 })
  return res.json({
    message: 'Пользователь успешно авторизован',
    user: { id: user.id, email: user.email, name: user.name, role: user.role },
    token
  })
}


export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const token = req?.cookies?.token
  if (!token) return next(ApiError.unauthorized('Пользователь не авторизован'))

  const secret = process.env.JWT_SECRET || 'secret'

  try {
    const decoded = jwt.verify(token, secret) as IUserPublicData
    const { id } = decoded
    const user = await UserModel.findByPk(id)
    if (!user) return next(ApiError.unauthorized('Пользователь не авторизован'))
    const { email, role, name } = user
    return res.json({ message: 'Пользователь авторизован', user: { id, email, name, role }})
  } catch {
    return next(ApiError.unauthorized('Пользователь не авторизован'))
  }
}
