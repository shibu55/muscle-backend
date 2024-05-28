import { Request, Response } from 'express';
import * as pingService from '../services/ping';

export const ping = (req: Request, res: Response) => {
    try {
        const message = pingService.ping();
        res.send(message);
    } catch (error) {
        console.error('Error handling ping:', error);
        res.status(500).send('Error handling ping');
    }
};
