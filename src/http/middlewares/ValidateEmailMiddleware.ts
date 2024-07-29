import { Request, Response, NextFunction } from 'express';
import {EmailValidator} from "../../utils/EmailValidator"
export function ValidateEmailMiddleware(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;
    if (email && !EmailValidator.Validate(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }
    next();
}