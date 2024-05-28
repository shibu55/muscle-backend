import User, {UserCreationAttributes} from '../models/user';

export const createUser = async (data: Omit<UserCreationAttributes, 'id'>) => {
  return await User.create(data);
};

export const getAllUsers = async () => {
  return await User.findAll();
};

export const getUserById = async (id: number) => {
  return await User.findByPk(id);
};

export const updateUser = async (id: number, data: Partial<UserCreationAttributes>) => {
  const user = await User.findByPk(id);
  if (user) {
    return await user.update(data);
  }
  return null;
};

export const deleteUser = async (id: number) => {
  const user = await User.findByPk(id);
  if (user) {
    return await user.destroy();
  }
  return null;
};
