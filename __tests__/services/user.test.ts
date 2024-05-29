import * as userService from '../../src/services/user';
import * as userRepository from '../../src/repositories/user';
import { UserCreationAttributes } from '../../src/models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sinon from 'sinon';

describe('User Service', () => {
  let mock: sinon.SinonMock;
  let bcryptCompareStub: sinon.SinonStub;
  let jwtSignStub: sinon.SinonStub;

  beforeEach(async() => {
    // userRepository全体をモック
    mock = sinon.mock(userRepository);
    bcryptCompareStub = sinon.stub(bcrypt, 'compare');
    jwtSignStub = sinon.stub(jwt, 'sign');
  });

  afterEach(async() => {
    // 各テスト後にモックをリストア
    mock.restore();
    bcryptCompareStub.restore();
    jwtSignStub.restore();
  });

  it('should create a user', async () => {
    const userData: Omit<UserCreationAttributes, 'id'> = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123'
    };

    const createdUser = {
      id: 1,
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // createUserが特定の引数で呼び出されることを期待
    mock.expects('createUser').withExactArgs(userData).resolves(createdUser);

    const result = await userService.createUser(userData);

    expect(result).toEqual(createdUser);

    // 期待通りの呼び出しが行われたことを検証
    mock.verify();
  });

  it('should get all users', async () => {
    const users = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        password: 'password456',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    // getAllUsersが呼び出されることを期待
    mock.expects('getAllUsers').resolves(users);

    const result = await userService.getAllUsers();

    expect(result).toEqual(users);

    // 期待通りの呼び出しが行われたことを検証
    mock.verify();
  });

  it('should get a user by id', async () => {
    const user = {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // getUserByIdが特定の引数で呼び出されることを期待
    mock.expects('getUserById').withExactArgs(1).resolves(user);

    const result = await userService.getUserById(1);

    expect(result).toEqual(user);

    // 期待通りの呼び出しが行われたことを検証
    mock.verify();
  });

  it('should update a user', async () => {
    const userUpdatedData: Omit<UserCreationAttributes, 'id'> = {
      name: 'John Doe Sue',
      email: 'john.doe.sue@example.com',
      password: 'password123'
    };
    const updatedUser = {
      id: 1,
      ...userUpdatedData,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // updateUserが特定の引数で呼び出されることを期待
    mock.expects('updateUser').withExactArgs(1, userUpdatedData).resolves(updatedUser);

    const result = await userService.updateUser(1, userUpdatedData);

    expect(result).toEqual(updatedUser);

    // 期待通りの呼び出しが行われたことを検証
    mock.verify();
  });

  it('should delete a user', async () => {
    const userId = 1;

    // deleteUserが特定の引数で呼び出されることを期待
    mock.expects('deleteUser').withExactArgs(userId).resolves(true);

    const result = await userService.deleteUser(userId);

    expect(result).toBe(true);

    // 期待通りの呼び出しが行われたことを検証
    mock.verify();
  });

  it('should authenticate a user and return a token', async () => {
    const userEmail = 'john.doe@example.com';
    const password = 'password123';
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // getUserByEmailが特定の引数で呼び出されることを期待
    mock.expects('getUserByEmail').withExactArgs(userEmail).resolves(user);
    bcryptCompareStub.withArgs(password, user.password).resolves(true);
    const token = 'mock-token';
    jwtSignStub.withArgs({ id: user.id, email: user.email }, 'secret-key', { expiresIn: '1h' }).returns(token);

    const result = await userService.authenticateUser(userEmail, password);

    expect(result).toEqual({ token });

    // 期待通りの呼び出しが行われたことを検証
    mock.verify();
    sinon.assert.calledOnceWithExactly(bcryptCompareStub, password, user.password);
    sinon.assert.calledOnceWithExactly(jwtSignStub, { id: user.id, email: user.email }, 'secret-key', { expiresIn: '1h' });
  });

  it('should throw an error if email is invalid', async () => {
    const email = 'invalid@example.com';
    const password = 'password123';

    mock.expects('getUserByEmail').withExactArgs(email).resolves(null);

    try {
      await userService.authenticateUser(email, password);
    } catch (err) {
      expect((err as Error).message).toBe('Invalid email or password');
    }

    mock.verify();
    sinon.assert.notCalled(bcryptCompareStub);
    sinon.assert.notCalled(jwtSignStub);
  });

  it('should throw an error if password is invalid', async () => {
    const email = 'john.doe@example.com';
    const password = 'invalidpassword';
    const user = {
      id: 1,
      name: 'John Doe',
      email: email,
      password: await bcrypt.hash('password123', 10),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    mock.expects('getUserByEmail').withExactArgs(email).resolves(user);
    bcryptCompareStub.withArgs(password, user.password).resolves(false);

    try {
      await userService.authenticateUser(email, password);
    } catch (err) {
      expect((err as Error).message).toBe('Invalid email or password');
    }

    mock.verify();
    sinon.assert.calledOnceWithExactly(bcryptCompareStub, password, user.password);
    sinon.assert.notCalled(jwtSignStub);
  });
});
