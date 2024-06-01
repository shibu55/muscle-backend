export interface CreateWorkoutDetailRequestBody {
  workoutId: string;
  exerciseId: string;
  sets: number;
  reps: number;
  weight: string;
}

export interface UpdateWorkoutDetailRequestBody {
  workoutId?: string;
  exerciseId?: string;
  sets?: number;
  reps?: number;
  weight?: string;
}

export interface CreateWorkoutDetailResponse {
  id: string;
  workoutId: string;
  exerciseId: string;
  sets: number;
  reps: number;
  weight: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetAllWorkoutDetailsResponse {
  workoutDetails: CreateWorkoutDetailResponse[];
}

export interface GetWorkoutDetailResponse {
  id: string;
  workoutId: string;
  exerciseId: string;
  sets: number;
  reps: number;
  weight: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateWorkoutDetailResponse {
  id: string;
  workoutId: string;
  exerciseId: string;
  sets: number;
  reps: number;
  weight: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DeleteWorkoutDetailResponse {
  message: string;
}
