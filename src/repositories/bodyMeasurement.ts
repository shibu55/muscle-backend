import BodyMeasurement, { BodyMeasurementCreationAttributes } from '../models/bodyMeasurement';

export const createBodyMeasurement = async (data: BodyMeasurementCreationAttributes): Promise<BodyMeasurement> => {
  return await BodyMeasurement.create(data);
};

export const getAllBodyMeasurements = async (): Promise<BodyMeasurement[]> => {
  return await BodyMeasurement.findAll();
};

export const getBodyMeasurementById = async (id: string): Promise<BodyMeasurement | null> => {
  return await BodyMeasurement.findByPk(id);
};

export const updateBodyMeasurement = async (id: string, data: Partial<BodyMeasurementCreationAttributes>): Promise<BodyMeasurement | null> => {
  const bodyMeasurement = await BodyMeasurement.findByPk(id);
  if (bodyMeasurement) {
    return await bodyMeasurement.update(data);
  }
  return null;
};

export const deleteBodyMeasurement = async (id: string): Promise<void | null> => {
  const bodyMeasurement = await BodyMeasurement.findByPk(id);
  if (bodyMeasurement) {
    return await bodyMeasurement.destroy();
  }
  return null;
};
