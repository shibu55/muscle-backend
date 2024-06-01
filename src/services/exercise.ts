import * as exerciseRepository from '../repositories/exercise';
import Exercise, { ExerciseCreationAttributes } from '../models/exercise';

export const createExercise = async (data: ExerciseCreationAttributes): Promise<Exercise> => {
  return await exerciseRepository.createExercise(data);
};

export const getAllExercises = async (): Promise<Exercise[]> => {
  return await exerciseRepository.getAllExercises();
};

export const getExerciseById = async (id: string): Promise<Exercise | null> => {
  return await exerciseRepository.getExerciseById(id);
};

export const updateExercise = async (id: string, data: Partial<ExerciseCreationAttributes>): Promise<Exercise | null> => {
  return await exerciseRepository.updateExercise(id, data);
};

export const deleteExercise = async (id: string): Promise<void | null> => {
  return await exerciseRepository.deleteExercise(id);
};
