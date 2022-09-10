import { sequelize } from '../services/postgres'
import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import bcrypt from 'bcrypt'
import MessageModel from './MessageModel'

interface IUserModel extends Model<InferAttributes<IUserModel>, InferCreationAttributes<IUserModel>> {
  id: CreationOptional<number>
  email: string
  password: string
  role: string
}

const UserModel = sequelize.define<IUserModel>('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: 'USER' },
})

UserModel.beforeCreate(async (user: IUserModel) => {
  user.password = await bcrypt.hash(user.password, 10)
})

UserModel.hasMany(MessageModel)
MessageModel.belongsTo(UserModel)

export default UserModel
