import request from 'supertest';
import app from '../../src/app';
import Exercise from '../../src/models/exercise';
import jwt from 'jsonwebtoken';

// Mock exercise data for testing
const mockExercise = {
  name: 'Push Up',
  description: 'A basic upper body exercise.',
};

const mockToken = jwt.sign({ email: 'test@example.com' }, 'secret-key');

describe('Exercise API', () => {
  beforeEach(async () => {
    await Exercise.destroy({ where: {} });
  });

  it('should create a new exercise', async () => {
    const response = await request(app)
      .post('/api/exercises')
      .set('Authorization', `Bearer ${mockToken}`)
      .send(mockExercise);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(mockExercise.name);
    expect(response.body.description).toBe(mockExercise.description);
  });

  it('should fetch all exercises', async () => {
    await Exercise.create(mockExercise);
    
    const response = await request(app)
      .get('/api/exercises')
      .set('Authorization', `Bearer ${mockToken}`);

    expect(response.status).toBe(200);
    expect(response.body.exercises).toHaveLength(1);
    expect(response.body.exercises[0]).toHaveProperty('id');
    expect(response.body.exercises[0].name).toBe(mockExercise.name);
    expect(response.body.exercises[0].description).toBe(mockExercise.description);
  });

  it('should fetch an exercise by ID', async () => {
    const exercise = await Exercise.create(mockExercise);

    const response = await request(app)
      .get(`/api/exercises/${exercise.id}`)
      .set('Authorization', `Bearer ${mockToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(mockExercise.name);
    expect(response.body.description).toBe(mockExercise.description);
  });

  it('should update an exercise by ID', async () => {
    const exercise = await Exercise.create(mockExercise);
    const updatedExercise = {
      name: 'Pull Up',
      description: 'An upper body exercise targeting the back and biceps.',
    };

    const response = await request(app)
      .put(`/api/exercises/${exercise.id}`)
      .set('Authorization', `Bearer ${mockToken}`)
      .send(updatedExercise);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(updatedExercise.name);
    expect(response.body.description).toBe(updatedExercise.description);
  });

  it('should delete an exercise by ID', async () => {
    const exercise = await Exercise.create(mockExercise);

    const response = await request(app)
      .delete(`/api/exercises/${exercise.id}`)
      .set('Authorization', `Bearer ${mockToken}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Exercise deleted successfully');
  });
});
