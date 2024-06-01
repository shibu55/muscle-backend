export interface WorkoutAttributes {
  id: string;
  userId: string;
  date: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkoutCreationAttributes extends Omit<WorkoutAttributes, 'id' | 'createdAt' | 'updatedAt'> {}
