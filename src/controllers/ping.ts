import { Request, Response } from 'express';
import PingService from '../services/ping';

class PingController {
    private pingService: PingService;

    constructor() {
        this.pingService = new PingService();
    }

    ping(req: Request, res: Response): void {
        const response = this.pingService.getPing();
        res.send(response);
    }
}

export default PingController;
