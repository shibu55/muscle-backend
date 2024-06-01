export interface BodyMeasurementAttributes {
  id: string;
  userId: string;
  date: Date;
  height: string;
  weight: string;
  bodyFat: string;
  muscleMass: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BodyMeasurementCreationAttributes extends Omit<BodyMeasurementAttributes, 'id' | 'createdAt' | 'updatedAt'> {}
