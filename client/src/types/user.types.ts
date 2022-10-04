export interface IUser {
  readonly id: number
  email: string
  name: string
  role: string
  avatar: string
}

export interface IAuthenticateRes {
  message: string
  user: IUser
  token?: string
}
