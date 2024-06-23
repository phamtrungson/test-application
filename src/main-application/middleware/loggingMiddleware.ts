import { Request, Response, NextFunction } from 'express';
import { BASE_TYPES, ContainerProvider, ILogger } from '@building-blocks';

export function loggingMiddleware(request: Request, response: Response, next: NextFunction) {
    const logger = ContainerProvider.Container.getNamed<ILogger>(BASE_TYPES.ILogger, loggingMiddleware.name);
    const { path, method } = request;
    const start = Date.now();
    logger.info(`[${method} ${path}] Request start`);
    next();
    response.on('finish', () => {
        const { statusCode } = response;
        const timeMs = Date.now() - start;
        logger.info(`[${method} ${path}] - ${statusCode} - ${(timeMs / 1000).toFixed(4)}s - params: ${JSON.stringify(request.params)}`);
    });
}
