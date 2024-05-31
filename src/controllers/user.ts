import { Request, Response } from 'express';
import * as userService from '../services/user';
import { CreateUserRequestBody, UpdateUserRequestBody, LoginUserRequestBody, CreateUserResponse, GetAllUsersResponse, GetUserResponse, UpdateUserResponse, DeleteUserResponse } from '../types/endpoint/user';
import { ErrorResponse } from '../types/endpoint/common';

export const createUser = async (req: Request<{}, {}, CreateUserRequestBody>, res: Response<CreateUserResponse | ErrorResponse>) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
};

export const getAllUsers = async (req: Request, res: Response<GetAllUsersResponse | ErrorResponse>) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
};

export const getUserById = async (req: Request<{ id: string }>, res: Response<GetUserResponse | ErrorResponse>) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Error fetching user' });
  }
};

export const updateUser = async (req: Request<{ id: string }, {}, UpdateUserRequestBody>, res: Response<UpdateUserResponse | ErrorResponse>) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Error updating user' });
  }
};

export const deleteUser = async (req: Request<{ id: string }>, res: Response<DeleteUserResponse | ErrorResponse>) => {
  try {
    const user = await userService.deleteUser(req.params.id);
    if (user) {
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Error deleting user' });
  }
};

export const loginUser = async (req: Request<{}, {}, LoginUserRequestBody>, res: Response<{ token: string } | ErrorResponse>) => {
  try {
    const { email, password } = req.body;
    const token = await userService.authenticateUser(email, password);
    res.status(200).json(token);
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(401).json({ message: 'Invalid email or password' });
  }
};
