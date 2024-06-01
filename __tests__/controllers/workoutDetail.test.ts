import request from 'supertest';
import app from '../../src/app';
import WorkoutDetail from '../../src/models/workoutDetail';
import Workout from '../../src/models/workout';
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
let workoutId: string;
let exerciseId: string;

const mockWorkoutDetail = {
  sets: 3,
  reps: 12,
  weight: '100',
};

beforeAll(async () => {
  // Create a user for authentication
  const user = await User.create(mockUser);
  userId = user.id;
  mockToken = jwt.sign({ id: userId, email: mockUser.email }, 'secret-key');

  // Create a workout and exercise for testing
  const workout = await Workout.create({ userId, date: '2024-05-01' });
  workoutId = workout.id;
  const exercise = await Exercise.create({ name: 'Squat', description: 'Leg exercise' });
  exerciseId = exercise.id;
});

describe('WorkoutDetail API', () => {
  beforeEach(async () => {
    await WorkoutDetail.destroy({ where: {} });
  });

  afterAll(async () => {
    await User.destroy({ where: {} });
    await Workout.destroy({ where: {} });
    await Exercise.destroy({ where: {} });
    await WorkoutDetail.destroy({ where: {} });
  });

  it('should create a new workout detail', async () => {
    const workoutDetailData = {
      ...mockWorkoutDetail,
      workoutId,
      exerciseId,
    };

    const response = await request(app)
      .post('/api/workout-details')
      .set('Authorization', `Bearer ${mockToken}`)
      .send(workoutDetailData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.workoutId).toBe(workoutId);
    expect(response.body.exerciseId).toBe(exerciseId);
    expect(response.body.sets).toBe(workoutDetailData.sets);
    expect(response.body.reps).toBe(workoutDetailData.reps);
    expect(response.body.weight).toBe(workoutDetailData.weight);
  });

  it('should fetch all workout details', async () => {
    const workoutDetailData = {
      ...mockWorkoutDetail,
      workoutId,
      exerciseId,
    };

    await WorkoutDetail.create(workoutDetailData);
    
    const response = await request(app)
      .get('/api/workout-details')
      .set('Authorization', `Bearer ${mockToken}`);

    expect(response.status).toBe(200);
    expect(response.body.workoutDetails).toHaveLength(1);
    expect(response.body.workoutDetails[0]).toHaveProperty('id');
    expect(response.body.workoutDetails[0].workoutId).toBe(workoutId);
    expect(response.body.workoutDetails[0].exerciseId).toBe(exerciseId);
    expect(response.body.workoutDetails[0].sets).toBe(workoutDetailData.sets);
    expect(response.body.workoutDetails[0].reps).toBe(workoutDetailData.reps);
    expect(response.body.workoutDetails[0].weight).toBe(workoutDetailData.weight);
  });

  it('should fetch a workout detail by ID', async () => {
    const workoutDetailData = {
      ...mockWorkoutDetail,
      workoutId,
      exerciseId,
    };

    const workoutDetail = await WorkoutDetail.create(workoutDetailData);

    const response = await request(app)
      .get(`/api/workout-details/${workoutDetail.id}`)
      .set('Authorization', `Bearer ${mockToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.workoutId).toBe(workoutId);
    expect(response.body.exerciseId).toBe(exerciseId);
    expect(response.body.sets).toBe(workoutDetailData.sets);
    expect(response.body.reps).toBe(workoutDetailData.reps);
    expect(response.body.weight).toBe(workoutDetailData.weight);
  });

  it('should update a workout detail by ID', async () => {
    const workoutDetailData = {
      ...mockWorkoutDetail,
      workoutId,
      exerciseId,
    };

    const workoutDetail = await WorkoutDetail.create(workoutDetailData);
    const updatedWorkoutDetail = {
      sets: 4,
      reps: 10,
      weight: 80,
    };

    const response = await request(app)
      .put(`/api/workout-details/${workoutDetail.id}`)
      .set('Authorization', `Bearer ${mockToken}`)
      .send(updatedWorkoutDetail);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.workoutId).toBe(workoutId);
    expect(response.body.exerciseId).toBe(exerciseId);
    expect(response.body.sets).toBe(updatedWorkoutDetail.sets);
    expect(response.body.reps).toBe(updatedWorkoutDetail.reps);
    expect(response.body.weight).toBe(updatedWorkoutDetail.weight);
  });

  it('should delete a workout detail by ID', async () => {
    const workoutDetailData = {
      ...mockWorkoutDetail,
      workoutId,
      exerciseId,
    };

    const workoutDetail = await WorkoutDetail.create(workoutDetailData);

    const response = await request(app)
      .delete(`/api/workout-details/${workoutDetail.id}`)
      .set('Authorization', `Bearer ${mockToken}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Workout detail deleted successfully');
  });
});
