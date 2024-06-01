import Exercise, { ExerciseCreationAttributes } from '../models/exercise';

export const createExercise = async (data: ExerciseCreationAttributes): Promise<Exercise> => {
  return await Exercise.create(data);
};

export const getAllExercises = async (): Promise<Exercise[]> => {
  return await Exercise.findAll();
};

export const getExerciseById = async (id: string): Promise<Exercise | null> => {
  return await Exercise.findByPk(id);
};

export const updateExercise = async (id: string, data: Partial<ExerciseCreationAttributes>): Promise<Exercise | null> => {
  const exercise = await Exercise.findByPk(id);
  if (exercise) {
    return await exercise.update(data);
  }
  return null;
};

export const deleteExercise = async (id: string): Promise<void | null> => {
  const exercise = await Exercise.findByPk(id);
  if (exercise) {
    return await exercise.destroy();
  }
  return null;
};
