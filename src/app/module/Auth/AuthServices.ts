import { TUser } from '../User/user.interface';
import bcrypt from 'bcrypt';
import User from '../User/user.model';
import jwt from 'jsonwebtoken';
import config from '../../config';
const RegisterUserIntoDB = async (payload: Partial<TUser>) => {
  const { email, password } = payload;
  const isDuplicateUser = await User.isUserExistsByEmail(email as string);
  if (isDuplicateUser) throw new Error('User already exists');
  const hashedPassword = bcrypt.hashSync(password as string, 10);
  const encryptedUserDetails = { ...payload, password: hashedPassword };
  const result = await User.create(encryptedUserDetails);
  result.password = '';
  return result;
};

const Login = async (payload: { email: string; password: string }) => {
  const { email, password } = payload;
  const user = await User.isUserExistsByEmail(email);
  if (!user) throw new Error('User not found');
  const isPasswordMatched = bcrypt.compareSync(
    password,
    user.password as string,
  );
  if (!isPasswordMatched) throw new Error('Password is incorrect');
  const accessToken = jwt.sign(
    { role: user.role, email: user.email },
    config.jwt_access_secret as string,
    { expiresIn: config.jwt_access_expirity as string },
  );
  return { accessToken };
};

export const AuthServices = {
  RegisterUserIntoDB,
  Login,
};
