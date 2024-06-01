import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/sequelize';
import { ExerciseLogAttributes, ExerciseLogCreationAttributes } from '../types/models/exerciseLogs';

class ExerciseLog extends Model<ExerciseLogAttributes, ExerciseLogCreationAttributes> implements ExerciseLogAttributes {
  public id!: string;
  public userId!: string;
  public exerciseId!: string;
  public date!: Date;
  public sets!: number;
  public reps!: number;
  public weight!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ExerciseLog.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    exerciseId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
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
    tableName: 'exercise_logs',
    timestamps: true,
  }
);

export { ExerciseLog, ExerciseLogCreationAttributes };
export default ExerciseLog;
