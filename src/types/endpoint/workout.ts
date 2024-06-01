// TODO: userIdはJWTから取得するように変更する
export interface CreateWorkoutRequestBody {
  userId: string;
  date: string; // 'YYYY-MM-DD' 形式
}

export interface UpdateWorkoutRequestBody {
  userId?: string;
  date?: string; // 'YYYY-MM-DD' 形式
}

export interface CreateWorkoutResponse {
  id: string;
  userId: string;
  date: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetAllWorkoutsResponse {
  workouts: CreateWorkoutResponse[];
}

export interface GetWorkoutResponse {
  id: string;
  userId: string;
  date: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateWorkoutResponse {
  id: string;
  userId: string;
  date: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DeleteWorkoutResponse {
  message: string;
}
