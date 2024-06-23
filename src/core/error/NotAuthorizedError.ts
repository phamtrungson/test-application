import { HttpError } from "./HttpError";
import { DefaultMessages, ErrorId } from "./Constants";
import { StatusCodes } from "http-status-codes";

export class NotAuthorizedError extends HttpError {
    constructor() {
        super(
            DefaultMessages[ErrorId.NOT_AUTHORIZED],
            StatusCodes.FORBIDDEN,
            ErrorId.NOT_AUTHORIZED, 
            {}
        );
    }
}
