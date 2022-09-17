export interface IUser {
  id: number
  email: string
  name: string
  role: string
  iat?: number
  exp?: number
}

export interface IAuthenticateRes {
  message: string
  user: IUser
  token?: string
}
