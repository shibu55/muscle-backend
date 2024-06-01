import * as exerciseLogRepository from '../../src/repositories/exerciseLog';
import ExerciseLog from '../../src/models/exerciseLog';
import Exercise from '../../src/models/exercise';
import User from '../../src/models/user';

describe('ExerciseLog Repository', () => {
  let userId1: string;
  let userId2: string;
  let exerciseId1: string;
  let exerciseId2: string;

  beforeAll(async () => {
    // テスト用のユーザーを作成
    const user1 = await User.create({ name: 'Test User 1', email: 'user1@example.com', password: 'password1', height: '170', weight: '70' });
    const user2 = await User.create({ name: 'Test User 2', email: 'user2@example.com', password: 'password2', height: '175', weight: '75' });
    userId1 = user1.id;
    userId2 = user2.id;

    // テスト用のエクササイズを作成
    const exercise1 = await Exercise.create({ name: 'Squat', description: 'Leg exercise' });
    const exercise2 = await Exercise.create({ name: 'Bench Press', description: 'Chest exercise' });
    exerciseId1 = exercise1.id;
    exerciseId2 = exercise2.id;
  });

  beforeEach(async () => {
    await ExerciseLog.destroy({ where: {} });
  });

  afterAll(async () => {
    await User.destroy({ where: {} });
    await Exercise.destroy({ where: {} });
    await ExerciseLog.destroy({ where: {} });
  });

  it('should create an exercise log', async () => {
    const exerciseLogData = {
      userId: userId1,
      exerciseId: exerciseId1,
      date: new Date('2024-05-01'),
      sets: 3,
      reps: 12,
      weight: '100',
    };

    const exerciseLog = await exerciseLogRepository.createExerciseLog(exerciseLogData);

    expect(exerciseLog).toBeDefined();
    expect(exerciseLog.id).toBeDefined();
    expect(exerciseLog.userId).toBe(exerciseLogData.userId);
    expect(exerciseLog.exerciseId).toBe(exerciseLogData.exerciseId);
    expect(exerciseLog.date).toStrictEqual(exerciseLogData.date);
    expect(exerciseLog.sets).toBe(exerciseLogData.sets);
    expect(exerciseLog.reps).toBe(exerciseLogData.reps);
    expect(exerciseLog.weight).toBe(exerciseLogData.weight);
  });

  it('should get all exercise logs', async () => {
    const exerciseLogData1 = {
      userId: userId1,
      exerciseId: exerciseId1,
      date: new Date('2024-05-01'),
      sets: 3,
      reps: 12,
      weight: '100',
    };
    const exerciseLogData2 = {
      userId: userId2,
      exerciseId: exerciseId2,
      date: new Date('2024-05-02'),
      sets: 4,
      reps: 10,
      weight: '80',
    };

    await ExerciseLog.create(exerciseLogData1);
    await ExerciseLog.create(exerciseLogData2);

    const exerciseLogs = await exerciseLogRepository.getAllExerciseLogs();

    expect(exerciseLogs.length).toBe(2);
    expect(exerciseLogs.some(log => log.userId === exerciseLogData1.userId && log.exerciseId === exerciseLogData1.exerciseId)).toBeTruthy();
    expect(exerciseLogs.some(log => log.userId === exerciseLogData2.userId && log.exerciseId === exerciseLogData2.exerciseId)).toBeTruthy();
  });

  it('should get an exercise log by id', async () => {
    const exerciseLogData = {
      userId: userId1,
      exerciseId: exerciseId1,
      date: new Date('2024-05-01'),
      sets: 3,
      reps: 12,
      weight: '100',
    };

    const createdExerciseLog = await ExerciseLog.create(exerciseLogData);

    const exerciseLog = await exerciseLogRepository.getExerciseLogById(createdExerciseLog.id);

    expect(exerciseLog).toBeDefined();
    expect(exerciseLog!.id).toBe(createdExerciseLog.id);
    expect(exerciseLog!.userId).toBe(exerciseLogData.userId);
    expect(exerciseLog!.exerciseId).toBe(exerciseLogData.exerciseId);
    expect(exerciseLog!.date).toStrictEqual(exerciseLogData.date);
    expect(exerciseLog!.sets).toBe(exerciseLogData.sets);
    expect(exerciseLog!.reps).toBe(exerciseLogData.reps);
    expect(exerciseLog!.weight).toBe(exerciseLogData.weight);
  });

  it('should update an exercise log', async () => {
    const exerciseLogData = {
      userId: userId1,
      exerciseId: exerciseId1,
      date: new Date('2024-05-01'),
      sets: 3,
      reps: 12,
      weight: '100',
    };

    const createdExerciseLog = await ExerciseLog.create(exerciseLogData);

    const updatedData = {
      sets: 4,
      reps: 10,
      weight: '80',
    };

    const updatedExerciseLog = await exerciseLogRepository.updateExerciseLog(createdExerciseLog.id, updatedData);

    expect(updatedExerciseLog).toBeDefined();
    expect(updatedExerciseLog!.sets).toBe(updatedData.sets);
    expect(updatedExerciseLog!.reps).toBe(updatedData.reps);
    expect(updatedExerciseLog!.weight).toBe(updatedData.weight);
  });

  it('should delete an exercise log', async () => {
    const exerciseLogData = {
      userId: userId1,
      exerciseId: exerciseId1,
      date: new Date('2024-05-01'),
      sets: 3,
      reps: 12,
      weight: '100',
    };

    const createdExerciseLog = await ExerciseLog.create(exerciseLogData);

    await exerciseLogRepository.deleteExerciseLog(createdExerciseLog.id);

    const exerciseLog = await exerciseLogRepository.getExerciseLogById(createdExerciseLog.id);

    expect(exerciseLog).toBeNull();
  });
});
