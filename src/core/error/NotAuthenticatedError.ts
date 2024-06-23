import { HttpError } from "./HttpError";
import { DefaultMessages, ErrorId } from "./Constants";
import { StatusCodes } from "http-status-codes";

export class NotAuthenticatedError extends HttpError {
    constructor() {
        super(
            DefaultMessages[ErrorId.NOT_AUTHENTICATED],
            StatusCodes.UNAUTHORIZED,
            ErrorId.NOT_AUTHENTICATED,
            {}
        );
    }
}
