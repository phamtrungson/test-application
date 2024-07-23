import 'reflect-metadata';
import 'dotenv/config';

import { Server } from './server';

export const main = () => {
    const server = new Server();
    server.start();
}

main();