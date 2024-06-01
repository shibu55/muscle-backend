import request from 'supertest';
import app from '../../src/app';
import User from '../../src/models/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Mock user data for testing
const mockUser = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  password: 'password123',
};

const mockToken = jwt.sign({ email: mockUser.email }, 'secret-key');

describe('User API', () => {
  beforeEach(async () => {
    await User.destroy({ where: {} });
  });

  afterAll(async () => {
    await User.destroy({ where: {} });
  });

  it('should create a new user', async () => {
    const response = await request(app)
      .post('/api/users')
      .send(mockUser);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(mockUser.name);
    expect(response.body.email).toBe(mockUser.email);
  });

  it('should fetch all users', async () => {
    await User.create(mockUser);
    
    const response = await request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${mockToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0].name).toBe(mockUser.name);
    expect(response.body[0].email).toBe(mockUser.email);
  });

  it('should fetch a user by ID', async () => {
    const user = await User.create(mockUser);

    const response = await request(app)
      .get(`/api/users/${user.id}`)
      .set('Authorization', `Bearer ${mockToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(mockUser.name);
    expect(response.body.email).toBe(mockUser.email);
  });

  it('should update a user by ID', async () => {
    const user = await User.create(mockUser);
    const updatedUser = {
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
    };

    const response = await request(app)
      .put(`/api/users/${user.id}`)
      .set('Authorization', `Bearer ${mockToken}`)
      .send(updatedUser);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(updatedUser.name);
    expect(response.body.email).toBe(updatedUser.email);
  });

  it('should delete a user by ID', async () => {
    const user = await User.create(mockUser);

    const response = await request(app)
      .delete(`/api/users/${user.id}`)
      .set('Authorization', `Bearer ${mockToken}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User deleted successfully');
  });

  it('should login a user and return a token', async () => {
    const password = await bcrypt.hash('password123', 10);
    await User.create({...mockUser, password});

    const response = await request(app)
      .post('/api/login')
      .send({
        email: mockUser.email,
        password: 'password123',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
});
