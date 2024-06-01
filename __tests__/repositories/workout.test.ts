import * as workoutRepository from '../../src/repositories/workout';
import Workout from '../../src/models/workout';
import User from '../../src/models/user';

describe('Workout Repository', () => {
  let userId1: string;
  let userId2: string;

  beforeAll(async () => {
    // テスト用のユーザーを作成
    const user1 = await User.create({ name: 'Test User 1', email: 'user1@example.com', password: 'password1', height: 170, weight: 70 });
    const user2 = await User.create({ name: 'Test User 2', email: 'user2@example.com', password: 'password2', height: 175, weight: 75 });
    userId1 = user1.id;
    userId2 = user2.id;
  });

  beforeEach(async () => {
    await Workout.destroy({ where: {} });
  });

  it('should create a workout', async () => {
    const workoutData = {
      userId: userId1,
      date: '2024-05-01',
    };

    const workout = await workoutRepository.createWorkout(workoutData);

    expect(workout).toBeDefined();
    expect(workout.id).toBeDefined();
    expect(workout.userId).toBe(workoutData.userId);
    expect(workout.date).toBe(workoutData.date);
  });

  it('should get all workouts', async () => {
    const workoutData1 = {
      userId: userId1,
      date: '2024-05-01',
    };
    const workoutData2 = {
      userId: userId2,
      date: '2024-05-02',
    };

    await Workout.create(workoutData1);
    await Workout.create(workoutData2);

    const workouts = await workoutRepository.getAllWorkouts();

    expect(workouts.length).toBe(2);
    expect(workouts.some(workout => workout.userId === workoutData1.userId && workout.date === workoutData1.date)).toBeTruthy();
    expect(workouts.some(workout => workout.userId === workoutData2.userId && workout.date === workoutData2.date)).toBeTruthy();
  });

  it('should get a workout by id', async () => {
    const workoutData = {
      userId: userId1,
      date: '2024-05-01',
    };

    const createdWorkout = await Workout.create(workoutData);

    const workout = await workoutRepository.getWorkoutById(createdWorkout.id);

    expect(workout).toBeDefined();
    expect(workout!.id).toBe(createdWorkout.id);
    expect(workout!.userId).toBe(workoutData.userId);
    expect(workout!.date).toBe(workoutData.date);
  });

  it('should update a workout', async () => {
    const workoutData = {
      userId: userId1,
      date: '2024-05-01',
    };

    const createdWorkout = await Workout.create(workoutData);

    const updatedData = {
      userId: userId2,
      date: '2024-06-01',
    };

    const updatedWorkout = await workoutRepository.updateWorkout(createdWorkout.id, updatedData);

    expect(updatedWorkout).toBeDefined();
    expect(updatedWorkout!.userId).toBe(updatedData.userId);
    expect(updatedWorkout!.date).toBe(updatedData.date);
  });

  it('should delete a workout', async () => {
    const workoutData = {
      userId: userId1,
      date: '2024-05-01',
    };

    const createdWorkout = await Workout.create(workoutData);

    await workoutRepository.deleteWorkout(createdWorkout.id);

    const workout = await workoutRepository.getWorkoutById(createdWorkout.id);

    expect(workout).toBeNull();
  });
});
