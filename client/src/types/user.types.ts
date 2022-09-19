export interface IUser {
  readonly id: number
  email: string
  name: string
  role: string
}

export interface IAuthenticateRes {
  message: string
  user: IUser
  token?: string
}
