import request from 'supertest';
import app from '../../src/app';
import BodyMeasurement from '../../src/models/bodyMeasurement';
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

const mockBodyMeasurement = {
  date: new Date(),
  height: '170',
  weight: '70',
  bodyFat: '15',
  muscleMass: '60',
};

beforeAll(async () => {
  // Create a user for authentication
  const user = await User.create(mockUser);
  userId = user.id;
  mockToken = jwt.sign({ id: userId, email: mockUser.email }, 'secret-key');
});

describe('BodyMeasurement API', () => {
  beforeEach(async () => {
    await BodyMeasurement.destroy({ where: {} });
  });

  afterAll(async () => {
    await User.destroy({ where: {} });
    await BodyMeasurement.destroy({ where: {} });
  });

  it('should create a new body measurement', async () => {
    const bodyMeasurementData = {
      ...mockBodyMeasurement,
      userId,
    };

    const response = await request(app)
      .post('/api/body-measurements')
      .set('Authorization', `Bearer ${mockToken}`)
      .send(bodyMeasurementData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.userId).toBe(userId);
    expect(response.body.height).toBe(bodyMeasurementData.height);
    expect(response.body.weight).toBe(bodyMeasurementData.weight);
    expect(response.body.bodyFat).toBe(bodyMeasurementData.bodyFat);
    expect(response.body.muscleMass).toBe(bodyMeasurementData.muscleMass);
  });

  it('should fetch all body measurements', async () => {
    const bodyMeasurementData = {
      ...mockBodyMeasurement,
      userId,
    };

    await BodyMeasurement.create(bodyMeasurementData);
    
    const response = await request(app)
      .get('/api/body-measurements')
      .set('Authorization', `Bearer ${mockToken}`);

    expect(response.status).toBe(200);
    expect(response.body.bodyMeasurements).toHaveLength(1);
    expect(response.body.bodyMeasurements[0]).toHaveProperty('id');
    expect(response.body.bodyMeasurements[0].userId).toBe(userId);
    expect(response.body.bodyMeasurements[0].height).toBe(bodyMeasurementData.height);
    expect(response.body.bodyMeasurements[0].weight).toBe(bodyMeasurementData.weight);
    expect(response.body.bodyMeasurements[0].bodyFat).toBe(bodyMeasurementData.bodyFat);
    expect(response.body.bodyMeasurements[0].muscleMass).toBe(bodyMeasurementData.muscleMass);
  });

  it('should fetch a body measurement by ID', async () => {
    const bodyMeasurementData = {
      ...mockBodyMeasurement,
      userId,
    };

    const bodyMeasurement = await BodyMeasurement.create(bodyMeasurementData);

    const response = await request(app)
      .get(`/api/body-measurements/${bodyMeasurement.id}`)
      .set('Authorization', `Bearer ${mockToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.userId).toBe(userId);
    expect(response.body.height).toBe(bodyMeasurementData.height);
    expect(response.body.weight).toBe(bodyMeasurementData.weight);
    expect(response.body.bodyFat).toBe(bodyMeasurementData.bodyFat);
    expect(response.body.muscleMass).toBe(bodyMeasurementData.muscleMass);
  });

  it('should update a body measurement by ID', async () => {
    const bodyMeasurementData = {
      ...mockBodyMeasurement,
      userId,
    };

    const bodyMeasurement = await BodyMeasurement.create(bodyMeasurementData);
    const updatedBodyMeasurement = {
      height: '175',
      weight: '75',
      bodyFat: '20',
      muscleMass: '65',
    };

    const response = await request(app)
      .put(`/api/body-measurements/${bodyMeasurement.id}`)
      .set('Authorization', `Bearer ${mockToken}`)
      .send(updatedBodyMeasurement);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.userId).toBe(userId);
    expect(response.body.height).toBe(updatedBodyMeasurement.height);
    expect(response.body.weight).toBe(updatedBodyMeasurement.weight);
    expect(response.body.bodyFat).toBe(updatedBodyMeasurement.bodyFat);
    expect(response.body.muscleMass).toBe(updatedBodyMeasurement.muscleMass);
  });

  it('should delete a body measurement by ID', async () => {
    const bodyMeasurementData = {
      ...mockBodyMeasurement,
      userId,
    };

    const bodyMeasurement = await BodyMeasurement.create(bodyMeasurementData);

    const response = await request(app)
      .delete(`/api/body-measurements/${bodyMeasurement.id}`)
      .set('Authorization', `Bearer ${mockToken}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Body measurement deleted successfully');
  });
});
