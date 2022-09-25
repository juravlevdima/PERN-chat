import { IRoomModel } from '../models/RoomModel'
import { IMessageModel } from '../models/MessageModel'

export interface IRoomWithMessages extends IRoomModel {
  messages: Array<IMessageModel>
}
