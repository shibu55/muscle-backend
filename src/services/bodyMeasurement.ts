import * as bodyMeasurementRepository from '../repositories/bodyMeasurement';
import BodyMeasurement, { BodyMeasurementCreationAttributes } from '../models/bodyMeasurement';

export const createBodyMeasurement = async (data: BodyMeasurementCreationAttributes): Promise<BodyMeasurement> => {
  return await bodyMeasurementRepository.createBodyMeasurement(data);
};

export const getAllBodyMeasurements = async (): Promise<BodyMeasurement[]> => {
  return await bodyMeasurementRepository.getAllBodyMeasurements();
};

export const getBodyMeasurementById = async (id: string): Promise<BodyMeasurement | null> => {
  return await bodyMeasurementRepository.getBodyMeasurementById(id);
};

export const updateBodyMeasurement = async (id: string, data: Partial<BodyMeasurementCreationAttributes>): Promise<BodyMeasurement | null> => {
  return await bodyMeasurementRepository.updateBodyMeasurement(id, data);
};

export const deleteBodyMeasurement = async (id: string): Promise<void | null> => {
  return await bodyMeasurementRepository.deleteBodyMeasurement(id);
};
