import * as workoutService from '../../src/services/workout';
import * as workoutRepository from '../../src/repositories/workout';
import { WorkoutCreationAttributes } from '../../src/models/workout';
import sinon from 'sinon';
import { v4 as uuidv4 } from 'uuid';

describe('Workout Service', () => {
  let mock: sinon.SinonMock;

  beforeEach(async () => {
    // workoutRepository全体をモック
    mock = sinon.mock(workoutRepository);
  });

  afterEach(async () => {
    // 各テスト後にモックをリストア
    mock.restore();
  });

  it('should create a workout', async () => {
    const workoutData: Omit<WorkoutCreationAttributes, 'id'> = {
      userId: uuidv4(),
      date: '2024-05-01',
    };

    const createdWorkout = {
      id: uuidv4(),
      ...workoutData,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // createWorkoutが特定の引数で呼び出されることを期待
    mock.expects('createWorkout').withExactArgs(workoutData).resolves(createdWorkout);

    const result = await workoutService.createWorkout(workoutData);

    expect(result).toEqual(createdWorkout);

    // 期待通りの呼び出しが行われたことを検証
    mock.verify();
  });

  it('should get all workouts', async () => {
    const workouts = [
      {
        id: uuidv4(),
        userId: uuidv4(),
        date: '2024-05-01',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        userId: uuidv4(),
        date: '2024-05-02',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    // getAllWorkoutsが呼び出されることを期待
    mock.expects('getAllWorkouts').resolves(workouts);

    const result = await workoutService.getAllWorkouts();

    // 取得したワークアウトを日付でソート
    const sortedWorkouts = result.sort((a, b) => a.date.localeCompare(b.date));

    expect(sortedWorkouts.length).toBe(2);
    expect(sortedWorkouts[0].date).toBe(workouts[0].date);
    expect(sortedWorkouts[1].date).toBe(workouts[1].date);

    // 期待通りの呼び出しが行われたことを検証
    mock.verify();
  });

  it('should get a workout by id', async () => {
    const workout = {
      id: uuidv4(),
      userId: uuidv4(),
      date: '2024-05-01',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // getWorkoutByIdが特定の引数で呼び出されることを期待
    mock.expects('getWorkoutById').withExactArgs(workout.id).resolves(workout);

    const result = await workoutService.getWorkoutById(workout.id);

    expect(result).toEqual(workout);

    // 期待通りの呼び出しが行われたことを検証
    mock.verify();
  });

  it('should update a workout', async () => {
    const workoutId = uuidv4();
    const workoutUpdatedData: Partial<WorkoutCreationAttributes> = {
      userId: uuidv4(),
      date: '2024-06-01',
    };
    const updatedWorkout = {
      id: workoutId,
      ...workoutUpdatedData,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // updateWorkoutが特定の引数で呼び出されることを期待
    mock.expects('updateWorkout').withExactArgs(workoutId, workoutUpdatedData).resolves(updatedWorkout);

    const result = await workoutService.updateWorkout(workoutId, workoutUpdatedData);

    expect(result).toEqual(updatedWorkout);

    // 期待通りの呼び出しが行われたことを検証
    mock.verify();
  });

  it('should delete a workout', async () => {
    const workoutId = uuidv4();

    // deleteWorkoutが特定の引数で呼び出されることを期待
    mock.expects('deleteWorkout').withExactArgs(workoutId).resolves(true);

    const result = await workoutService.deleteWorkout(workoutId);

    expect(result).toBe(true);

    // 期待通りの呼び出しが行われたことを検証
    mock.verify();
  });
});
