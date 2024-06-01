import jwt from 'jsonwebtoken';
import { Request } from 'express';
export interface ErrorResponse {
  message: string;
}

export interface CustomRequest<P = {}, ResBody = any, ReqBody = any> extends Request<P, ResBody, ReqBody> {
  user?: string | jwt.JwtPayload;
}
