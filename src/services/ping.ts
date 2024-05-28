import * as pingRepository from '../repositories/ping';

export const ping = () => {
    return pingRepository.ping();
};
