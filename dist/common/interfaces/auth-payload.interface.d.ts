import { EMemberRole } from 'src/common';
export interface IAuthPayload {
    pseudo: string;
    sub: string;
    role: EMemberRole;
}
