import { Request, Response, NextFunction } from 'express'
import passport from 'passport'

const handleJWT = (req: Request, res: Response, next: NextFunction, roles: Array<string>) => {
  // @ts-ignore
  return async (err, user) => {
    if (err || !user) return res.status(401).json({ err, message: 'Доступ запрещен!' })

    if (!roles.includes(user.role)) return res.status(401).json({ message: 'Доступ запрещен!' })

    req.user = user
    return next()
  }
}

const authMiddleware = (roles: Array<string> = []) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const authenticate = passport.authenticate('jwt', { session: false }, handleJWT(req, res, next, roles))
    return authenticate(req, res, next)
  }
}

export default authMiddleware
