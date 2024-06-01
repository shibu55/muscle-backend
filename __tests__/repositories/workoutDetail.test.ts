import * as workoutDetailRepository from '../../src/repositories/workoutDetail';
import WorkoutDetail from '../../src/models/workoutDetails';
import Workout from '../../src/models/workout';
import Exercise from '../../src/models/exercise';
import User from '../../src/models/user';

describe('WorkoutDetail Repository', () => {
  let userId1: string;
  let userId2: string;
  let workoutId1: string;
  let workoutId2: string;
  let exerciseId1: string;
  let exerciseId2: string;

  beforeAll(async () => {
    // テスト用のユーザーを作成
    const user1 = await User.create({ name: 'Test User 1', email: 'user1@example.com', password: 'password1', height: '170', weight: '70' });
    const user2 = await User.create({ name: 'Test User 2', email: 'user2@example.com', password: 'password2', height: '175', weight: '75' });
    userId1 = user1.id;
    userId2 = user2.id;
    // テスト用のワークアウトとエクササイズを作成
    const workout1 = await Workout.create({ userId: user1.id, date: '2024-05-01' });
    const workout2 = await Workout.create({ userId: user2.id, date: '2024-05-02' });
    workoutId1 = workout1.id;
    workoutId2 = workout2.id;

    const exercise1 = await Exercise.create({ name: 'Squat', description: 'Leg exercise' });
    const exercise2 = await Exercise.create({ name: 'Bench Press', description: 'Chest exercise' });
    exerciseId1 = exercise1.id;
    exerciseId2 = exercise2.id;
  });

  beforeEach(async () => {
    await WorkoutDetail.destroy({ where: {} });
  });

  afterAll(async () => {
    await User.destroy({ where: {} });
    await Workout.destroy({ where: {} });
    await Exercise.destroy({ where: {} });
    await WorkoutDetail.destroy({ where: {} });
  });

  it('should create a workout detail', async () => {
    const workoutDetailData = {
      workoutId: workoutId1,
      exerciseId: exerciseId1,
      sets: 3,
      reps: 12,
      weight: '100',
    };

    const workoutDetail = await workoutDetailRepository.createWorkoutDetail(workoutDetailData);

    expect(workoutDetail).toBeDefined();
    expect(workoutDetail.id).toBeDefined();
    expect(workoutDetail.workoutId).toBe(workoutDetailData.workoutId);
    expect(workoutDetail.exerciseId).toBe(workoutDetailData.exerciseId);
    expect(workoutDetail.sets).toBe(workoutDetailData.sets);
    expect(workoutDetail.reps).toBe(workoutDetailData.reps);
    expect(workoutDetail.weight).toBe(workoutDetailData.weight);
  });

  it('should get all workout details', async () => {
    const workoutDetailData1 = {
      workoutId: workoutId1,
      exerciseId: exerciseId1,
      sets: 3,
      reps: 12,
      weight: '100',
    };
    const workoutDetailData2 = {
      workoutId: workoutId2,
      exerciseId: exerciseId2,
      sets: 4,
      reps: 10,
      weight: '80',
    };

    await WorkoutDetail.create(workoutDetailData1);
    await WorkoutDetail.create(workoutDetailData2);

    const workoutDetails = await workoutDetailRepository.getAllWorkoutDetails();

    expect(workoutDetails.length).toBe(2);
    expect(workoutDetails.some(detail => detail.workoutId === workoutDetailData1.workoutId && detail.exerciseId === workoutDetailData1.exerciseId)).toBeTruthy();
    expect(workoutDetails.some(detail => detail.workoutId === workoutDetailData2.workoutId && detail.exerciseId === workoutDetailData2.exerciseId)).toBeTruthy();
  });

  it('should get a workout detail by id', async () => {
    const workoutDetailData = {
      workoutId: workoutId1,
      exerciseId: exerciseId1,
      sets: 3,
      reps: 12,
      weight: '100',
    };

    const createdWorkoutDetail = await WorkoutDetail.create(workoutDetailData);

    const workoutDetail = await workoutDetailRepository.getWorkoutDetailById(createdWorkoutDetail.id);

    expect(workoutDetail).toBeDefined();
    expect(workoutDetail!.id).toBe(createdWorkoutDetail.id);
    expect(workoutDetail!.workoutId).toBe(workoutDetailData.workoutId);
    expect(workoutDetail!.exerciseId).toBe(workoutDetailData.exerciseId);
    expect(workoutDetail!.sets).toBe(workoutDetailData.sets);
    expect(workoutDetail!.reps).toBe(workoutDetailData.reps);
    expect(workoutDetail!.weight).toBe(workoutDetailData.weight);
  });

  it('should update a workout detail', async () => {
    const workoutDetailData = {
      workoutId: workoutId1,
      exerciseId: exerciseId1,
      sets: 3,
      reps: 12,
      weight: '100',
    };

    const createdWorkoutDetail = await WorkoutDetail.create(workoutDetailData);

    const updatedData = {
      sets: 4,
      reps: 10,
      weight: '80',
    };

    const updatedWorkoutDetail = await workoutDetailRepository.updateWorkoutDetail(createdWorkoutDetail.id, updatedData);

    expect(updatedWorkoutDetail).toBeDefined();
    expect(updatedWorkoutDetail!.sets).toBe(updatedData.sets);
    expect(updatedWorkoutDetail!.reps).toBe(updatedData.reps);
    expect(updatedWorkoutDetail!.weight).toBe(updatedData.weight);
  });

  it('should delete a workout detail', async () => {
    const workoutDetailData = {
      workoutId: workoutId1,
      exerciseId: exerciseId1,
      sets: 3,
      reps: 12,
      weight: '100',
    };

    const createdWorkoutDetail = await WorkoutDetail.create(workoutDetailData);

    await workoutDetailRepository.deleteWorkoutDetail(createdWorkoutDetail.id);

    const workoutDetail = await workoutDetailRepository.getWorkoutDetailById(createdWorkoutDetail.id);

    expect(workoutDetail).toBeNull();
  });
});
