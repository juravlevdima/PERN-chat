// import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize'
// import { sequelize } from '../services/postgres'
// import bcrypt from 'bcrypt'
//
// interface IMessageModel extends Model<InferAttributes<IMessageModel>, InferCreationAttributes<IMessageModel>> {
//   id: CreationOptional<number>
//   text: string
// }
//
// interface IUserModel extends Model<InferAttributes<IUserModel>, InferCreationAttributes<IUserModel>> {
//   id: CreationOptional<number>
//   email: string
//   name: string
//   password: string
//   role: string
// }
//
// interface IRoomModel extends Model<InferAttributes<IRoomModel>, InferCreationAttributes<IRoomModel>> {
//   id: CreationOptional<number>
//   name: string
// }
//
// const MessageModel = sequelize.define<IMessageModel>('message', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true
//   },
//   text: { type: DataTypes.STRING, allowNull: false }
// })
//
// const RoomModel = sequelize.define<IRoomModel>('room', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true
//   },
//   name: { type: DataTypes.STRING },
// })
//
// const UserModel = sequelize.define<IUserModel>('user', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true
//   },
//   email: { type: DataTypes.STRING, unique: true },
//   name: { type: DataTypes.STRING },
//   password: { type: DataTypes.STRING },
//   role: { type: DataTypes.STRING, defaultValue: 'USER' },
// })
//
// UserModel.beforeCreate(async (user: IUserModel) => {
//   user.password = await bcrypt.hash(user.password, 10)
// })
//
// UserModel.hasMany(MessageModel)
// MessageModel.belongsTo(UserModel)
//
// RoomModel.hasMany(MessageModel)
// MessageModel.belongsTo(RoomModel)
//
// export { UserModel, MessageModel, RoomModel }
