import WorkoutDetail, { WorkoutDetailCreationAttributes } from '../models/workoutDetails';

export const createWorkoutDetail = async (data: WorkoutDetailCreationAttributes): Promise<WorkoutDetail> => {
  return await WorkoutDetail.create(data);
};

export const getAllWorkoutDetails = async (): Promise<WorkoutDetail[]> => {
  return await WorkoutDetail.findAll();
};

export const getWorkoutDetailById = async (id: string): Promise<WorkoutDetail | null> => {
  return await WorkoutDetail.findByPk(id);
};

export const updateWorkoutDetail = async (id: string, data: Partial<WorkoutDetailCreationAttributes>): Promise<WorkoutDetail | null> => {
  const workoutDetail = await WorkoutDetail.findByPk(id);
  if (workoutDetail) {
    return await workoutDetail.update(data);
  }
  return null;
};

export const deleteWorkoutDetail = async (id: string): Promise<void | null> => {
  const workoutDetail = await WorkoutDetail.findByPk(id);
  if (workoutDetail) {
    return await workoutDetail.destroy();
  }
  return null;
};
