import { Response } from 'express';
import * as bodyMeasurementService from '../services/bodyMeasurement';
import { 
  CreateBodyMeasurementRequestBody, 
  UpdateBodyMeasurementRequestBody, 
  CreateBodyMeasurementResponse, 
  GetAllBodyMeasurementsResponse, 
  GetBodyMeasurementResponse, 
  UpdateBodyMeasurementResponse, 
  DeleteBodyMeasurementResponse 
} from '../types/endpoint/bodyMeasurement';
import { ErrorResponse, CustomRequest } from '../types/endpoint/common';

export const createBodyMeasurement = async (
  req: CustomRequest<{}, {}, CreateBodyMeasurementRequestBody>, 
  res: Response<CreateBodyMeasurementResponse | ErrorResponse>
) => {
  try {
    const bodyMeasurement = await bodyMeasurementService.createBodyMeasurement(req.body);
    res.status(201).json(bodyMeasurement);
  } catch (error) {
    console.error('Error creating body measurement:', error);
    res.status(500).json({ message: 'Error creating body measurement' });
  }
};

export const getAllBodyMeasurements = async (
  req: CustomRequest, 
  res: Response<GetAllBodyMeasurementsResponse | ErrorResponse>
) => {
  try {
    const bodyMeasurements = await bodyMeasurementService.getAllBodyMeasurements();
    res.status(200).json({ bodyMeasurements });
  } catch (error) {
    console.error('Error fetching body measurements:', error);
    res.status(500).json({ message: 'Error fetching body measurements' });
  }
};

export const getBodyMeasurementById = async (
  req: CustomRequest<{ id: string }>, 
  res: Response<GetBodyMeasurementResponse | ErrorResponse>
) => {
  try {
    const bodyMeasurement = await bodyMeasurementService.getBodyMeasurementById(req.params.id);
    if (bodyMeasurement) {
      res.status(200).json(bodyMeasurement);
    } else {
      res.status(404).json({ message: 'Body measurement not found' });
    }
  } catch (error) {
    console.error('Error fetching body measurement:', error);
    res.status(500).json({ message: 'Error fetching body measurement' });
  }
};

export const updateBodyMeasurement = async (
  req: CustomRequest<{ id: string }, {}, UpdateBodyMeasurementRequestBody>, 
  res: Response<UpdateBodyMeasurementResponse | ErrorResponse>
) => {
  try {
    const bodyMeasurement = await bodyMeasurementService.updateBodyMeasurement(req.params.id, req.body);
    if (bodyMeasurement) {
      res.status(200).json(bodyMeasurement);
    } else {
      res.status(404).json({ message: 'Body measurement not found' });
    }
  } catch (error) {
    console.error('Error updating body measurement:', error);
    res.status(500).json({ message: 'Error updating body measurement' });
  }
};

export const deleteBodyMeasurement = async (
  req: CustomRequest<{ id: string }>, 
  res: Response<DeleteBodyMeasurementResponse | ErrorResponse>
) => {
  try {
    const bodyMeasurement = await bodyMeasurementService.deleteBodyMeasurement(req.params.id);
    if (bodyMeasurement) {
      res.status(200).json({ message: 'Body measurement deleted successfully' });
    } else {
      res.status(404).json({ message: 'Body measurement not found' });
    }
  } catch (error) {
    console.error('Error deleting body measurement:', error);
    res.status(500).json({ message: 'Error deleting body measurement' });
  }
};
