import { Response } from 'express';
import * as workoutDetailService from '../services/workoutDetail';
import { 
  CreateWorkoutDetailRequestBody, 
  UpdateWorkoutDetailRequestBody, 
  CreateWorkoutDetailResponse, 
  GetAllWorkoutDetailsResponse, 
  GetWorkoutDetailResponse, 
  UpdateWorkoutDetailResponse, 
  DeleteWorkoutDetailResponse 
} from '../types/endpoint/workoutDetail';
import { ErrorResponse, CustomRequest } from '../types/endpoint/common';

export const createWorkoutDetail = async (
  req: CustomRequest<{}, {}, CreateWorkoutDetailRequestBody>, 
  res: Response<CreateWorkoutDetailResponse | ErrorResponse>
) => {
  try {
    const workoutDetail = await workoutDetailService.createWorkoutDetail(req.body);
    res.status(201).json(workoutDetail);
  } catch (error) {
    console.error('Error creating workout detail:', error);
    res.status(500).json({ message: 'Error creating workout detail' });
  }
};

export const getAllWorkoutDetails = async (
  req: CustomRequest, 
  res: Response<GetAllWorkoutDetailsResponse | ErrorResponse>
) => {
  try {
    const workoutDetails = await workoutDetailService.getAllWorkoutDetails();
    res.status(200).json({ workoutDetails });
  } catch (error) {
    console.error('Error fetching workout details:', error);
    res.status(500).json({ message: 'Error fetching workout details' });
  }
};

export const getWorkoutDetailById = async (
  req: CustomRequest<{ id: string }>, 
  res: Response<GetWorkoutDetailResponse | ErrorResponse>
) => {
  try {
    const workoutDetail = await workoutDetailService.getWorkoutDetailById(req.params.id);
    if (workoutDetail) {
      res.status(200).json(workoutDetail);
    } else {
      res.status(404).json({ message: 'Workout detail not found' });
    }
  } catch (error) {
    console.error('Error fetching workout detail:', error);
    res.status(500).json({ message: 'Error fetching workout detail' });
  }
};

export const updateWorkoutDetail = async (
  req: CustomRequest<{ id: string }, {}, UpdateWorkoutDetailRequestBody>, 
  res: Response<UpdateWorkoutDetailResponse | ErrorResponse>
) => {
  try {
    const workoutDetail = await workoutDetailService.updateWorkoutDetail(req.params.id, req.body);
    if (workoutDetail) {
      res.status(200).json(workoutDetail);
    } else {
      res.status(404).json({ message: 'Workout detail not found' });
    }
  } catch (error) {
    console.error('Error updating workout detail:', error);
    res.status(500).json({ message: 'Error updating workout detail' });
  }
};

export const deleteWorkoutDetail = async (
  req: CustomRequest<{ id: string }>, 
  res: Response<DeleteWorkoutDetailResponse | ErrorResponse>
) => {
  try {
    const workoutDetail = await workoutDetailService.deleteWorkoutDetail(req.params.id);
    if (workoutDetail) {
      res.status(200).json({ message: 'Workout detail deleted successfully' });
    } else {
      res.status(404).json({ message: 'Workout detail not found' });
    }
  } catch (error) {
    console.error('Error deleting workout detail:', error);
    res.status(500).json({ message: 'Error deleting workout detail' });
  }
};
