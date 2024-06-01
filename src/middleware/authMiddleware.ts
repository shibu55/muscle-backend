import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CustomRequest } from '../types/endpoint/common';

const SECRET_KEY = process.env.SECRET_KEY || 'secret-key';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (token) {
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      (req as CustomRequest).user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
