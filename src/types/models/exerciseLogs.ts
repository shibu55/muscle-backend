export interface ExerciseLogAttributes {
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

export interface ExerciseLogCreationAttributes extends Omit<ExerciseLogAttributes, 'id' | 'createdAt' | 'updatedAt'> {}
