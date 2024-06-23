import { NextFunction, Request, Response } from 'express';
import { BASE_TYPES, ContainerProvider, ILogger } from '@building-blocks';
import { nanoid } from 'nanoid';
import { BusinessError, DefaultMessages, ErrorId, NotAuthenticatedError, NotAuthorizedError } from '@core';
import { StatusCodes } from 'http-status-codes';


function errorMiddleware(error: any, request: Request, response: Response, next: NextFunction) {
    const status = error.status || StatusCodes.INTERNAL_SERVER_ERROR;
    let message = error.message || DefaultMessages[ErrorId.UNEXPECTED];
    let errorId = error.errorId || ErrorId.UNEXPECTED;
    let errorData = error.errorData || {};
    const logger = ContainerProvider.Container.getNamed<ILogger>(BASE_TYPES.ILogger, errorMiddleware.name);

    let returnMessage = message;

    logger.debug('Caught an error:', error);

    if (error instanceof BusinessError
        || error instanceof NotAuthenticatedError
        || error instanceof NotAuthorizedError
    ) {
        logger.warn(`Error: ${message}`);
    } else {
        const generatedUUID = nanoid();
        errorData = { ...errorData, errorInstanceId: generatedUUID};
        logger.error(`Error: ${message}`, errorData);
        logger.debug(`Error:`, error, errorData);

        returnMessage = `${DefaultMessages[ErrorId.UNEXPECTED]} Error Instance ID: ${generatedUUID}`;
    }
    response
        .status(status)
        .json({
            status,
            message: returnMessage,
            errorId,
            errorData,
        });
}

export default errorMiddleware;
