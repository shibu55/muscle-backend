import { Request, Response } from 'express';
import * as exerciseService from '../services/exercise';
import { CreateExerciseRequestBody, UpdateExerciseRequestBody, CreateExerciseResponse, GetAllExercisesResponse, GetExerciseResponse, UpdateExerciseResponse, DeleteExerciseResponse } from '../types/endpoint/exercise';
import { ErrorResponse } from '../types/endpoint/common';

export const createExercise = async (req: Request<{}, {}, CreateExerciseRequestBody>, res: Response<CreateExerciseResponse | ErrorResponse>) => {
  try {
    const exercise = await exerciseService.createExercise(req.body);
    res.status(201).json(exercise);
  } catch (error) {
    console.error('Error creating exercise:', error);
    res.status(500).json({ message: 'Error creating exercise' });
  }
};

export const getAllExercises = async (req: Request, res: Response<GetAllExercisesResponse | ErrorResponse>) => {
  try {
    const exercises = await exerciseService.getAllExercises();
    res.status(200).json({exercises});
  } catch (error) {
    console.error('Error fetching exercises:', error);
    res.status(500).json({ message: 'Error fetching exercises' });
  }
};

export const getExerciseById = async (req: Request<{ id: string }>, res: Response<GetExerciseResponse | ErrorResponse>) => {
  try {
    const exercise = await exerciseService.getExerciseById(req.params.id);
    if (exercise) {
      res.status(200).json(exercise);
    } else {
      res.status(404).json({ message: 'Exercise not found' });
    }
  } catch (error) {
    console.error('Error fetching exercise:', error);
    res.status(500).json({ message: 'Error fetching exercise' });
  }
};

export const updateExercise = async (req: Request<{ id: string }, {}, UpdateExerciseRequestBody>, res: Response<UpdateExerciseResponse | ErrorResponse>) => {
  try {
    const exercise = await exerciseService.updateExercise(req.params.id, req.body);
    if (exercise) {
      res.status(200).json(exercise);
    } else {
      res.status(404).json({ message: 'Exercise not found' });
    }
  } catch (error) {
    console.error('Error updating exercise:', error);
    res.status(500).json({ message: 'Error updating exercise' });
  }
};

export const deleteExercise = async (req: Request<{ id: string }>, res: Response<DeleteExerciseResponse | ErrorResponse>) => {
  try {
    const exercise = await exerciseService.deleteExercise(req.params.id);
    if (exercise) {
      res.status(200).json({ message: 'Exercise deleted successfully' });
    } else {
      res.status(404).json({ message: 'Exercise not found' });
    }
  } catch (error) {
    console.error('Error deleting exercise:', error);
    res.status(500).json({ message: 'Error deleting exercise' });
  }
};
