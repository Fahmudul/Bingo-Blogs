import mongoose, { model } from 'mongoose';
import { TUser, UserModel } from './user.interface';

const UserSchema = new mongoose.Schema<TUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.static('isUserExistsByEmail', async function (email: string) {
  return await User.findOne({ email }).select("+password");
});


const User = model<TUser, UserModel>('User', UserSchema);
export default User;
