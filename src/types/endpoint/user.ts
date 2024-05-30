export interface User {
  id: number;
  name: string;
  email: string;
  password: string;  // パスワードハッシュ
  height?: number;  // cm
  weight?: number;  // kg
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserRequestBody {
  name: string;
  email: string;
  password: string;
  height: number;
  weight: number;
}

export interface UpdateUserRequestBody {
  name?: string;
  email?: string;
  password?: string;
  height?: number;
  weight?: number;
}

export interface LoginUserRequestBody {
  email: string;
  password: string;
}

export type CreateUserResponse = User;
export type GetAllUsersResponse = User[];
export type GetUserResponse = User;
export type UpdateUserResponse = User;

export interface DeleteUserResponse {
  message: string;
}
