import * as workoutDetailService from '../../src/services/workoutDetail';
import * as workoutDetailRepository from '../../src/repositories/workoutDetail';
import { WorkoutDetailCreationAttributes } from '../../src/models/workoutDetails';
import sinon from 'sinon';
import { v4 as uuidv4 } from 'uuid';

describe('WorkoutDetail Service', () => {
  let mock: sinon.SinonMock;

  beforeEach(async () => {
    // workoutDetailRepository全体をモック
    mock = sinon.mock(workoutDetailRepository);
  });

  afterEach(async () => {
    // 各テスト後にモックをリストア
    mock.restore();
  });

  it('should create a workout detail', async () => {
    const workoutDetailData: Omit<WorkoutDetailCreationAttributes, 'id'> = {
      workoutId: uuidv4(),
      exerciseId: uuidv4(),
      sets: 3,
      reps: 12,
      weight: '100',
    };

    const createdWorkoutDetail = {
      id: uuidv4(),
      ...workoutDetailData,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // createWorkoutDetailが特定の引数で呼び出されることを期待
    mock.expects('createWorkoutDetail').withExactArgs(workoutDetailData).resolves(createdWorkoutDetail);

    const result = await workoutDetailService.createWorkoutDetail(workoutDetailData);

    expect(result).toEqual(createdWorkoutDetail);

    // 期待通りの呼び出しが行われたことを検証
    mock.verify();
  });

  it('should get all workout details', async () => {
    const workoutDetails = [
      {
        id: uuidv4(),
        workoutId: uuidv4(),
        exerciseId: uuidv4(),
        sets: 3,
        reps: 12,
        weight: '100',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        workoutId: uuidv4(),
        exerciseId: uuidv4(),
        sets: 4,
        reps: 10,
        weight: '80',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    // getAllWorkoutDetailsが呼び出されることを期待
    mock.expects('getAllWorkoutDetails').resolves(workoutDetails);

    const result = await workoutDetailService.getAllWorkoutDetails();

    // 取得したワークアウトディテールを日付でソート
    const sortedWorkoutDetails = result.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

    expect(sortedWorkoutDetails.length).toBe(2);
    expect(sortedWorkoutDetails[0].createdAt).toEqual(workoutDetails[0].createdAt);
    expect(sortedWorkoutDetails[1].createdAt).toEqual(workoutDetails[1].createdAt);

    // 期待通りの呼び出しが行われたことを検証
    mock.verify();
  });

  it('should get a workout detail by id', async () => {
    const workoutDetail = {
      id: uuidv4(),
      workoutId: uuidv4(),
      exerciseId: uuidv4(),
      sets: 3,
      reps: 12,
      weight: '100',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // getWorkoutDetailByIdが特定の引数で呼び出されることを期待
    mock.expects('getWorkoutDetailById').withExactArgs(workoutDetail.id).resolves(workoutDetail);

    const result = await workoutDetailService.getWorkoutDetailById(workoutDetail.id);

    expect(result).toEqual(workoutDetail);

    // 期待通りの呼び出しが行われたことを検証
    mock.verify();
  });

  it('should update a workout detail', async () => {
    const workoutDetailId = uuidv4();
    const workoutDetailUpdatedData: Partial<WorkoutDetailCreationAttributes> = {
      sets: 4,
      reps: 10,
      weight: '80',
    };
    const updatedWorkoutDetail = {
      id: workoutDetailId,
      workoutId: uuidv4(),
      exerciseId: uuidv4(),
      ...workoutDetailUpdatedData,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // updateWorkoutDetailが特定の引数で呼び出されることを期待
    mock.expects('updateWorkoutDetail').withExactArgs(workoutDetailId, workoutDetailUpdatedData).resolves(updatedWorkoutDetail);

    const result = await workoutDetailService.updateWorkoutDetail(workoutDetailId, workoutDetailUpdatedData);

    expect(result).toEqual(updatedWorkoutDetail);

    // 期待通りの呼び出しが行われたことを検証
    mock.verify();
  });

  it('should delete a workout detail', async () => {
    const workoutDetailId = uuidv4();

    // deleteWorkoutDetailが特定の引数で呼び出されることを期待
    mock.expects('deleteWorkoutDetail').withExactArgs(workoutDetailId).resolves(true);

    const result = await workoutDetailService.deleteWorkoutDetail(workoutDetailId);

    expect(result).toBe(true);

    // 期待通りの呼び出しが行われたことを検証
    mock.verify();
  });
});
