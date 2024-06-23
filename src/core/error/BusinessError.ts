import { HttpError } from "./HttpError";
import { ErrorId, DefaultMessages } from "./Constants";
import { StatusCodes } from "http-status-codes";

export class BusinessError extends HttpError {
    constructor(
        message = DefaultMessages[ErrorId.DEFAULT_BUSINESS_ERROR],
        code = StatusCodes.BAD_REQUEST,
        errorId: ErrorId | string = ErrorId.DEFAULT_BUSINESS_ERROR,
        errorData = {}
    ) {
        super(message, code, errorId, errorData);
    }
}

export class BusinessValidationError extends BusinessError {
    Params(params: any) {
        return new BusinessNotFoundError(undefined, undefined, undefined, { params });
    }

    constructor(
        message = DefaultMessages[ErrorId.DEFAULT_BUSINESS_VALIDATION],
        code = StatusCodes.BAD_REQUEST,
        errorId = ErrorId.DEFAULT_BUSINESS_VALIDATION,
        errorData = {}
    ) {
        super(message, code, errorId, errorData);
    }
}

export class BusinessNotFoundError extends BusinessError {
    static Resource(resource: string, name?: string) {
        return new BusinessNotFoundError(undefined, undefined, undefined, { resource, name });
    }

    constructor(
        message = DefaultMessages[ErrorId.DEFAULT_BUSINESS_NOT_FOUND],
        code = StatusCodes.NOT_FOUND,
        errorId = ErrorId.DEFAULT_BUSINESS_NOT_FOUND,
        errorData = {}
    ) {
        super(message, code, errorId, errorData);
    }
}

export class BusinessConcurrencyError extends BusinessError {
    constructor(
        message = DefaultMessages[ErrorId.DEFAULT_BUSINESS_CONCURRENCY],
        code = StatusCodes.CONFLICT,
        errorId = ErrorId.DEFAULT_BUSINESS_CONCURRENCY,
        errorData = {}
    ) {
        super(message, code, errorId, errorData);
    }
}
