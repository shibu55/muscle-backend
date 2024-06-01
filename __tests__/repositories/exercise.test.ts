import * as exerciseRepository from '../../src/repositories/exercise';
import Exercise from '../../src/models/exercise';

describe('Exercise Repository', () => {
  beforeEach(async () => {
    await Exercise.destroy({ where: {} });
  });

  it('should create an exercise', async () => {
    const exerciseData = {
      name: 'Squat',
      description: 'A lower body exercise',
    };

    const exercise = await exerciseRepository.createExercise(exerciseData);

    expect(exercise).toBeDefined();
    expect(exercise.id).toBeDefined();
    expect(exercise.name).toBe(exerciseData.name);
    expect(exercise.description).toBe(exerciseData.description);
  });

  it('should get all exercises', async () => {
    const exerciseData1 = {
      name: 'Squat',
      description: 'A lower body exercise',
    };
    const exerciseData2 = {
      name: 'Bench Press',
      description: 'An upper body exercise',
    };

    await Exercise.create(exerciseData1);
    await Exercise.create(exerciseData2);

    const exercises = await exerciseRepository.getAllExercises();
    const sortedExercises = exercises.sort((a, b) => b.name.localeCompare(a.name));

    expect(sortedExercises.length).toBe(2);
    expect(sortedExercises[0].name).toBe(exerciseData1.name);
    expect(sortedExercises[1].name).toBe(exerciseData2.name);
  });

  it('should get an exercise by id', async () => {
    const exerciseData = {
      name: 'Squat',
      description: 'A lower body exercise',
    };

    const createdExercise = await Exercise.create(exerciseData);

    const exercise = await exerciseRepository.getExerciseById(createdExercise.id);

    expect(exercise).toBeDefined();
    expect(exercise!.id).toBe(createdExercise.id);
    expect(exercise!.name).toBe(exerciseData.name);
    expect(exercise!.description).toBe(exerciseData.description);
  });

  it('should update an exercise', async () => {
    const exerciseData = {
      name: 'Squat',
      description: 'A lower body exercise',
    };

    const createdExercise = await Exercise.create(exerciseData);

    const updatedData = {
      name: 'Deadlift',
      description: 'A compound exercise',
    };

    const updatedExercise = await exerciseRepository.updateExercise(createdExercise.id, updatedData);

    expect(updatedExercise).toBeDefined();
    expect(updatedExercise!.name).toBe(updatedData.name);
    expect(updatedExercise!.description).toBe(updatedData.description);
  });

  it('should delete an exercise', async () => {
    const exerciseData = {
      name: 'Squat',
      description: 'A lower body exercise',
    };

    const createdExercise = await Exercise.create(exerciseData);

    await exerciseRepository.deleteExercise(createdExercise.id);

    const exercise = await exerciseRepository.getExerciseById(createdExercise.id);

    expect(exercise).toBeNull();
  });
});
