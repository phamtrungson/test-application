export enum ErrorId {
    UNEXPECTED = 'UNEXPECTED',

    DEFAULT_BUSINESS_ERROR = 'DEFAULT_BUSINESS_ERROR',
    DEFAULT_BUSINESS_NOT_FOUND = 'DEFAULT_BUSINESS_NOT_FOUND',
    DEFAULT_BUSINESS_CONCURRENCY = 'DEFAULT_BUSINESS_CONCURRENCY',
    DEFAULT_BUSINESS_VALIDATION = 'DEFAULT_BUSINESS_VALIDATION',

    NOT_AUTHENTICATED = 'NOT_AUTHENTICATED',
    NOT_AUTHORIZED = 'NOT_AUTHORIZED',
}

export const DefaultMessages: { [k in ErrorId]: string; } = {
    [ErrorId.UNEXPECTED]: 'Some unexpected errors occurred',
    [ErrorId.DEFAULT_BUSINESS_ERROR]: 'Your request have something wrong',
    [ErrorId.DEFAULT_BUSINESS_NOT_FOUND]: 'Requested {{resource}} {{name}} not found',
    [ErrorId.DEFAULT_BUSINESS_CONCURRENCY]: 'Your data have changed outside. Please reload page',
    [ErrorId.DEFAULT_BUSINESS_VALIDATION]: 'Your request contains invalid parameter(s) {{params}}',

    [ErrorId.NOT_AUTHENTICATED]: 'Wrong credentials provided',
    [ErrorId.NOT_AUTHORIZED]: 'You\'re not authorized',
}
