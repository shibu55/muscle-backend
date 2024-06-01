import request from 'supertest';
import app from '../../src/app';
import ExerciseLog from '../../src/models/exerciseLog';
import Exercise from '../../src/models/exercise';
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
let exerciseId: string;

const mockExerciseLog = {
  sets: 3,
  reps: 12,
  weight: '100',
  date: new Date('2024-05-01')
};

beforeAll(async () => {
  // Create a user for authentication
  const user = await User.create(mockUser);
  userId = user.id;
  mockToken = jwt.sign({ id: userId, email: mockUser.email }, 'secret-key');

  // Create an exercise for testing
  const exercise = await Exercise.create({ name: 'Squat', description: 'Leg exercise' });
  exerciseId = exercise.id;
});

describe('ExerciseLog API', () => {
  beforeEach(async () => {
    await ExerciseLog.destroy({ where: {} });
  });

  afterAll(async () => {
    await User.destroy({ where: {} });
    await Exercise.destroy({ where: {} });
    await ExerciseLog.destroy({ where: {} });
  });

  it('should create a new exercise log', async () => {
    const exerciseLogData = {
      ...mockExerciseLog,
      userId,
      exerciseId,
    };

    const response = await request(app)
      .post('/api/exercise-logs')
      .set('Authorization', `Bearer ${mockToken}`)
      .send(exerciseLogData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.userId).toBe(userId);
    expect(response.body.exerciseId).toBe(exerciseId);
    expect(response.body.sets).toBe(exerciseLogData.sets);
    expect(response.body.reps).toBe(exerciseLogData.reps);
    expect(response.body.weight).toBe(exerciseLogData.weight);
  });

  it('should fetch all exercise logs', async () => {
    const exerciseLogData = {
      ...mockExerciseLog,
      userId,
      exerciseId,
    };

    await ExerciseLog.create(exerciseLogData);

    const response = await request(app)
      .get('/api/exercise-logs')
      .set('Authorization', `Bearer ${mockToken}`);

    expect(response.status).toBe(200);
    expect(response.body.exerciseLogs).toHaveLength(1);
    expect(response.body.exerciseLogs[0]).toHaveProperty('id');
    expect(response.body.exerciseLogs[0].userId).toBe(userId);
    expect(response.body.exerciseLogs[0].exerciseId).toBe(exerciseId);
    expect(response.body.exerciseLogs[0].sets).toBe(exerciseLogData.sets);
    expect(response.body.exerciseLogs[0].reps).toBe(exerciseLogData.reps);
    expect(response.body.exerciseLogs[0].weight).toBe(exerciseLogData.weight);
  });

  it('should fetch an exercise log by ID', async () => {
    const exerciseLogData = {
      ...mockExerciseLog,
      userId,
      exerciseId,
    };

    const exerciseLog = await ExerciseLog.create(exerciseLogData);

    const response = await request(app)
      .get(`/api/exercise-logs/${exerciseLog.id}`)
      .set('Authorization', `Bearer ${mockToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.userId).toBe(userId);
    expect(response.body.exerciseId).toBe(exerciseId);
    expect(response.body.sets).toBe(exerciseLogData.sets);
    expect(response.body.reps).toBe(exerciseLogData.reps);
    expect(response.body.weight).toBe(exerciseLogData.weight);
  });

  it('should update an exercise log by ID', async () => {
    const exerciseLogData = {
      ...mockExerciseLog,
      userId,
      exerciseId,
    };

    const exerciseLog = await ExerciseLog.create(exerciseLogData);
    const updatedExerciseLog = {
      sets: 4,
      reps: 10,
      weight: 80,
    };

    const response = await request(app)
      .put(`/api/exercise-logs/${exerciseLog.id}`)
      .set('Authorization', `Bearer ${mockToken}`)
      .send(updatedExerciseLog);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.userId).toBe(userId);
    expect(response.body.exerciseId).toBe(exerciseId);
    expect(response.body.sets).toBe(updatedExerciseLog.sets);
    expect(response.body.reps).toBe(updatedExerciseLog.reps);
    expect(response.body.weight).toBe(updatedExerciseLog.weight);
  });

  it('should delete an exercise log by ID', async () => {
    const exerciseLogData = {
      ...mockExerciseLog,
      userId,
      exerciseId,
    };

    const exerciseLog = await ExerciseLog.create(exerciseLogData);

    const response = await request(app)
      .delete(`/api/exercise-logs/${exerciseLog.id}`)
      .set('Authorization', `Bearer ${mockToken}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Exercise log deleted successfully');
  });
});
