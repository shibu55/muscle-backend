export interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  height?: number;
  weight?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserCreationAttributes extends Omit<UserAttributes, 'id' | 'createdAt' | 'updatedAt'> {}
