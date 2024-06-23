import { DefaultMessages, ErrorId } from "./Constants";
import { StatusCodes } from 'http-status-codes';

export class HttpError extends Error {

    static NotImplemented(): HttpError {
        return new HttpError('Not implemented', StatusCodes.NOT_IMPLEMENTED);
    }

    static BadRequest(message?: string, errorData?: any): HttpError {
        return new HttpError(
            message ?? DefaultMessages[ErrorId.DEFAULT_BUSINESS_ERROR],
            StatusCodes.BAD_REQUEST,
            ErrorId.DEFAULT_BUSINESS_ERROR,
            errorData
        );
    }

    static Unexpected(message?: string, errorData?: any): HttpError {
        return new HttpError(
            message ?? DefaultMessages[ErrorId.UNEXPECTED],
            StatusCodes.INTERNAL_SERVER_ERROR,
            ErrorId.UNEXPECTED,
            errorData
        );
    }

    message: string;

    constructor(
        message: string,
        protected readonly status: number = StatusCodes.INTERNAL_SERVER_ERROR,        
        protected readonly errorId: ErrorId | string = ErrorId.UNEXPECTED,
        protected errorData: { [key: string]: string } = {}
    ) {
        super(message);
    }
}
