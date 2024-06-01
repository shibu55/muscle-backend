import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/sequelize';
import { WorkoutDetailAttributes, WorkoutDetailCreationAttributes } from '../types/models/workoutDetails';

class WorkoutDetail extends Model<WorkoutDetailAttributes, WorkoutDetailCreationAttributes> implements WorkoutDetailAttributes {
  public id!: string;
  public workoutId!: string;
  public exerciseId!: string;
  public sets!: number;
  public reps!: number;
  public weight!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

WorkoutDetail.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    workoutId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    exerciseId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    sets: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reps: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weight: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'workout_details',
    timestamps: true,
  }
);

export { WorkoutDetail, WorkoutDetailCreationAttributes };
export default WorkoutDetail;
