import { sequelize } from '../services/postgres'
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize'
import MessageModel from './MessageModel'

export interface IRoomModel extends Model<InferAttributes<IRoomModel>, InferCreationAttributes<IRoomModel>> {
  id: CreationOptional<number>
  name: string
}

const RoomModel = sequelize.define<IRoomModel>('room', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: { type: DataTypes.STRING },
})

RoomModel.hasMany(MessageModel)
MessageModel.belongsTo(RoomModel)

export default RoomModel
