import {BaseError} from "./BaseError"

export class ValidationError extends BaseError {
    constructor(message = 'Validation error') {
        super(message, 400);
        this.name = 'ValidationError';
    }
}