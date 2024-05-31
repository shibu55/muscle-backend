import * as userRepository from '../repositories/user';
import User, { UserCreationAttributes } from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY || 'secret-key';

export const createUser = async (data: UserCreationAttributes): Promise<User> => {
  return await userRepository.createUser(data);
};

export const getAllUsers = async ():Promise<User[]> => {
  return await userRepository.getAllUsers();
};

export const getUserById = async (id: string): Promise<User|null> => {
  return await userRepository.getUserById(id);
};

export const updateUser = async (id: string, data: Partial<UserCreationAttributes>): Promise<User|null> => {
  return await userRepository.updateUser(id, data);
};

export const deleteUser = async (id: string): Promise<void|null> => {
  return await userRepository.deleteUser(id);
};

export const authenticateUser = async (email: string, password: string): Promise<{token: string}> => {
  const user = await userRepository.getUserByEmail(email);
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
    return { token };
  }
  throw new Error('Invalid email or password');
};
