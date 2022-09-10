import passportJWT, { VerifiedCallback } from 'passport-jwt'
import dotenv from 'dotenv'
import { Request } from 'express'
import UserModel from '../models/UserModel'

dotenv.config()

const cookieExtractor = (req: Request) => req?.cookies?.token

const jwtOptions = {
  secretOrKey: process.env.JWT_SECRET || 'secret',
  jwtFromRequest: passportJWT.ExtractJwt.fromExtractors([cookieExtractor]),
}

const jwtStrategy = new passportJWT.Strategy(jwtOptions, async (payload: any, done: VerifiedCallback) => {
  try {
    const user = await UserModel.findByPk(payload.id)
    if (user) return done(null, user)
  } catch (e) {
    return done(e, false)
  }
  return done(null, false)
})

export default jwtStrategy
