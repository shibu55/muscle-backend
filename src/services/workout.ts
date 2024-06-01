import * as workoutRepository from '../repositories/workout';
import Workout, { WorkoutCreationAttributes } from '../models/workout';

export const createWorkout = async (data: WorkoutCreationAttributes): Promise<Workout> => {
  return await workoutRepository.createWorkout(data);
};

export const getAllWorkouts = async (): Promise<Workout[]> => {
  return await workoutRepository.getAllWorkouts();
};

export const getWorkoutById = async (id: string): Promise<Workout | null> => {
  return await workoutRepository.getWorkoutById(id);
};

export const updateWorkout = async (id: string, data: Partial<WorkoutCreationAttributes>): Promise<Workout | null> => {
  return await workoutRepository.updateWorkout(id, data);
};

export const deleteWorkout = async (id: string): Promise<void | null> => {
  return await workoutRepository.deleteWorkout(id);
};
