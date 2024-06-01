import * as bodyMeasurementRepository from '../../src/repositories/bodyMeasurement';
import BodyMeasurement from '../../src/models/bodyMeasurement';
import User from '../../src/models/user';

describe('BodyMeasurement Repository', () => {
  let userId1: string;
  let userId2: string;

  beforeAll(async () => {
    // テスト用のユーザーを作成
    const user1 = await User.create({ name: 'Test User 1', email: 'user1@example.com', password: 'password1', height: '170', weight: '70' });
    const user2 = await User.create({ name: 'Test User 2', email: 'user2@example.com', password: 'password2', height: '175', weight: '75' });
    userId1 = user1.id;
    userId2 = user2.id;
  });

  beforeEach(async () => {
    await BodyMeasurement.destroy({ where: {} });
  });

  afterAll(async () => {
    await User.destroy({ where: {} });
    await BodyMeasurement.destroy({ where: {} });
  });

  it('should create a body measurement', async () => {
    const bodyMeasurementData = {
      userId: userId1,
      date: new Date(),
      height: '170',
      weight: '70',
      bodyFat: '15',
      muscleMass: '60',
    };

    const bodyMeasurement = await bodyMeasurementRepository.createBodyMeasurement(bodyMeasurementData);

    expect(bodyMeasurement).toBeDefined();
    expect(bodyMeasurement.id).toBeDefined();
    expect(bodyMeasurement.userId).toBe(bodyMeasurementData.userId);
    expect(bodyMeasurement.height).toBe(bodyMeasurementData.height);
    expect(bodyMeasurement.weight).toBe(bodyMeasurementData.weight);
    expect(bodyMeasurement.bodyFat).toBe(bodyMeasurementData.bodyFat);
    expect(bodyMeasurement.muscleMass).toBe(bodyMeasurementData.muscleMass);
  });

  it('should get all body measurements', async () => {
    const bodyMeasurementData1 = {
      userId: userId1,
      date: new Date(),
      height: '170',
      weight: '70',
      bodyFat: '15',
      muscleMass: '60',
    };
    const bodyMeasurementData2 = {
      userId: userId2,
      date: new Date(),
      height: '175',
      weight: '75',
      bodyFat: '20',
      muscleMass: '65',
    };

    await BodyMeasurement.create(bodyMeasurementData1);
    await BodyMeasurement.create(bodyMeasurementData2);

    const bodyMeasurements = await bodyMeasurementRepository.getAllBodyMeasurements();

    expect(bodyMeasurements.length).toBe(2);
  });

  it('should get a body measurement by id', async () => {
    const bodyMeasurementData = {
      userId: userId1,
      date: new Date(),
      height: '170',
      weight: '70',
      bodyFat: '15',
      muscleMass: '60',
    };

    const createdBodyMeasurement = await BodyMeasurement.create(bodyMeasurementData);

    const bodyMeasurement = await bodyMeasurementRepository.getBodyMeasurementById(createdBodyMeasurement.id);

    expect(bodyMeasurement).toBeDefined();
    expect(bodyMeasurement!.id).toBe(createdBodyMeasurement.id);
    expect(bodyMeasurement!.userId).toBe(bodyMeasurementData.userId);
    expect(bodyMeasurement!.height).toBe(bodyMeasurementData.height);
    expect(bodyMeasurement!.weight).toBe(bodyMeasurementData.weight);
    expect(bodyMeasurement!.bodyFat).toBe(bodyMeasurementData.bodyFat);
    expect(bodyMeasurement!.muscleMass).toBe(bodyMeasurementData.muscleMass);
  });

  it('should update a body measurement', async () => {
    const bodyMeasurementData = {
      userId: userId1,
      date: new Date(),
      height: '170',
      weight: '70',
      bodyFat: '15',
      muscleMass: '60',
    };

    const createdBodyMeasurement = await BodyMeasurement.create(bodyMeasurementData);

    const updatedData = {
      height: '175',
      weight: '75',
      bodyFat: '20',
      muscleMass: '65',
    };

    const updatedBodyMeasurement = await bodyMeasurementRepository.updateBodyMeasurement(createdBodyMeasurement.id, updatedData);

    expect(updatedBodyMeasurement).toBeDefined();
    expect(updatedBodyMeasurement!.height).toBe(updatedData.height);
    expect(updatedBodyMeasurement!.weight).toBe(updatedData.weight);
    expect(updatedBodyMeasurement!.bodyFat).toBe(updatedData.bodyFat);
    expect(updatedBodyMeasurement!.muscleMass).toBe(updatedData.muscleMass);
  });

  it('should delete a body measurement', async () => {
    const bodyMeasurementData = {
      userId: userId1,
      date: new Date(),
      height: '170',
      weight: '70',
      bodyFat: '15',
      muscleMass: '60',
    };

    const createdBodyMeasurement = await BodyMeasurement.create(bodyMeasurementData);

    await bodyMeasurementRepository.deleteBodyMeasurement(createdBodyMeasurement.id);

    const bodyMeasurement = await bodyMeasurementRepository.getBodyMeasurementById(createdBodyMeasurement.id);

    expect(bodyMeasurement).toBeNull();
  });
});
