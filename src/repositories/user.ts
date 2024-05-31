import bcrypt from 'bcryptjs';
import User, { UserCreationAttributes } from '../models/user';

export const createUser = async (data: UserCreationAttributes): Promise<User> => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  return await User.create({ ...data, password: hashedPassword });
};

export const getAllUsers = async ():Promise<User[]> => {
  return await User.findAll();
};

export const getUserById = async (id: string): Promise<User|null> => {
  return await User.findByPk(id);
};

export const getUserByEmail = async (email: string): Promise<User|null> => {
  return await User.findOne({ where: { email } });
};

export const updateUser = async (id: string, data: Partial<UserCreationAttributes>): Promise<User|null> => {
  const user = await User.findByPk(id);
  if (user) {
    return await user.update(data);
  }
  return null;
};

export const deleteUser = async (id: string): Promise<void|null> => {
  const user = await User.findByPk(id);
  if (user) {
    return await user.destroy();
  }
  return null;
};
