import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: {
    sub: string; // Correspond à memberId
    pseudo: string;
    role: string;
  };
}
