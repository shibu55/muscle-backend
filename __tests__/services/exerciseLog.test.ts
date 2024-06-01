import * as exerciseLogService from '../../src/services/exerciseLog';
import * as exerciseLogRepository from '../../src/repositories/exerciseLog';
import { ExerciseLogCreationAttributes } from '../../src/models/exerciseLog';
import sinon from 'sinon';
import { v4 as uuidv4 } from 'uuid';

describe('ExerciseLog Service', () => {
  let mock: sinon.SinonMock;

  beforeEach(async () => {
    // exerciseLogRepository全体をモック
    mock = sinon.mock(exerciseLogRepository);
  });

  afterEach(async () => {
    // 各テスト後にモックをリストア
    mock.restore();
  });

  it('should create an exercise log', async () => {
    const exerciseLogData: Omit<ExerciseLogCreationAttributes, 'id'> = {
      userId: uuidv4(),
      exerciseId: uuidv4(),
      date: new Date('2024-05-01'),
      sets: 3,
      reps: 12,
      weight: '100',
    };

    const createdExerciseLog = {
      id: uuidv4(),
      ...exerciseLogData,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // createExerciseLogが特定の引数で呼び出されることを期待
    mock.expects('createExerciseLog').withExactArgs(exerciseLogData).resolves(createdExerciseLog);

    const result = await exerciseLogService.createExerciseLog(exerciseLogData);

    expect(result).toEqual(createdExerciseLog);

    // 期待通りの呼び出しが行われたことを検証
    mock.verify();
  });

  it('should get all exercise logs', async () => {
    const exerciseLogs = [
      {
        id: uuidv4(),
        userId: uuidv4(),
        exerciseId: uuidv4(),
        date: new Date('2024-05-01'),
        sets: 3,
        reps: 12,
        weight: '100',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        userId: uuidv4(),
        exerciseId: uuidv4(),
        date: new Date('2024-05-02'),
        sets: 4,
        reps: 10,
        weight: '80',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    // getAllExerciseLogsが呼び出されることを期待
    mock.expects('getAllExerciseLogs').resolves(exerciseLogs);

    const result = await exerciseLogService.getAllExerciseLogs();

    // 取得したエクササイズログを日付でソート
    const sortedExerciseLogs = result.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

    expect(sortedExerciseLogs.length).toBe(2);
    expect(sortedExerciseLogs[0].createdAt).toEqual(exerciseLogs[0].createdAt);
    expect(sortedExerciseLogs[1].createdAt).toEqual(exerciseLogs[1].createdAt);

    // 期待通りの呼び出しが行われたことを検証
    mock.verify();
  });

  it('should get an exercise log by id', async () => {
    const exerciseLog = {
      id: uuidv4(),
      userId: uuidv4(),
      exerciseId: uuidv4(),
      date: new Date('2024-05-01'),
      sets: 3,
      reps: 12,
      weight: '100',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // getExerciseLogByIdが特定の引数で呼び出されることを期待
    mock.expects('getExerciseLogById').withExactArgs(exerciseLog.id).resolves(exerciseLog);

    const result = await exerciseLogService.getExerciseLogById(exerciseLog.id);

    expect(result).toEqual(exerciseLog);

    // 期待通りの呼び出しが行われたことを検証
    mock.verify();
  });

  it('should update an exercise log', async () => {
    const exerciseLogId = uuidv4();
    const exerciseLogUpdatedData: Partial<ExerciseLogCreationAttributes> = {
      sets: 4,
      reps: 10,
      weight: '80',
    };
    const updatedExerciseLog = {
      id: exerciseLogId,
      userId: uuidv4(),
      exerciseId: uuidv4(),
      ...exerciseLogUpdatedData,
      date: new Date('2024-05-01'),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // updateExerciseLogが特定の引数で呼び出されることを期待
    mock.expects('updateExerciseLog').withExactArgs(exerciseLogId, exerciseLogUpdatedData).resolves(updatedExerciseLog);

    const result = await exerciseLogService.updateExerciseLog(exerciseLogId, exerciseLogUpdatedData);

    expect(result).toEqual(updatedExerciseLog);

    // 期待通りの呼び出しが行われたことを検証
    mock.verify();
  });

  it('should delete an exercise log', async () => {
    const exerciseLogId = uuidv4();

    // deleteExerciseLogが特定の引数で呼び出されることを期待
    mock.expects('deleteExerciseLog').withExactArgs(exerciseLogId).resolves(true);

    const result = await exerciseLogService.deleteExerciseLog(exerciseLogId);

    expect(result).toBe(true);

    // 期待通りの呼び出しが行われたことを検証
    mock.verify();
  });
});
