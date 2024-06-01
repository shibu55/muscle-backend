import Workout, { WorkoutCreationAttributes } from '../models/workout';

export const createWorkout = async (data: WorkoutCreationAttributes): Promise<Workout> => {
  return await Workout.create(data);
};

export const getAllWorkouts = async (): Promise<Workout[]> => {
  return await Workout.findAll();
};

export const getWorkoutById = async (id: string): Promise<Workout | null> => {
  return await Workout.findByPk(id);
};

export const updateWorkout = async (id: string, data: Partial<WorkoutCreationAttributes>): Promise<Workout | null> => {
  const workout = await Workout.findByPk(id);
  if (workout) {
    return await workout.update(data);
  }
  return null;
};

export const deleteWorkout = async (id: string): Promise<void | null> => {
  const workout = await Workout.findByPk(id);
  if (workout) {
    return await workout.destroy();
  }
  return null;
};
