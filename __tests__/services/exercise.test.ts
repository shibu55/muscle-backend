import * as exerciseService from '../../src/services/exercise';
import * as exerciseRepository from '../../src/repositories/exercise';
import { ExerciseCreationAttributes } from '../../src/models/exercise';
import sinon from 'sinon';
import { v4 as uuidv4 } from 'uuid';

describe('Exercise Service', () => {
  let mock: sinon.SinonMock;

  beforeEach(async () => {
    // exerciseRepository全体をモック
    mock = sinon.mock(exerciseRepository);
  });

  afterEach(async () => {
    // 各テスト後にモックをリストア
    mock.restore();
  });

  it('should create an exercise', async () => {
    const exerciseData: Omit<ExerciseCreationAttributes, 'id'> = {
      name: 'Squat',
      description: 'A lower body exercise'
    };

    const createdExercise = {
      id: uuidv4(),
      ...exerciseData,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // createExerciseが特定の引数で呼び出されることを期待
    mock.expects('createExercise').withExactArgs(exerciseData).resolves(createdExercise);

    const result = await exerciseService.createExercise(exerciseData);

    expect(result).toEqual(createdExercise);

    // 期待通りの呼び出しが行われたことを検証
    mock.verify();
  });

  it('should get all exercises', async () => {
    const exercises = [
      {
        id: uuidv4(),
        name: 'Squat',
        description: 'A lower body exercise',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'Bench Press',
        description: 'An upper body exercise',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    // getAllExercisesが呼び出されることを期待
    mock.expects('getAllExercises').resolves(exercises);

    const result = await exerciseService.getAllExercises();

    // 取得したエクササイズを名前でソート
    const sortedExercises = result.sort((a, b) => a.name.localeCompare(b.name));

    expect(sortedExercises.length).toBe(2);
    expect(sortedExercises[0].name).toBe(exercises[0].name);
    expect(sortedExercises[1].name).toBe(exercises[1].name);

    // 期待通りの呼び出しが行われたことを検証
    mock.verify();
  });

  it('should get an exercise by id', async () => {
    const exercise = {
      id: uuidv4(),
      name: 'Squat',
      description: 'A lower body exercise',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // getExerciseByIdが特定の引数で呼び出されることを期待
    mock.expects('getExerciseById').withExactArgs(exercise.id).resolves(exercise);

    const result = await exerciseService.getExerciseById(exercise.id);

    expect(result).toEqual(exercise);

    // 期待通りの呼び出しが行われたことを検証
    mock.verify();
  });

  it('should update an exercise', async () => {
    const exerciseId = uuidv4();
    const exerciseUpdatedData: Omit<ExerciseCreationAttributes, 'id'> = {
      name: 'Deadlift',
      description: 'A compound exercise'
    };
    const updatedExercise = {
      id: exerciseId,
      ...exerciseUpdatedData,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // updateExerciseが特定の引数で呼び出されることを期待
    mock.expects('updateExercise').withExactArgs(exerciseId, exerciseUpdatedData).resolves(updatedExercise);

    const result = await exerciseService.updateExercise(exerciseId, exerciseUpdatedData);

    expect(result).toEqual(updatedExercise);

    // 期待通りの呼び出しが行われたことを検証
    mock.verify();
  });

  it('should delete an exercise', async () => {
    const exerciseId = uuidv4();

    // deleteExerciseが特定の引数で呼び出されることを期待
    mock.expects('deleteExercise').withExactArgs(exerciseId).resolves(true);

    const result = await exerciseService.deleteExercise(exerciseId);

    expect(result).toBe(true);

    // 期待通りの呼び出しが行われたことを検証
    mock.verify();
  });
});
