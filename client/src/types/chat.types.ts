export interface IRoom {
  readonly id: number
  name: string
  messages?: Array<IMessage>
  createdAt?: string
  updatedAt?: string
}

export interface  IMessage {
  readonly id: number
  roomId: number
  userId: number
  text: string
  user: { name: string }
  createdAt?: string
  updatedAt?: string
}
