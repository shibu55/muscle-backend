export interface ExerciseAttributes {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ExerciseCreationAttributes extends Omit<ExerciseAttributes, 'id' | 'createdAt' | 'updatedAt'> {}
