import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import ApiError from '../errors/ApiError'
import UserModel from '../models/UserModel'
import bcrypt from 'bcrypt'


export const registration = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, role } = req.body
  if (!email || !password) return next(ApiError.badRequest('Укажите email и пароль!'))

  const existingUser = await UserModel.findOne({ where: { email } })
  if (existingUser) return next(ApiError.badRequest('Пользователь с таким email уже существует!'))

  const user = await UserModel.create({ email, password, role })
  return res.json({ message: 'Пользователь успешно зарегистрирован', user_email: user.email })
}


export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body
  if (!email || !password) return next(ApiError.badRequest('Введите email и пароль'))

  const user = await UserModel.findOne({ where: { email } })
  if (!user) return next(ApiError.unauthorized('Неверный email или пароль'))

  const comparePassword = bcrypt.compareSync(password, user.password)
  if (!comparePassword) return next(ApiError.unauthorized('Неверный email или пароль'))

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: '24h' }
  )
  res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 24 })
  return res.json({ message: 'Пользователь успешно авторизован', token })
}


export const authenticate = (req: Request, res: Response) => {
  res.json({message: 'Пользователь авторизован'})
}
