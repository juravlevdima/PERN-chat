export interface IUserPublicData {
  readonly id: number
  email: string
  role: string
  name: string
  avatar: string
}

export interface IJoinedUser {
  user: IUserPublicData
}

export interface IDecodedToken {
  readonly id: number
  iat?: number
  exp?: number
}
