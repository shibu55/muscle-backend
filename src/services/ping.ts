import PingRepository from '../repositories/ping';

class PingService {
    private pingRepository: PingRepository;

    constructor() {
        this.pingRepository = new PingRepository();
    }

    getPing(): string {
        return this.pingRepository.getPingResponse();
    }
}

export default PingService;