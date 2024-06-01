import { Response } from 'express';
import * as exerciseLogService from '../services/exerciseLog';
import { 
  CreateExerciseLogRequestBody, 
  UpdateExerciseLogRequestBody, 
  CreateExerciseLogResponse, 
  GetAllExerciseLogsResponse, 
  GetExerciseLogResponse, 
  UpdateExerciseLogResponse, 
  DeleteExerciseLogResponse 
} from '../types/endpoint/exerciseLog';
import { ErrorResponse, CustomRequest } from '../types/endpoint/common';

export const createExerciseLog = async (
  req: CustomRequest<{}, {}, CreateExerciseLogRequestBody>, 
  res: Response<CreateExerciseLogResponse | ErrorResponse>
) => {
  try {
    const exerciseLog = await exerciseLogService.createExerciseLog(req.body);
    res.status(201).json(exerciseLog);
  } catch (error) {
    console.error('Error creating exercise log:', error);
    res.status(500).json({ message: 'Error creating exercise log' });
  }
};

export const getAllExerciseLogs = async (
  req: CustomRequest, 
  res: Response<GetAllExerciseLogsResponse | ErrorResponse>
) => {
  try {
    const exerciseLogs = await exerciseLogService.getAllExerciseLogs();
    res.status(200).json({ exerciseLogs });
  } catch (error) {
    console.error('Error fetching exercise logs:', error);
    res.status(500).json({ message: 'Error fetching exercise logs' });
  }
};

export const getExerciseLogById = async (
  req: CustomRequest<{ id: string }>, 
  res: Response<GetExerciseLogResponse | ErrorResponse>
) => {
  try {
    const exerciseLog = await exerciseLogService.getExerciseLogById(req.params.id);
    if (exerciseLog) {
      res.status(200).json(exerciseLog);
    } else {
      res.status(404).json({ message: 'Exercise log not found' });
    }
  } catch (error) {
    console.error('Error fetching exercise log:', error);
    res.status(500).json({ message: 'Error fetching exercise log' });
  }
};

export const updateExerciseLog = async (
  req: CustomRequest<{ id: string }, {}, UpdateExerciseLogRequestBody>, 
  res: Response<UpdateExerciseLogResponse | ErrorResponse>
) => {
  try {
    const exerciseLog = await exerciseLogService.updateExerciseLog(req.params.id, req.body);
    if (exerciseLog) {
      res.status(200).json(exerciseLog);
    } else {
      res.status(404).json({ message: 'Exercise log not found' });
    }
  } catch (error) {
    console.error('Error updating exercise log:', error);
    res.status(500).json({ message: 'Error updating exercise log' });
  }
};

export const deleteExerciseLog = async (
  req: CustomRequest<{ id: string }>, 
  res: Response<DeleteExerciseLogResponse | ErrorResponse>
) => {
  try {
    const exerciseLog = await exerciseLogService.deleteExerciseLog(req.params.id);
    if (exerciseLog) {
      res.status(200).json({ message: 'Exercise log deleted successfully' });
    } else {
      res.status(404).json({ message: 'Exercise log not found' });
    }
  } catch (error) {
    console.error('Error deleting exercise log:', error);
    res.status(500).json({ message: 'Error deleting exercise log' });
  }
};
