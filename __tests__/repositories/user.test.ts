import * as userRepository from '../../src/repositories/user';
import User from '../../src/models/user';
import bcrypt from 'bcryptjs';

describe('User Repository', () => {
  beforeEach(async () => {
    await User.destroy({ where: {} });
  });

  it('should create a user', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    };

    const user = await userRepository.createUser(userData);

    expect(user).toBeDefined();
    expect(user.id).toBeDefined();
    expect(user.name).toBe(userData.name);
    expect(user.email).toBe(userData.email);
  });

  it('should get all users', async () => {
    const userData1 = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: await bcrypt.hash('password123', 10),
    };
    const userData2 = {
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      password: await bcrypt.hash('password456', 10),
    };

    await User.create(userData1);
    await User.create(userData2);

    const users = await userRepository.getAllUsers();
    const sortedUsers = users.sort((a, b) => a.name.localeCompare(b.name));

    expect(sortedUsers.length).toBe(2);
    expect(sortedUsers[0].name).toBe(users[0].name);
    expect(sortedUsers[1].name).toBe(users[1].name);
  });

  it('should get a user by id', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: await bcrypt.hash('password123', 10),
    };

    const createdUser = await User.create(userData);

    const user = await userRepository.getUserById(createdUser.id);

    expect(user).toBeDefined();
    expect(user!.id).toBe(createdUser.id);
    expect(user!.name).toBe(userData.name);
    expect(user!.email).toBe(userData.email);
  });

  it('should update a user', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: await bcrypt.hash('password123', 10),
    };

    const createdUser = await User.create(userData);

    const updatedData = {
      name: 'John Updated',
      email: 'john.updated@example.com',
    };

    const updatedUser = await userRepository.updateUser(createdUser.id, updatedData);

    expect(updatedUser).toBeDefined();
    expect(updatedUser!.name).toBe(updatedData.name);
    expect(updatedUser!.email).toBe(updatedData.email);
  });

  it('should delete a user', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: await bcrypt.hash('password123', 10),
    };

    const createdUser = await User.create(userData);

    await userRepository.deleteUser(createdUser.id);

    const user = await userRepository.getUserById(createdUser.id);

    expect(user).toBeNull();
  });
});
