import * as userRepository from '../repositories/user';
import { UserCreationAttributes } from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY || 'secret-key';

export const createUser = async (data: Omit<UserCreationAttributes, 'id'>) => {
  return await userRepository.createUser(data);
};

export const getAllUsers = async () => {
  return await userRepository.getAllUsers();
};

export const getUserById = async (id: number) => {
  return await userRepository.getUserById(id);
};

export const updateUser = async (id: number, data: Partial<UserCreationAttributes>) => {
  return await userRepository.updateUser(id, data);
};

export const deleteUser = async (id: number) => {
  return await userRepository.deleteUser(id);
};

export const authenticateUser = async (email: string, password: string) => {
  const user = await userRepository.getUserByEmail(email);
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
    return { token };
  }
  throw new Error('Invalid email or password');
};
