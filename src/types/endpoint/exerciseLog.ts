export interface CreateExerciseLogRequestBody {
  userId: string;
  exerciseId: string;
  date: Date;
  sets: number;
  reps: number;
  weight: string;
}

export interface UpdateExerciseLogRequestBody {
  userId?: string;
  exerciseId?: string;
  date?: Date;
  sets?: number;
  reps?: number;
  weight?: string;
}

export interface CreateExerciseLogResponse {
  id: string;
  userId: string;
  exerciseId: string;
  date: Date;
  sets: number;
  reps: number;
  weight: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetAllExerciseLogsResponse {
  exerciseLogs: CreateExerciseLogResponse[];
}

export interface GetExerciseLogResponse {
  id: string;
  userId: string;
  exerciseId: string;
  date: Date;
  sets: number;
  reps: number;
  weight: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateExerciseLogResponse {
  id: string;
  userId: string;
  exerciseId: string;
  date: Date;
  sets: number;
  reps: number;
  weight: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DeleteExerciseLogResponse {
  message: string;
}
