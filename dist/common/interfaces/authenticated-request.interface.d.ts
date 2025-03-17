import { Request } from 'express';
export interface AuthenticatedRequest extends Request {
    user?: {
        sub: string;
        pseudo: string;
        role: string;
    };
}
