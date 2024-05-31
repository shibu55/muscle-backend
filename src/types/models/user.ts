export interface UserAttributes {
  id: string;
  name: string;
  email: string;
  password: string;
  height?: number;
  weight?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserCreationAttributes extends Omit<UserAttributes, 'id' | 'createdAt' | 'updatedAt'> {}
