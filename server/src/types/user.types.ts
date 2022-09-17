export interface IUserPublicData {
  readonly id: number
  email: string
  role: string
  iat?: number
  exp?: number
}
