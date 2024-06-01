import { Response } from 'express';
import * as workoutService from '../services/workout';
import { 
  CreateWorkoutRequestBody, 
  UpdateWorkoutRequestBody, 
  CreateWorkoutResponse, 
  GetAllWorkoutsResponse, 
  GetWorkoutResponse, 
  UpdateWorkoutResponse, 
  DeleteWorkoutResponse 
} from '../types/endpoint/workout';
import { ErrorResponse, CustomRequest } from '../types/endpoint/common';

export const createWorkout = async (req: CustomRequest<{}, {}, CreateWorkoutRequestBody>, res: Response<CreateWorkoutResponse | ErrorResponse>) => {
  try {
    const workout = await workoutService.createWorkout(req.body);
    res.status(201).json(workout);
  } catch (error) {
    console.error('Error creating workout:', error);
    res.status(500).json({ message: 'Error creating workout' });
  }
};

export const getAllWorkouts = async (req: CustomRequest, res: Response<GetAllWorkoutsResponse | ErrorResponse>) => {
  try {
    const workouts = await workoutService.getAllWorkouts();
    res.status(200).json({ workouts });
  } catch (error) {
    console.error('Error fetching workouts:', error);
    res.status(500).json({ message: 'Error fetching workouts' });
  }
};

export const getWorkoutById = async (req: CustomRequest<{ id: string }>, res: Response<GetWorkoutResponse | ErrorResponse>) => {
  try {
    const workout = await workoutService.getWorkoutById(req.params.id);
    if (workout) {
      res.status(200).json(workout);
    } else {
      res.status(404).json({ message: 'Workout not found' });
    }
  } catch (error) {
    console.error('Error fetching workout:', error);
    res.status(500).json({ message: 'Error fetching workout' });
  }
};

export const updateWorkout = async (req: CustomRequest<{ id: string }, {}, UpdateWorkoutRequestBody>, res: Response<UpdateWorkoutResponse | ErrorResponse>) => {
  try {
    const workout = await workoutService.updateWorkout(req.params.id, req.body);
    if (workout) {
      res.status(200).json(workout);
    } else {
      res.status(404).json({ message: 'Workout not found' });
    }
  } catch (error) {
    console.error('Error updating workout:', error);
    res.status(500).json({ message: 'Error updating workout' });
  }
};

export const deleteWorkout = async (req: CustomRequest<{ id: string }>, res: Response<DeleteWorkoutResponse | ErrorResponse>) => {
  try {
    const workout = await workoutService.deleteWorkout(req.params.id);
    if (workout) {
      res.status(200).json({ message: 'Workout deleted successfully' });
    } else {
      res.status(404).json({ message: 'Workout not found' });
    }
  } catch (error) {
    console.error('Error deleting workout:', error);
    res.status(500).json({ message: 'Error deleting workout' });
  }
};
