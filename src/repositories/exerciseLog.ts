import ExerciseLog, { ExerciseLogCreationAttributes } from '../models/exerciseLog';

export const createExerciseLog = async (data: ExerciseLogCreationAttributes): Promise<ExerciseLog> => {
  return await ExerciseLog.create(data);
};

export const getAllExerciseLogs = async (): Promise<ExerciseLog[]> => {
  return await ExerciseLog.findAll();
};

export const getExerciseLogById = async (id: string): Promise<ExerciseLog | null> => {
  return await ExerciseLog.findByPk(id);
};

export const updateExerciseLog = async (id: string, data: Partial<ExerciseLogCreationAttributes>): Promise<ExerciseLog | null> => {
  const exerciseLog = await ExerciseLog.findByPk(id);
  if (exerciseLog) {
    return await exerciseLog.update(data);
  }
  return null;
};

export const deleteExerciseLog = async (id: string): Promise<void | null> => {
  const exerciseLog = await ExerciseLog.findByPk(id);
  if (exerciseLog) {
    return await exerciseLog.destroy();
  }
  return null;
};
