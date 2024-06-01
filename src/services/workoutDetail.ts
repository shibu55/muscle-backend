import * as workoutDetailRepository from '../repositories/workoutDetail';
import WorkoutDetail, { WorkoutDetailCreationAttributes } from '../models/workoutDetails';

export const createWorkoutDetail = async (data: WorkoutDetailCreationAttributes): Promise<WorkoutDetail> => {
  return await workoutDetailRepository.createWorkoutDetail(data);
};

export const getAllWorkoutDetails = async (): Promise<WorkoutDetail[]> => {
  return await workoutDetailRepository.getAllWorkoutDetails();
};

export const getWorkoutDetailById = async (id: string): Promise<WorkoutDetail | null> => {
  return await workoutDetailRepository.getWorkoutDetailById(id);
};

export const updateWorkoutDetail = async (id: string, data: Partial<WorkoutDetailCreationAttributes>): Promise<WorkoutDetail | null> => {
  return await workoutDetailRepository.updateWorkoutDetail(id, data);
};

export const deleteWorkoutDetail = async (id: string): Promise<void | null> => {
  return await workoutDetailRepository.deleteWorkoutDetail(id);
};
