import * as bodyMeasurementService from '../../src/services/bodyMeasurement';
import * as bodyMeasurementRepository from '../../src/repositories/bodyMeasurement';
import { BodyMeasurementCreationAttributes } from '../../src/models/bodyMeasurement';
import sinon from 'sinon';
import { v4 as uuidv4 } from 'uuid';

describe('BodyMeasurement Service', () => {
  let mock: sinon.SinonMock;

  beforeEach(async () => {
    // bodyMeasurementRepository全体をモック
    mock = sinon.mock(bodyMeasurementRepository);
  });

  afterEach(async () => {
    // 各テスト後にモックをリストア
    mock.restore();
  });

  it('should create a body measurement', async () => {
    const bodyMeasurementData: Omit<BodyMeasurementCreationAttributes, 'id'> = {
      userId: uuidv4(),
      date: new Date(),
      height: '170',
      weight: '70',
      bodyFat: '15',
      muscleMass: '60',
    };

    const createdBodyMeasurement = {
      id: uuidv4(),
      ...bodyMeasurementData,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // createBodyMeasurementが特定の引数で呼び出されることを期待
    mock.expects('createBodyMeasurement').withExactArgs(bodyMeasurementData).resolves(createdBodyMeasurement);

    const result = await bodyMeasurementService.createBodyMeasurement(bodyMeasurementData);

    expect(result).toEqual(createdBodyMeasurement);

    // 期待通りの呼び出しが行われたことを検証
    mock.verify();
  });

  it('should get all body measurements', async () => {
    const bodyMeasurements = [
      {
        id: uuidv4(),
        userId: uuidv4(),
        date: new Date(),
        height: '170',
        weight: '70',
        bodyFat: '15',
        muscleMass: '60',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        userId: uuidv4(),
        date: new Date(),
        height: '175',
        weight: '75',
        bodyFat: '20',
        muscleMass: '65',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    // getAllBodyMeasurementsが呼び出されることを期待
    mock.expects('getAllBodyMeasurements').resolves(bodyMeasurements);

    const result = await bodyMeasurementService.getAllBodyMeasurements();

    // 取得したボディメジャメントを日付でソート
    const sortedBodyMeasurements = result.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

    expect(sortedBodyMeasurements.length).toBe(2);
    expect(sortedBodyMeasurements[0].createdAt).toEqual(bodyMeasurements[0].createdAt);
    expect(sortedBodyMeasurements[1].createdAt).toEqual(bodyMeasurements[1].createdAt);

    // 期待通りの呼び出しが行われたことを検証
    mock.verify();
  });

  it('should get a body measurement by id', async () => {
    const bodyMeasurement = {
      id: uuidv4(),
      userId: uuidv4(),
      date: new Date(),
      height: '170',
      weight: '70',
      bodyFat: '15',
      muscleMass: '60',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // getBodyMeasurementByIdが特定の引数で呼び出されることを期待
    mock.expects('getBodyMeasurementById').withExactArgs(bodyMeasurement.id).resolves(bodyMeasurement);

    const result = await bodyMeasurementService.getBodyMeasurementById(bodyMeasurement.id);

    expect(result).toEqual(bodyMeasurement);

    // 期待通りの呼び出しが行われたことを検証
    mock.verify();
  });

  it('should update a body measurement', async () => {
    const bodyMeasurementId = uuidv4();
    const bodyMeasurementUpdatedData: Partial<BodyMeasurementCreationAttributes> = {
      height: '175',
      weight: '75',
      bodyFat: '20',
      muscleMass: '65',
    };
    const updatedBodyMeasurement = {
      id: bodyMeasurementId,
      userId: uuidv4(),
      date: new Date(),
      ...bodyMeasurementUpdatedData,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // updateBodyMeasurementが特定の引数で呼び出されることを期待
    mock.expects('updateBodyMeasurement').withExactArgs(bodyMeasurementId, bodyMeasurementUpdatedData).resolves(updatedBodyMeasurement);

    const result = await bodyMeasurementService.updateBodyMeasurement(bodyMeasurementId, bodyMeasurementUpdatedData);

    expect(result).toEqual(updatedBodyMeasurement);

    // 期待通りの呼び出しが行われたことを検証
    mock.verify();
  });

  it('should delete a body measurement', async () => {
    const bodyMeasurementId = uuidv4();

    // deleteBodyMeasurementが特定の引数で呼び出されることを期待
    mock.expects('deleteBodyMeasurement').withExactArgs(bodyMeasurementId).resolves(true);

    const result = await bodyMeasurementService.deleteBodyMeasurement(bodyMeasurementId);

    expect(result).toBe(true);

    // 期待通りの呼び出しが行われたことを検証
    mock.verify();
  });
});
