import { sequelize } from '../services/postgres'
import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import bcrypt from 'bcrypt'

interface IUserModel extends Model<InferAttributes<IUserModel>, InferCreationAttributes<IUserModel>> {
  id: CreationOptional<number>
  email: string
  name: string
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
  name: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: 'USER' },
})

UserModel.beforeCreate(async (user: IUserModel) => {
  user.password = await bcrypt.hash(user.password, 10)
})

export default UserModel
