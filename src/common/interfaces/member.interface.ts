import { EMemberRole } from "../enums";

export interface IMember {
    id: string;
    email: string;
    firstName: string;
    facebookName: string;
    role: EMemberRole;
}