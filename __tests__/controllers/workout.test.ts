import request from 'supertest';
import app from '../../src/app';
import Workout from '../../src/models/workout';
import User from '../../src/models/user';
import jwt from 'jsonwebtoken';

// Mock data for testing
const mockUser = {
  name: 'Test User',
  email: 'test@example.com',
  password: 'password',
  height: '170',
  weight: '70'
};

let mockToken: string;
let userId: string;

const mockWorkout = {
  date: '2024-05-01',
};

beforeAll(async () => {
  // Create a user for authentication
  const user = await User.create(mockUser);
  userId = user.id;
  mockToken = jwt.sign({ id: userId, email: mockUser.email }, 'secret-key');
});

describe('Workout API', () => {
  beforeEach(async () => {
    await Workout.destroy({ where: {} });
  });

  afterAll(async () => {
    await User.destroy({ where: {} });
    await Workout.destroy({ where: {} });
  });

  it('should create a new workout', async () => {
    const workoutData = {
      ...mockWorkout,
      userId
    };

    const response = await request(app)
      .post('/api/workouts')
      .set('Authorization', `Bearer ${mockToken}`)
      .send(workoutData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.userId).toBe(userId);
    expect(response.body.date).toBe(workoutData.date);
  });

  it('should fetch all workouts', async () => {
    const workoutData = {
      ...mockWorkout,
      userId
    };

    await Workout.create(workoutData);
    
    const response = await request(app)
      .get('/api/workouts')
      .set('Authorization', `Bearer ${mockToken}`);

    expect(response.status).toBe(200);
    expect(response.body.workouts).toHaveLength(1);
    expect(response.body.workouts[0]).toHaveProperty('id');
    expect(response.body.workouts[0].userId).toBe(userId);
    expect(response.body.workouts[0].date).toBe(workoutData.date);
  });

  it('should fetch a workout by ID', async () => {
    const workoutData = {
      ...mockWorkout,
      userId
    };

    const workout = await Workout.create(workoutData);

    const response = await request(app)
      .get(`/api/workouts/${workout.id}`)
      .set('Authorization', `Bearer ${mockToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.userId).toBe(userId);
    expect(response.body.date).toBe(workoutData.date);
  });

  it('should update a workout by ID', async () => {
    const workoutData = {
      ...mockWorkout,
      userId
    };

    const workout = await Workout.create(workoutData);
    const updatedWorkout = {
      date: '2024-06-01',
    };

    const response = await request(app)
      .put(`/api/workouts/${workout.id}`)
      .set('Authorization', `Bearer ${mockToken}`)
      .send(updatedWorkout);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.userId).toBe(userId);
    expect(response.body.date).toBe(updatedWorkout.date);
  });

  it('should delete a workout by ID', async () => {
    const workoutData = {
      ...mockWorkout,
      userId
    };

    const workout = await Workout.create(workoutData);

    const response = await request(app)
      .delete(`/api/workouts/${workout.id}`)
      .set('Authorization', `Bearer ${mockToken}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Workout deleted successfully');
  });
});
