import { sequelize } from '../services/postgres'
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize'

export interface IMessageModel extends Model<InferAttributes<IMessageModel>, InferCreationAttributes<IMessageModel>> {
  id: CreationOptional<number>
  text: string
}

const MessageModel = sequelize.define<IMessageModel>('message', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  text: { type: DataTypes.STRING(1000), allowNull: false }
})

export default MessageModel
