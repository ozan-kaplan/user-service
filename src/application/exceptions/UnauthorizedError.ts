import {BaseError} from "./BaseError"

export class UnauthorizedError extends BaseError {
    constructor(message = 'Unauthorized access') {
        super(message, 401);
        this.name = 'UnauthorizedError';
    }
}