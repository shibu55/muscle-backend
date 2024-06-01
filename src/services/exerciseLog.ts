import * as exerciseLogRepository from '../repositories/exerciseLog';
import ExerciseLog, { ExerciseLogCreationAttributes } from '../models/exerciseLog';

export const createExerciseLog = async (data: ExerciseLogCreationAttributes): Promise<ExerciseLog> => {
  return await exerciseLogRepository.createExerciseLog(data);
};

export const getAllExerciseLogs = async (): Promise<ExerciseLog[]> => {
  return await exerciseLogRepository.getAllExerciseLogs();
};

export const getExerciseLogById = async (id: string): Promise<ExerciseLog | null> => {
  return await exerciseLogRepository.getExerciseLogById(id);
};

export const updateExerciseLog = async (id: string, data: Partial<ExerciseLogCreationAttributes>): Promise<ExerciseLog | null> => {
  return await exerciseLogRepository.updateExerciseLog(id, data);
};

export const deleteExerciseLog = async (id: string): Promise<void | null> => {
  return await exerciseLogRepository.deleteExerciseLog(id);
};
