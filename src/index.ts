import 'reflect-metadata';
import 'dotenv/config';

import { Server } from './server';

export const main = async () => {
    const server = new Server();
    await server.start();
}

main();
