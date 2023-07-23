import { Model, Schema, model } from 'mongoose'
import { TUser } from './user.interface'

type UserModel = Model<TUser, object>

const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  },
)

const Users = model<TUser, UserModel>('Users', userSchema)

export default Users
