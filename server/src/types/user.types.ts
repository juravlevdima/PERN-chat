export interface IUserPublicData {
  readonly id: number
  email: string
  role: string
  name: string
}

export interface IDecodedToken {
  readonly id: number
  iat?: number
  exp?: number
}
