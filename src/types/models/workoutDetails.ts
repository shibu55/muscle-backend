
export interface WorkoutDetailAttributes {
  id: string;
  workoutId: string;
  exerciseId: string;
  sets: number;
  reps: number;
  weight: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkoutDetailCreationAttributes extends Omit<WorkoutDetailAttributes, 'id' | 'createdAt' | 'updatedAt'> {}
