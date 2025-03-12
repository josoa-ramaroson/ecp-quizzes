import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: {
    sub: string; // Correspond à memberId
    email: string;
    role: string;
  };
}
