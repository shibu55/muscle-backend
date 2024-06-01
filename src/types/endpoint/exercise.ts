import { ExerciseAttributes } from '../models/exercise';

// Create Exercise Request Body
export interface CreateExerciseRequestBody {
  name: string;
  description?: string;
}

// Update Exercise Request Body
export interface UpdateExerciseRequestBody {
  name?: string;
  description?: string;
}

// Create Exercise Response
export interface CreateExerciseResponse {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Get All Exercises Response
export interface GetAllExercisesResponse {
  exercises: ExerciseAttributes[];
}

// Get Exercise Response
export interface GetExerciseResponse {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Update Exercise Response
export interface UpdateExerciseResponse {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Delete Exercise Response
export interface DeleteExerciseResponse {
  message: string;
}
