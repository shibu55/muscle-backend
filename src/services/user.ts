import * as userRepository from '../repositories/user';
import { UserCreationAttributes } from '../models/user';

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
