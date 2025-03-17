import { EMemberRole } from 'src/common';
export declare class CreateMemberDto {
    readonly firstName: string;
    readonly pseudo: string;
    readonly facebookName: string;
    readonly role: EMemberRole;
    readonly password: string;
}
