import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/sequelize';
import { BodyMeasurementAttributes, BodyMeasurementCreationAttributes } from '../types/models/bodyMeasurements';

class BodyMeasurement extends Model<BodyMeasurementAttributes, BodyMeasurementCreationAttributes> implements BodyMeasurementAttributes {
  public id!: string;
  public userId!: string;
  public date!: Date;
  public height!: string;
  public weight!: string;
  public bodyFat!: string;
  public muscleMass!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

BodyMeasurement.init(
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
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    height: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    weight: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    bodyFat: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    muscleMass: {
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
    tableName: 'body_measurements',
    timestamps: true,
  }
);

export { BodyMeasurement, BodyMeasurementCreationAttributes };
export default BodyMeasurement;
