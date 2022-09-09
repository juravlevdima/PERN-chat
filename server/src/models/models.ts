import { sequelize } from '../services/postgres'
import { DataTypes } from 'sequelize'

const UserModel = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: 'USER' },
})

const MessageModel = sequelize.define('message', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  text: { type: DataTypes.STRING, allowNull: false },
})

UserModel.hasMany(MessageModel)
MessageModel.belongsTo(UserModel)

export { UserModel, MessageModel }
